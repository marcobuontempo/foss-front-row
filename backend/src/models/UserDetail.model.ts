import mongoose, { Document, Schema } from 'mongoose';

interface IUserDetail extends Document {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  address?: string;
  dob: Date;
}

const userDetailSchema = new Schema<IUserDetail>(
  {
    _id: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    firstname: { 
      type: String, 
      required: true 
    },
    lastname: { 
      type: String, 
      required: true 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,  // Validate email format
    },
    phone: {
      type: String,
      default: null,
      match: /^[0-9]{10,14}$/,  // Validate phone format
    },
    address: {
      type: String,
      default: null,
    },
    dob: { 
      type: Date, 
      required: true 
    },
  },
  {
    timestamps: true,
  });

const UserDetail = mongoose.model<IUserDetail>('UserDetail', userDetailSchema);

export { IUserDetail, userDetailSchema };
export default UserDetail;