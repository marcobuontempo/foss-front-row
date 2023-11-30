import mongoose, { Document, Schema } from 'mongoose';

export interface ITicket extends Document {
  eventID: mongoose.Schema.Types.ObjectId;
  price: number;
  availableQuantity: number;
  totalQuantity: number;
}

const ticketSchema = new Schema<ITicket>({
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  availableQuantity: {
    type: Number,
    required: true
  },
  totalQuantity: {
    type: Number,
    required: true
  },
});

const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);

export default Ticket;