import mongoose from 'mongoose';

const FinishedTaskSchema = new mongoose.Schema({
  taskName: String,
  taskReward: String,
  imagePath: String,
  userID: String
});

export default mongoose.models.Finished_Task || mongoose.model('Finished_Task', FinishedTaskSchema);