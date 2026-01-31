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
let cachedToken = null;

const connectDB = async () => {
    if (cachedToken) {
        return cachedToken;
    }

    // Check if we already have a connection
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        cachedToken = conn;
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Don't exit process in serverless env, just throw
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
        throw error;
    }
};

// Connect to DB immediately if not in test/CI (optional, but good for local)
// For Vercel, we might want to connect inside the handler or middleware if possible, 
// but top level await is not always standard in CJS. 
// We will call connectDB on every request as a middleware to ensure connection.

app.use(async (req, res, next) => {
    // skip for static files or if already connected
    if (mongoose.connection.readyState === 1) {
        return next();
    }
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("DB Connection Error:", err);
        res.status(500).json({ error: 'Database connection failed' });
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
