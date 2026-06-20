import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
    const verified = verifyToken(token);

    if (!verified) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { ticketId } = await req.json();
    const userId = verified.userId;

    const ticket = await Ticket.findById(ticketId);
    const user = await User.findById(userId);

    if (!ticket || !user || ticket.userId.toString() !== userId) {
      return NextResponse.json(
        { message: 'Invalid ticket or user' },
        { status: 400 }
      );
    }

    // Initialize Paystack transaction
    const paystackKey = process.env.PAYSTACK_SECRET_KEY;

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${paystackKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        amount: Math.round(ticket.stake * 100), // Amount in kobo
        metadata: {
          ticketId: ticket._id.toString(),
          userId: user._id.toString(),
          betReference: ticket.reference,
        },
      }),
    });

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message || 'Paystack initialization failed');
    }

    return NextResponse.json(
      {
        message: 'Payment initialized',
        authorizationUrl: data.data.authorization_url,
        accessCode: data.data.access_code,
        reference: data.data.reference,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Payment init error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
