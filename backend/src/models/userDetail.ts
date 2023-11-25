import mongoose, { Document, Schema } from 'mongoose';

interface IUserDetail extends Document {
  userID: mongoose.Schema.Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;

}

const userDetailSchema = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

const UserDetail = mongoose.model<IUserDetail>('UserDetail', userDetailSchema);

export default UserDetail;