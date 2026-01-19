import React from 'react';

function TransactionTable({ transactions }) {
    if (!transactions || transactions.length === 0) {
        return <div style={{ padding: '1rem', color: '#94a3b8' }}>No transactions yet...</div>;
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>ID</th>
                        <th>Merchant</th>
                        <th>Amount</th>
                        <th>Location</th>
                        <th>Risk Score</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((txn) => (
                        <tr key={txn._id || txn.transactionId} style={{
                            backgroundColor: txn.riskLevel === 'critical' ? '#fff5f5' : undefined
                        }}>
                            <td>{new Date(txn.timestamp).toLocaleTimeString()}</td>
                            <td style={{ fontFamily: 'Consolas, monospace', fontSize: '0.85rem' }}>{txn.transactionId}</td>
                            <td>{txn.merchant}</td>
                            <td style={{ fontWeight: 'bold' }}>${txn.amount.toFixed(2)}</td>
                            <td>{txn.location}</td>
                            <td>
                                <div style={{
                                    width: '100%',
                                    height: '10px',
                                    background: '#e9ecef',
                                    border: '1px solid #dee2e6',
                                    maxWidth: '120px'
                                }}>
                                    <div style={{
                                        width: `${txn.riskScore}%`,
                                        height: '100%',
                                        background: txn.riskScore > 80 ? '#dc3545' : txn.riskScore > 50 ? '#ffc107' : '#198754',
                                    }}></div>
                                </div>
                            </td>

                            <td>
                                <span className={`risk-badge risk-${txn.riskLevel}`}>
                                    {txn.riskLevel}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionTable;
