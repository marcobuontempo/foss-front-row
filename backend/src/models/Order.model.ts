import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  userID: mongoose.Schema.Types.ObjectId;
  eventID: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventID: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  });

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;