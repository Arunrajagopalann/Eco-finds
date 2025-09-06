import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { usersAPI } from '../services/api';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const OrderHeader = styled.div`
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderId = styled.span`
  font-weight: bold;
  color: #2c3e50;
`;

const OrderDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const OrderContent = styled.div`
  padding: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'linear-gradient(45deg, #f0f0f0, #e0e0e0)'};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h4`
  color: #2c3e50;
  margin-bottom: 0.25rem;
`;

const ItemMeta = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const OrderMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case 'pending':
        return 'background: #fff3cd; color: #856404;';
      case 'confirmed':
        return 'background: #d4edda; color: #155724;';
      case 'shipped':
        return 'background: #cce5ff; color: #004085;';
      case 'delivered':
        return 'background: #d1ecf1; color: #0c5460;';
      case 'cancelled':
        return 'background: #f8d7da; color: #721c24;';
      default:
        return 'background: #e2e3e5; color: #383d41;';
    }
  }}
`;

const TotalAmount = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: #4caf50;
`;

const EmptyOrders = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await usersAPI.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <LoadingMessage>Loading orders...</LoadingMessage>;
  }

  return (
    <PageContainer>
      <Title>Order History</Title>
      
      {orders.length === 0 ? (
        <EmptyOrders>
          <h3>No orders yet</h3>
          <p>Your purchase history will appear here once you start shopping!</p>
        </EmptyOrders>
      ) : (
        orders.map(order => (
          <OrderCard key={order._id}>
            <OrderHeader>
              <OrderId>Order #{order._id.slice(-8)}</OrderId>
              <OrderDate>{formatDate(order.createdAt)}</OrderDate>
            </OrderHeader>
            
            <OrderContent>
              <OrderItem>
                <ItemImage imageUrl={order.product.images && order.product.images.length > 0 ? `http://localhost:5000${order.product.images[0]}` : null}>
                  {(!order.product.images || order.product.images.length === 0) && '📷'}
                </ItemImage>
                <ItemInfo>
                  <ItemTitle>{order.product.title}</ItemTitle>
                  <ItemMeta>
                    Seller: {order.seller.username} | 
                    Quantity: {order.quantity}
                  </ItemMeta>
                </ItemInfo>
              </OrderItem>
              
              <OrderMeta>
                <StatusBadge status={order.status}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </StatusBadge>
                <TotalAmount>${order.totalAmount}</TotalAmount>
              </OrderMeta>
            </OrderContent>
          </OrderCard>
        ))
      )}
    </PageContainer>
  );
};

export default OrdersPage;
