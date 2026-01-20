const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { initSocket } = require('./services/socket');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

app.get('/', (req, res) => {
    res.send('Fraud Detection API is running...');
});

// Socket.io
const io = initSocket(server);

// Start Simulation
// Start Simulation
const { startSimulation, runSimulationStep } = require('./controllers/transactionController');
startSimulation();

// Manual Trigger for Serverless Environments
app.get('/api/simulate', async (req, res) => {
    try {
        const transaction = await runSimulationStep();
        res.json({ message: 'Simulation step triggered', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Simulation step failed', error: error.message });
    }
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

// Only listen if running directly (not imported as a module)
if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
