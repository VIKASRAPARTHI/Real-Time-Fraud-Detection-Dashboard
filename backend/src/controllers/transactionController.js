const Transaction = require('../models/Transaction');
const { generateMockTransaction } = require('../services/generator');
const { analyzeTransaction } = require('../services/ai');
const { getIO } = require('../services/socket');

// Get recent transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ timestamp: -1 }).limit(100);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Simulation Loop
let simulationInterval = null;

// Single Simulation Step
const runSimulationStep = async () => {
    try {
        // 1. Generate Mock Data
        const rawTransaction = generateMockTransaction();

        // 2. AI Analysis
        const analysis = await analyzeTransaction(rawTransaction);

        // 3. Merge Data
        const enrichedTransaction = {
            ...rawTransaction,
            ...analysis,
            isFlagged: analysis.riskLevel === 'high' || analysis.riskLevel === 'critical',
        };

        // 4. Save to DB
        const transaction = await Transaction.create(enrichedTransaction);

        // 5. Emit via Socket
        const io = getIO();
        if (io) {
            io.emit('new-transaction', transaction);
        }

        return transaction;

    } catch (error) {
        console.error('Error in simulation step:', error.message);
        throw error;
    }
};

const startSimulation = () => {
    if (simulationInterval) return;

    console.log('Starting transaction simulation...');
    simulationInterval = setInterval(() => {
        runSimulationStep().catch(err => console.error(err));
    }, 5000); // New transaction every 5 seconds
};

const stopSimulation = () => {
    if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
        console.log('Simulation stopped.');
    }
}

module.exports = { getTransactions, startSimulation, stopSimulation, runSimulationStep };
