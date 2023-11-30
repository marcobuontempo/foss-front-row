import mongoose, { Document, Schema } from 'mongoose';

interface ITicket extends Document {
  eventid: mongoose.Schema.Types.ObjectId;
  price: number;
  seat: string;
  available: boolean;
}

const ticketSchema = new Schema<ITicket>({
  eventid: {
    type: mongoose.Schema.Types.ObjectId,
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
  }
});

const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);

export { ITicket, ticketSchema };
export default Ticket;