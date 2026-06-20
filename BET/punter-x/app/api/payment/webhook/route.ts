import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import Transaction from '@/models/Transaction';

export async function POST(req: NextRequest) {
  try {
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    const signature = req.headers.get('x-paystack-signature') || '';
    const body = await req.text();

    const hash = crypto
      .createHmac('sha512', paystackSecret || '')
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      return NextResponse.json({ status: 'failed', message: 'Invalid signature' }, { status: 400 });
    }

    const data = JSON.parse(body);
    const event = data.event;
    const eventData = data.data;

    if (event === 'charge.success' && eventData.status === 'success') {
      await connectDB();

      const metadata = eventData.metadata;
      const ticket = await Ticket.findById(metadata.ticketId);
      const user = await User.findById(metadata.userId);

      if (ticket && user) {
        ticket.status = 'pending';
        await ticket.save();

        user.accountBalance -= ticket.stake;
        user.totalBets += 1;
        await user.save();

        const transaction = await Transaction.findOne({ reference: metadata.betReference });
        if (transaction) {
          transaction.status = 'success';
          transaction.paystackReference = eventData.reference;
          transaction.balanceAfter = user.accountBalance;
          await transaction.save();
        }
      }
    }

    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ status: 'failed', message: error.message }, { status: 500 });
  }
}
