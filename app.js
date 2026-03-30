require("dotenv").config();
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // ✅ ADD THIS

// routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();
console.log("JWT SECRET:", process.env.JWT_SECRET);

connectDB();

const app = express();

// ✅ ADD THIS (Vapp.use(cors());
app.use(cors({ origin: "*" }));

// middleware
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/api/chat", chatRoutes);

// home route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});