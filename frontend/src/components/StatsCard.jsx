import React from 'react';

function StatsCard({ title, value, trend }) {
    return (
        <div className="card">
            <div style={{ marginBottom: '10px' }}>
                <h3 style={{ color: '#6c757d', fontSize: '0.85rem', margin: 0, textTransform: 'uppercase', fontWeight: 'bold' }}>{title}</h3>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#212529' }}>{value}</div>
            {trend && (
                <div style={{ fontSize: '0.8rem', color: trend > 0 ? '#dc3545' : '#198754', marginTop: '5px', fontWeight: '600' }}>
                    {trend > 0 ? '+' : '-'} {Math.abs(trend)}%
                </div>
            )}

        </div>
    );
}

export default StatsCard;
