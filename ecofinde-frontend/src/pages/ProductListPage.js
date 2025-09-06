import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { productsAPI } from '../services/api';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

const FilterSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'linear-gradient(45deg, #f0f0f0, #e0e0e0)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 3rem;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 0.5rem;
`;

const ProductCategory = styled.span`
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666;
`;

const ViewButton = styled(Link)`
  display: block;
  background: #4caf50;
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  text-align: center;
  margin-top: 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  
  &:hover {
    background: #45a049;
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

const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Books',
  'Furniture',
  'Sports',
  'Toys',
  'Home & Garden',
  'Vehicles',
  'Others'
];

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    category: 'All Categories',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (filters.search) params.search = filters.search;
      if (filters.category !== 'All Categories') params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      const response = await productsAPI.getProducts(params);
      setProducts(response.data.products);
      setError('');
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <PageContainer>
      <Title>Browse Products</Title>
      
      <FilterSection>
        <FilterRow>
          <FilterGroup>
            <Label>Search</Label>
            <Input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search products..."
            />
          </FilterGroup>
          
          <FilterGroup>
            <Label>Category</Label>
            <Select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
          </FilterGroup>
          
          <FilterGroup>
            <Label>Min Price</Label>
            <Input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="$0"
            />
          </FilterGroup>
          
          <FilterGroup>
            <Label>Max Price</Label>
            <Input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="$1000"
            />
          </FilterGroup>
        </FilterRow>
      </FilterSection>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading ? (
        <LoadingMessage>Loading products...</LoadingMessage>
      ) : (
        <ProductsGrid>
          {products.map(product => {
            const imageUrl = product.images && product.images.length > 0 
              ? `http://localhost:5000${product.images[0]}` 
              : null;
            
            return (
              <ProductCard key={product._id}>
                <ProductImage imageUrl={imageUrl}>
                  {!imageUrl && '📷'}
                </ProductImage>
                <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>${product.price}</ProductPrice>
                <ProductCategory>{product.category}</ProductCategory>
                <ViewButton to={`/products/${product._id}`}>
                  View Details
                </ViewButton>
              </ProductInfo>
            </ProductCard>
            );
          })}
        </ProductsGrid>
      )}

      {!loading && products.length === 0 && (
        <LoadingMessage>No products found matching your criteria.</LoadingMessage>
      )}
    </PageContainer>
  );
};

export default ProductListPage;
