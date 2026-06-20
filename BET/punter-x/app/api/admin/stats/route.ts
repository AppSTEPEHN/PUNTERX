import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Ticket from '@/models/Ticket';
import Transaction from '@/models/Transaction';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
    const verified = verifyToken(token);

    if (!verified || verified.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const totalUsers = await User.countDocuments();
    const totalBets = await Ticket.countDocuments();
    
    const wonTickets = await Ticket.find({ status: 'won' });
    const totalWinnings = wonTickets.reduce((sum, t) => sum + t.potentialWinnings, 0);

    const allTransactions = await Transaction.find({ type: 'bet', status: 'success' });
    const totalRevenue = allTransactions.reduce((sum, t) => sum + t.amount, 0);

    return NextResponse.json(
      {
        stats: {
          totalUsers,
          totalBets,
          totalWinnings,
          totalRevenue,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
