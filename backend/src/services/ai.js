const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const analyzeTransaction = async (transaction) => {
    if (!process.env.OPENAI_API_KEY) {
        console.warn('OPENAI_API_KEY not found. Using mock scoring.');
        return mockScoring(transaction);
    }

    try {
        const prompt = `
      Analyze the following transaction for fraud risk. Return a JSON object with keys: "riskScore" (0-100), "riskLevel" (low, medium, high, critical), and "riskFactors" (array of strings explaining why).
      
      Transaction:
      ${JSON.stringify(transaction)}
    `;

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'system', content: 'You are a fraud detection expert.' }, { role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(completion.choices[0].message.content);
        return result;
    } catch (error) {
        console.error('AI Analysis Failed:', error.message);
        return mockScoring(transaction);
    }
};

const mockScoring = (t) => {
    let score = 10;
    const factors = [];

    if (t.amount > 1000) {
        score += 40;
        factors.push('High transaction amount');
    }
    if (t.location !== 'US' && t.amount > 500) {
        score += 30;
        factors.push('Foreign high-value transaction');
    }
    if (t.amount > 5000) {
        score += 30;
        factors.push('Very High transaction amount');
    }

    let level = 'low';
    if (score > 80) level = 'critical';
    else if (score > 60) level = 'high';
    else if (score > 30) level = 'medium';

    return {
        riskScore: score,
        riskLevel: level,
        riskFactors: factors.length ? factors : ['Normal transaction pattern'],
    };
};

module.exports = { analyzeTransaction };
