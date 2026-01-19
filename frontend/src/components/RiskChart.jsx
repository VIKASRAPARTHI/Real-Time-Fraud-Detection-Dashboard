import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: { color: '#94a3b8' }
        },
        title: {
            display: false,
        },
    },
    scales: {
        y: {
            grid: { color: '#334155' },
            ticks: { color: '#94a3b8' }
        },
        x: {
            grid: { display: false },
            ticks: { color: '#94a3b8' }
        }
    }
};

function RiskChart({ transactions }) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        // Process last 20 transactions for the chart
        const recent = transactions.slice(0, 20).reverse();

        const labels = recent.map(t => new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        const riskScores = recent.map(t => t.riskScore);
        const amounts = recent.map(t => t.amount); // Maybe too noisy

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Risk Score',
                    data: riskScores,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.5)',
                    tension: 0.4,
                },
                {
                    label: 'Amount ($)',
                    data: amounts,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    yAxisID: 'y1',
                }
            ],
        });
    }, [transactions]);

    return <Line options={options} data={chartData} />;
}

export default RiskChart;
