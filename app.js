const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // ✅ ADD THIS

// routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
console.log("JWT SECRET:", process.env.JWT_SECRET);

connectDB();

const app = express();

// ✅ ADD THIS (VERY IMPORTANT)
app.use(cors());


// middleware
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// home route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});