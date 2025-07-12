// models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  location: String,
  skillsOffered: [{ type: String }],
  skillsWanted: [{ type: String }],
  availability: String,
  profileType: { type: String, enum: ['public', 'private'], default: 'public' },
  profilePhoto: String,
  rating: { type: Number, default: 0 },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
