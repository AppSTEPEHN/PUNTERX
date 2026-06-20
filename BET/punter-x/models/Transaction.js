import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['deposit', 'withdrawal', 'bet', 'winning'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    reference: String,
    paystackReference: String,
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    description: String,
    relatedTicketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
    balanceBefore: Number,
    balanceAfter: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
