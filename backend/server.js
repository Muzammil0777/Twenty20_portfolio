const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Body parser for JSON
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        callback(null, true);
    },
    credentials: true,
})); // Enable CORS

// Routes
app.use('/api/auth', require('./routes/auth'));

// Simple root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Database connection
// Use global cache to prevent multiple connections in serverless environment
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable Mongoose buffering
            serverSelectionTimeoutMS: 5000, // Fail fast if DB is down
            socketTimeoutMS: 45000, // Close sockets after 45s
        };

        cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
            console.log(`MongoDB Connected: ${mongoose.connection.host}`);
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};

// Middleware to ensure DB is connected before handling requests
app.use(async (req, res, next) => {
    // If we are already connected, proceed
    if (mongoose.connection.readyState === 1) {
        return next();
    }

    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("DB Connection Error:", err);
        // Important: If connection fails, ensure we send a response so it doesn't hang
        res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
});

const PORT = process.env.PORT || 5000;

// Only listen if not running as a Vercel function (or if run directly)
if (require.main === module) {
    connectDB().then(() => {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    });
}

module.exports = app;
