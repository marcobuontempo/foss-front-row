import mongoose, { Document, Schema } from 'mongoose';

interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  event: Schema.Types.ObjectId;
  tickets: Array<Schema.Types.ObjectId>;
  totalQuantity: number;
  totalPrice: number;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    tickets: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
      }],
      required: true,
      validate: {
        validator: (tickets: Array<Schema.Types.ObjectId>) => tickets.length > 0,
        message: 'at least one ticket is required',
      }
    },
    totalQuantity: {
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