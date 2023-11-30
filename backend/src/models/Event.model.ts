import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  date: Date;
  venue: string;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    date: {
      type: Date,
      required: true
    },
    venue: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  });

const Event = mongoose.model<IEvent>('Event', eventSchema);

export default Event;