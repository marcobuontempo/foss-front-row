import mongoose, { Document, Schema } from 'mongoose';

interface IEvent extends Document {
  title: string;
  date: Date;
  venue: string;
  owner: Schema.Types.ObjectId;
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  {
    timestamps: true,
  });

const Event = mongoose.model<IEvent>('Event', eventSchema);

export { IEvent, eventSchema };
export default Event;