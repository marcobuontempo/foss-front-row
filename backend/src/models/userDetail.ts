import mongoose, { Document, Schema } from 'mongoose';

interface IUserDetail extends Document {
  userID: mongoose.Schema.Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  address?: string;
  dob: Date;
}

const userDetailSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: null },
    address: { type: String, default: null },
    dob: { type: Date, required: true },
  },
  {
    timestamps: true,
  });

const UserDetail = mongoose.model<IUserDetail>('UserDetail', userDetailSchema);

export default UserDetail;