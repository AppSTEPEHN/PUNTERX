import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bets: [
      {
        betOddId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'BetOdd',
          required: true,
        },
        odds: Number,
        category: String,
        title: String,
      },
    ],
    stake: {
      type: Number,
      required: true,
    },
    totalOdds: {
      type: Number,
      required: true,
    },
    potentialWinnings: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'won', 'lost', 'cancelled'],
      default: 'pending',
    },
    reference: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);
