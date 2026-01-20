import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { getTransactions, addTransaction } from '../store/transactionSlice';
import Navbar from '../components/Navbar';
import TransactionTable from '../components/TransactionTable';
import StatsCard from '../components/StatsCard';
import RiskChart from '../components/RiskChart';

function Dashboard() {
    const dispatch = useDispatch();
    const { transactions } = useSelector((state) => state.transactions);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        // 1. Fetch initial history
        dispatch(getTransactions());

        // 2. Setup Socket
        const socket = io();

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('new-transaction', (txn) => {
            dispatch(addTransaction(txn));
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    // Calculate Metrics
    const totalTxns = transactions.length;
    const fraudTxns = transactions.filter(t => t.riskLevel === 'high' || t.riskLevel === 'critical').length;
    const fraudPercentage = totalTxns > 0 ? ((fraudTxns / totalTxns) * 100).toFixed(1) : 0;

    const totalVolume = transactions.reduce((acc, curr) => acc + curr.amount, 0);
    const avgRisk = totalTxns > 0
        ? (transactions.reduce((acc, curr) => acc + curr.riskScore, 0) / totalTxns).toFixed(0)
        : 0;

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <div>
                        <h1 className="dashboard-title">Live Transaction Monitor</h1>
                        <p style={{ color: '#94a3b8' }}>Welcome back, {user && user.username}</p>
                    </div>
                </header>

                <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                    <StatsCard
                        title="Total Volume"
                        value={`$${totalVolume.toLocaleString()}`}
                    />
                    <StatsCard
                        title="Avg Risk Score"
                        value={avgRisk}
                    />
                    <StatsCard
                        title="Fraud Detected"
                        value={fraudTxns}
                        trend={fraudPercentage}
                    />
                    <StatsCard
                        title="Live Stream"
                        value="Active"
                    />
                </div>

                <div className="dashboard-grid">
                    <div className="card full-width" style={{ height: '400px' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Risk Trend Analysis</h3>
                        <div style={{ height: '340px' }}>
                            <RiskChart transactions={transactions} />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '1rem' }}>Recent Transactions</h3>
                    <TransactionTable transactions={transactions} />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
