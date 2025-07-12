// models/SwapRequest.ts
import mongoose from 'mongoose';

const swapRequestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillOffered: String,
  skillWanted: String,
  message: String,
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.SwapRequest || mongoose.model('SwapRequest', swapRequestSchema);
