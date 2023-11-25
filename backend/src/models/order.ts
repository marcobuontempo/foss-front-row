import mongoose, { Document, Schema } from 'mongoose';

interface IOrder extends Document {
  userID: mongoose.Schema.Types.ObjectId;
  eventID: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
}

const orderSchema = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventID: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, required: true },
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;