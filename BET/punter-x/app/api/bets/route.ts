import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BetOdd from '@/models/BetOdd';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const query = { isActive: true, status: { $ne: 'closed' } };
    if (category && category !== 'all') {
      query.category = category;
    }

    const bets = await BetOdd.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      { bets },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Fetch bets error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
