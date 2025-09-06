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

const CartCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const CartItem = styled.div`
  display: flex;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  align-items: center;
  gap: 1rem;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'linear-gradient(45deg, #f0f0f0, #e0e0e0)'};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 2rem;
  flex-shrink: 0;
  
  ${props => props.imageUrl && `
    background-image: url(${props.imageUrl});
  `}
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const ItemMeta = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ItemPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #4caf50;
`;

const RemoveButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #c0392b;
  }
`;

const CartSummary = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-top: 2px solid #eee;
  text-align: center;
`;

const TotalAmount = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const CheckoutButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  
  &:hover {
    background: #45a049;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const CartPage = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await usersAPI.getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await usersAPI.removeFromCart(productId);
      setCart({
        ...cart,
        items: cart.items.filter(item => item.product._id !== productId)
      });
    } catch (error) {
      alert('Failed to remove item from cart');
    }
  };

  const handleCheckout = () => {
    alert('Checkout functionality to be implemented');
  };

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0).toFixed(2);
  };

  if (loading) {
    return <LoadingMessage>Loading cart...</LoadingMessage>;
  }

  return (
    <PageContainer>
      <Title>Shopping Cart</Title>
      
      {cart.items.length === 0 ? (
        <EmptyCart>
          <h3>Your cart is empty</h3>
          <p>Browse our products and add items to your cart!</p>
        </EmptyCart>
      ) : (
        <CartCard>
          {cart.items.map(item => {
            const imageUrl = item.product.images && item.product.images.length > 0 
              ? `http://localhost:5000${item.product.images[0]}` 
              : null;
            
            return (
              <CartItem key={item.product._id}>
                <ItemImage imageUrl={imageUrl}>
                  {!imageUrl && '📷'}
                </ItemImage>
                <ItemInfo>
                  <ItemTitle>{item.product.title}</ItemTitle>
                  <ItemMeta>
                    Category: {item.product.category} | 
                    Condition: {item.product.condition} |
                    Quantity: {item.quantity}
                  </ItemMeta>
                </ItemInfo>
                <ItemPrice>${item.product.price}</ItemPrice>
                <RemoveButton 
                  onClick={() => handleRemoveFromCart(item.product._id)}
                >
                  Remove
                </RemoveButton>
              </CartItem>
            );
          })}
          
          <CartSummary>
            <TotalAmount>
              Total: ${calculateTotal()}
            </TotalAmount>
            <CheckoutButton onClick={handleCheckout}>
              Proceed to Checkout
            </CheckoutButton>
          </CartSummary>
        </CartCard>
      )}
    </PageContainer>
  );
};

export default CartPage;
