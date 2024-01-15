import mongoose, { Document, Schema } from 'mongoose';

interface ITicket extends Document {
  event: Schema.Types.ObjectId;
  price: number;
  seat: string;
  available: boolean;
  consumed: boolean;
}

const ticketSchema = new Schema<ITicket>({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  seat: {
    type: String,
    required: true,
    default: "General Admission [GA]"
  },
  available: {
    type: Boolean,
    required: true,
    default: true
  },
  consumed: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);

export { ITicket, ticketSchema };
export default Ticket;