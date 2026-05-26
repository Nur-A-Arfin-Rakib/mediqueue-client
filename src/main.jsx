import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import AuthProvider from './contexts/AuthContext'
import ThemeProvider from './contexts/ThemeContext'
import { Toaster } from 'react-hot-toast'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" toastOptions={{
          style: { background: 'var(--color-card)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }
        }} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
