import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { productsAPI } from '../services/api';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${slideUp} 0.4s ease-out;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const AddButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #4CAF50;
  color: white;
  text-decoration: none;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);
  
  &:hover {
    background: #45a049;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  transition: all 0.2s ease;
  animation: ${slideUp} 0.3s ease-out;
  animation-delay: ${props => `${0.05 * (props.index || 0)}s`};
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.imageUrl ? `url(http://localhost:5000${props.imageUrl})` : '#f8f9fa'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adb5bd;
  font-size: 3rem;
  transition: transform 0.2s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.02);
  }
`;

const CameraIcon = styled.div`
  display: ${props => props.hasImage ? 'none' : 'block'};
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: ${props => props.status === 'available' ? '#4CAF50' : '#e74c3c'};
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  z-index: 2;
`;

const ProductInfo = styled.div`
  padding: 1.25rem;
`;

const ProductTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.3;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #4CAF50;
`;

const ProductCondition = styled.div`
  background: #f8f9fa;
  color: #6c757d;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
`;

const ProductActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  ${props => props.$variant === 'edit' && `
    background: #3498db;
    color: white;
    
    &:hover {
      background: #2980b9;
      transform: translateY(-1px);
    }
  `}
  
  ${props => props.$variant === 'delete' && `
    background: #e74c3c;
    color: white;
    
    &:hover {
      background: #c0392b;
      transform: translateY(-1px);
    }
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  animation: ${fadeIn} 0.4s ease-out;
  animation-delay: 0.3s;
  animation-fill-mode: both;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
`;

const EmptyStateTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
`;

const EmptyStateText = styled.p`
  color: #7f8c8d;
  font-size: 1rem;
  line-height: 1.5;
  max-width: 400px;
  margin: 0 auto 1.5rem;
`;

const EmptyStateButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #4CAF50;
  color: white;
  text-decoration: none;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: #45a049;
    transform: translateY(-1px);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #7f8c8d;
  font-size: 1rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const MyListingsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const response = await productsAPI.getMyListings();
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      try {
        await productsAPI.deleteProduct(productId);
        setProducts(products.filter(p => p._id !== productId));
        
        // Success notification with animation
        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
          z-index: 1000;
          animation: slideInRight 0.5s ease-out;
        `;
        notification.textContent = '✅ Product deleted successfully!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.animation = 'slideOutRight 0.5s ease-out';
          setTimeout(() => document.body.removeChild(notification), 500);
        }, 3000);
      } catch (error) {
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <LoadingMessage>
            <LoadingSpinner />
            Loading your amazing listings...
          </LoadingMessage>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <Title>My Listings</Title>
          <Subtitle>Manage your products</Subtitle>
          <AddButton to="/add-product">
            <span>+</span>
            Add New Product
          </AddButton>
        </Header>
        
        {products.length === 0 ? (
          <EmptyState>
            <EmptyStateIcon>�</EmptyStateIcon>
            <EmptyStateTitle>No listings yet</EmptyStateTitle>
            <EmptyStateText>
              Start selling by creating your first product listing.
            </EmptyStateText>
            <EmptyStateButton to="/add-product">
              <span>+</span>
              Create Your First Listing
            </EmptyStateButton>
          </EmptyState>
        ) : (
          <ProductsGrid>
            {products.map((product, index) => {
              const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;
              return (
                <ProductCard key={product._id} index={index}>
                  <ProductImageContainer>
                    <ProductImage imageUrl={imageUrl}>
                      <CameraIcon hasImage={!!imageUrl}>📷</CameraIcon>
                    </ProductImage>
                    <StatusBadge status={product.status}>
                      {product.status}
                    </StatusBadge>
                  </ProductImageContainer>
                  <ProductInfo>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductMeta>
                      <ProductPrice>{product.price}</ProductPrice>
                      <ProductCondition>{product.condition}</ProductCondition>
                    </ProductMeta>
                    <ProductActions>
                      <ActionButton 
                        $variant="edit"
                        onClick={() => handleEdit(product._id)}
                      >
                        Edit
                      </ActionButton>
                      <ActionButton 
                        $variant="delete"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </ActionButton>
                    </ProductActions>
                  </ProductInfo>
                </ProductCard>
              );
            })}
          </ProductsGrid>
        )}
      </ContentWrapper>
      
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </PageContainer>
  );
};

export default MyListingsPage;
