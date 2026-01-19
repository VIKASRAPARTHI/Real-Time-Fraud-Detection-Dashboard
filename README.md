# Real-Time Fraud Detection Dashboard

A real-time transaction monitoring system that uses AI (OpenAI) to detect potential fraud patterns.

## Features
- **Real-time Monitoring**: Live transaction stream via WebSockets.
- **AI Fraud Scoring**: Analyzes risk factors and assigns a score (0-100).
- **Dashboard**: Interactive charts and detailed transaction logs.
- **Secure Auth**: JWT-based authentication for analysts and admins.
- **Mock Data Generator**: Simulates realistic transaction traffic.

## Tech Stack
- **Frontend**: React, Redux Toolkit, Chart.js, Vite
- **Backend**: Node.js, Express, Socket.io, Mongoose
- **Database**: MongoDB
- **AI**: OpenAI API (with mock fallback)

## Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)
- Docker (Optional)

## Quick Start

### 1. Setup Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Usage
- Open `http://localhost:5173`
- Register a new account.
- The dashboard will automatically start receiving live mock transactions.

## Docker Support
Run the entire stack with one command:
```bash
docker-compose up --build
```
