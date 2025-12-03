import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'; // <--- 1. Importa questo

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
        <Analytics /> {/* <--- 2. Aggiungilo qui */}
    </React.StrictMode>,
)