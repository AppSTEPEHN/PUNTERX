import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import BetOdd from '@/models/BetOdd';
import Ticket from '@/models/Ticket';
import Transaction from '@/models/Transaction';
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

    const { betOddId, stake } = await req.json();
    const userId = verified.userId;

    // Get user and bet
    const user = await User.findById(userId);
    const bet = await BetOdd.findById(betOddId);

    if (!user || !bet) {
      return NextResponse.json(
        { message: 'Invalid user or bet' },
        { status: 400 }
      );
    }

    // Validate stake
    if (stake < bet.minStake || stake > bet.maxStake) {
      return NextResponse.json(
        { message: 'Stake outside allowed range' },
        { status: 400 }
      );
    }

    // Create ticket
    const reference = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const ticket = new Ticket({
      userId,
      bets: [{
        betOddId: bet._id,
        odds: bet.odds,
        category: bet.category,
        title: bet.title,
      }],
      stake,
      totalOdds: bet.odds,
      potentialWinnings: stake * bet.odds,
      reference,
    });

    await ticket.save();

    // Update bet stats
    bet.totalBets += 1;
    bet.totalStaked += stake;
    await bet.save();

    // Create transaction
    const transaction = new Transaction({
      userId,
      type: 'bet',
      amount: stake,
      reference,
      status: 'pending',
      description: `Bet on ${bet.title}`,
      relatedTicketId: ticket._id,
      balanceBefore: user.accountBalance,
      balanceAfter: user.accountBalance - stake,
    });

    await transaction.save();

    return NextResponse.json(
      {
        message: 'Bet placed successfully',
        ticket,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Place bet error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
