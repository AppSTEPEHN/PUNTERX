import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import Transaction from '@/models/Transaction';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { reference } = await req.json();

    // Verify with Paystack
    const paystackKey = process.env.PAYSTACK_SECRET_KEY;

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${paystackKey}`,
      },
    });

    const data = await response.json();

    if (!data.status || data.data.status !== 'success') {
      return NextResponse.json(
        { message: 'Payment verification failed' },
        { status: 400 }
      );
    }

    const metadata = data.data.metadata;
    const ticket = await Ticket.findById(metadata.ticketId);
    const user = await User.findById(metadata.userId);

    if (!ticket || !user) {
      return NextResponse.json(
        { message: 'Invalid ticket or user' },
        { status: 400 }
      );
    }

    // Update ticket status
    ticket.status = 'pending';
    await ticket.save();

    // Deduct stake from user balance
    user.accountBalance -= ticket.stake;
    user.totalBets += 1;
    await user.save();

    // Update transaction
    const transaction = await Transaction.findOne({ reference: metadata.betReference });
    if (transaction) {
      transaction.status = 'success';
      transaction.paystackReference = reference;
      transaction.balanceAfter = user.accountBalance;
      await transaction.save();
    }

    return NextResponse.json(
      {
        message: 'Payment verified successfully',
        ticket,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
