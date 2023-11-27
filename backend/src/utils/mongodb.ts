import mongoose, { ConnectOptions } from 'mongoose';

const connect = async () => {
    const uri = process.env.MONGODB_URI || "";
    const dbOptions: ConnectOptions = {
        serverSelectionTimeoutMS: 10000,
    };
    mongoose.connect(uri, dbOptions);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => { console.log('Connected to MongoDB') });
}

export default { connect }