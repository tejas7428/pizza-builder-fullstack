import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SocketProvider } from './context/SocketContext'
import AuthContext from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import PizzaBuilder from './pages/PizzaBuilder'
import OrderHistory from './pages/OrderHistory'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import AdminInventory from './pages/AdminInventory'
import AdminOrders from './pages/AdminOrders'
import AuthGuard from './components/AuthGuard'
import './App.css'

function App() {
  return (
    <SocketProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
                <Route path="/admin" element={<AuthGuard requiredRole="admin"><AdminDashboard /></AuthGuard>} />
                <Route path="/admin/inventory" element={<AuthGuard requiredRole="admin"><AdminInventory /></AuthGuard>} />
                <Route path="/admin/orders" element={<AuthGuard requiredRole="admin"><AdminOrders /></AuthGuard>} />
                <Route path="/build-pizza" element={<AuthGuard><PizzaBuilder /></AuthGuard>} />
                <Route path="/checkout" element={<AuthGuard><Checkout /></AuthGuard>} />
                <Route path="/order-confirmation/:id" element={<AuthGuard><OrderConfirmation /></AuthGuard>} />
                <Route path="/orders" element={<AuthGuard><OrderHistory /></AuthGuard>} />
              </Routes>
            </main>
          </div>
        </Router>
      </NotificationProvider>
    </SocketProvider>
  )
}

export default App