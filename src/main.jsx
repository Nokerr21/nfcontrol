import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import WebApp from './WebApp.jsx'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <WebApp />
    </BrowserRouter>
  </React.StrictMode>,
)
