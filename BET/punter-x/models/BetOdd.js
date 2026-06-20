import mongoose from 'mongoose';

const betOddSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['rollover', '10+', '15+', 'correct_score'],
      required: true,
    },
    odds: {
      type: Number,
      required: true,
    },
    description: String,
    sport: {
      type: String,
      enum: ['football', 'basketball', 'tennis', 'rugby', 'baseball', 'other'],
      default: 'football',
    },
    eventDate: {
      type: Date,
      required: true,
    },
    matchDetails: {
      home: String,
      away: String,
      league: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    minStake: {
      type: Number,
      default: 100,
    },
    maxStake: {
      type: Number,
      default: 100000,
    },
    totalBets: {
      type: Number,
      default: 0,
    },
    totalStaked: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'live', 'closed', 'settled'],
      default: 'pending',
    },
    result: String,
  },
  { timestamps: true }
);

export default mongoose.models.BetOdd || mongoose.model('BetOdd', betOddSchema);
