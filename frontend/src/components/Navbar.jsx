import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../store/authSlice';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    return (
        <nav style={{
            backgroundColor: '#212529',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: 'none'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>Real-Time Fraud Detection Dashboard</span>
            </div>
            <div>
                {user ? (
                    <button
                        onClick={onLogout}
                        style={{
                            background: '#343a40',
                            border: '1px solid #495057',
                            padding: '0.5rem 1rem',
                            color: '#fff',
                            borderRadius: '0',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '600'
                        }}
                    >
                        LOGOUT
                    </button>
                ) : null}
            </div>
        </nav>
    );
}

export default Navbar;
