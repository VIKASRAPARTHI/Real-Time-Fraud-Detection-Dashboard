const generateMockTransaction = () => {
    const locations = ['US', 'CA', 'UK', 'DE', 'FR', 'CN', 'RU', 'NG'];
    const merchants = ['Amazon', 'Walmart', 'Apple', 'Uber', 'Target', 'BestBuy', 'Steam'];

    const isFraudulent = Math.random() < 0.15;

    const amount = isFraudulent
        ? Math.floor(Math.random() * 5000) + 100
        : Math.floor(Math.random() * 200) + 10;

    const location = isFraudulent
        ? locations[Math.floor(Math.random() * locations.length)]
        : 'US';

    const merchant = merchants[Math.floor(Math.random() * merchants.length)];

    return {
        transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        userId: 'USER-' + Math.floor(Math.random() * 1000),
        amount,
        currency: 'USD',
        merchant,
        location,
        timestamp: new Date(),
    };
};

module.exports = { generateMockTransaction };
