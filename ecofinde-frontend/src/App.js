import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import styled from 'styled-components';
import { theme } from './theme';

// Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/NewHomePage';
import ProductListPage from './pages/NewProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProductPage from './pages/NewAddProductPage';
import EditProductPage from './pages/EditProductPage';
import MyListingsPage from './pages/MyListingsPage';
import UserDashboard from './pages/UserDashboard';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';

// Components
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

const MainContent = styled.main`
  padding-top: ${props => props.hasNavbar ? '80px' : '0'};
  color: ${theme.colors.text};
  
  ${theme.mediaQueries.mobileAndTablet} {
    padding-top: ${props => props.hasNavbar ? '60px' : '0'};
  }
`;

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  
  return !isAuthenticated ? children : <Navigate to="/" />;
};

function AppContent() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AppContainer>
      <Router>
        {isAuthenticated && <Navbar />}
        <MainContent hasNavbar={isAuthenticated}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            
            <Route path="/products" element={
              <ProtectedRoute>
                <ProductListPage />
              </ProtectedRoute>
            } />
            
            
            <Route path="/products/:id" element={
              <ProtectedRoute>
                <ProductDetailPage />
              </ProtectedRoute>
            } />
            
            <Route path="/add-product" element={
              <ProtectedRoute>
                <AddProductPage />
              </ProtectedRoute>
            } />
            
            <Route path="/edit-product/:id" element={
              <ProtectedRoute>
                <EditProductPage />
              </ProtectedRoute>
            } />
            
            <Route path="/my-listings" element={
              <ProtectedRoute>
                <MyListingsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/cart" element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } />
            
            <Route path="/orders" element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } />
          </Routes>
        </MainContent>
      </Router>
    </AppContainer>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
