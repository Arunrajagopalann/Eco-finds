import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { productsAPI, usersAPI } from '../services/api';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const ProductDetailCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 400px;
  background: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'linear-gradient(45deg, #f0f0f0, #e0e0e0)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 5rem;
`;

const ProductInfo = styled.div`
  padding: 2rem;
`;

const ProductTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 1rem;
`;

const ProductMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MetaLabel = styled.span`
  font-weight: 500;
  color: #666;
  font-size: 0.9rem;
`;

const MetaValue = styled.span`
  color: #2c3e50;
`;

const Description = styled.div`
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
`;

const ActionButton = styled.button`
  background: ${props => props.danger ? '#e74c3c' : '#4caf50'};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 1rem;
  margin-bottom: 1rem;
  
  &:hover {
    background: ${props => props.danger ? '#c0392b' : '#45a049'};
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProduct(id);
      setProduct(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await usersAPI.addToCart(product._id, 1);
      alert('Product added to cart!');
    } catch (err) {
      alert('Failed to add product to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <LoadingMessage>Loading product details...</LoadingMessage>;
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorMessage>{error}</ErrorMessage>
        <ActionButton onClick={() => navigate('/products')}>
          Back to Products
        </ActionButton>
      </PageContainer>
    );
  }

  if (!product) {
    return (
      <PageContainer>
        <ErrorMessage>Product not found</ErrorMessage>
        <ActionButton onClick={() => navigate('/products')}>
          Back to Products
        </ActionButton>
      </PageContainer>
    );
  }

  const imageUrl = product.images && product.images.length > 0 
    ? `http://localhost:5000${product.images[0]}` 
    : null;

  return (
    <PageContainer>
      <ProductDetailCard>
        <ProductImage imageUrl={imageUrl}>
          {!imageUrl && '📷'}
        </ProductImage>
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>${product.price}</ProductPrice>
          
          <ProductMeta>
            <MetaItem>
              <MetaLabel>Category</MetaLabel>
              <MetaValue>{product.category}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Condition</MetaLabel>
              <MetaValue>{product.condition}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Seller</MetaLabel>
              <MetaValue>{product.seller?.username}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Views</MetaLabel>
              <MetaValue>{product.views}</MetaValue>
            </MetaItem>
          </ProductMeta>

          <Description>
            <h3>Description</h3>
            <p>{product.description}</p>
          </Description>

          <div>
            <ActionButton 
              onClick={handleAddToCart}
              disabled={addingToCart || product.status !== 'available'}
            >
              {addingToCart ? 'Adding...' : 'Add to Cart'}
            </ActionButton>
            
            <ActionButton onClick={() => navigate('/products')}>
              Back to Products
            </ActionButton>
          </div>
        </ProductInfo>
      </ProductDetailCard>
    </PageContainer>
  );
};

export default ProductDetailPage;
