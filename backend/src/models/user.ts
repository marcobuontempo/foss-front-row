import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: Date;
}

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: Date, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;