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

// Routes definition moved after DB connection middleware

// Database connection
// Use global cache to prevent multiple connections in serverless environment
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

// 1. Force buffering OFF globally so we see real errors instantly
mongoose.set('bufferCommands', false);

const connectDB = async () => {
    // 2. ONLY return cached connection if it is actually READY (state === 1)
    if (cached.conn && cached.conn.connection.readyState === 1) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Double ensure
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
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("DB Connection Error:", err);
        // Clean up global promise so next retry can attempt fresh connection
        cached.promise = null;
        res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
});

// Routes - Must be AFTER the DB middleware
app.use('/api/auth', require('./routes/auth'));

// Simple root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

// Only listen if not running as a Vercel function (or if run directly)
if (require.main === module) {
    connectDB().then(() => {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    });
}

module.exports = app;
