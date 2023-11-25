import mongoose, { Document, Schema } from 'mongoose';

interface IEvent extends Document {
  title: string;
  date: Date;
  venue: string;
}

const eventSchema = new Schema({
  title: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
});

const Event = mongoose.model<IEvent>('Event', eventSchema);

export default Event;