import mongoose from 'mongoose';
const connection = {};

async function connect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
}

export default connect;