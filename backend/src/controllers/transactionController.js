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

const startSimulation = () => {
    if (simulationInterval) return;

    console.log('Starting transaction simulation...');
    simulationInterval = setInterval(async () => {
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
            io.emit('new-transaction', transaction);

            // console.log(`Processed TXN: ${transaction.transactionId} - Risk: ${transaction.riskLevel}`);
        } catch (error) {
            console.error('Error in simulation step:', error.message);
        }
    }, 5000); // New transaction every 5 seconds
};

const stopSimulation = () => {
    if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
        console.log('Simulation stopped.');
    }
}

module.exports = { getTransactions, startSimulation, stopSimulation };
