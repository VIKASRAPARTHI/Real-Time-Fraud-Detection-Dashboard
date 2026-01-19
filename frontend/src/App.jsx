import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

function App() {
    const { user } = useSelector((state) => state.auth);

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
