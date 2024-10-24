import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    telegramID: String,
    userName: String,
    userFirstName: String,
    registerDate: String,
    userBalance: String,
    invitedBy: String
});

export default mongoose.models.User || mongoose.model('User', UserSchema);