import mongoose, { Document, Schema } from 'mongoose';
import { ITicket, ticketSchema } from './Ticket.model';

interface IOrder extends Document {
  userid: mongoose.Schema.Types.ObjectId;
  eventid: mongoose.Schema.Types.ObjectId;
  tickets: [ITicket]
  quantity: number;
  totalPrice: number;
}

const orderSchema = new Schema<IOrder>(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    eventid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    tickets: {
      type: [ticketSchema],
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
  });

const Order = mongoose.model<IOrder>('Order', orderSchema);

export { IOrder, orderSchema };
export default Order;