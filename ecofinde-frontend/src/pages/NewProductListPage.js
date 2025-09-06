import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { productsAPI } from '../services/api';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #2c3e50 0%, #4CAF50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
`;

const FilterSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    background: white;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    background: white;
  }
`;

const FilterActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ClearButton = styled.button`
  background: transparent;
  color: #e74c3c;
  border: 2px solid #e74c3c;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e74c3c;
    color: white;
    transform: translateY(-2px);
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ResultsCount = styled.div`
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 600;
`;

const SortSelect = styled(Select)`
  max-width: 200px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ProductCard = styled(Link)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    text-decoration: none;
    color: inherit;
  }
`;

const ProductImage = styled.div`
  height: 240px;
  background: ${props => props.imageUrl ? `url(http://localhost:5000${props.imageUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.imageUrl ? 'rgba(0,0,0,0.2)' : "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\") repeat"};
  }
`;

const ImagePlaceholder = styled.div`
  position: relative;
  z-index: 2;
  display: ${props => props.hasImage ? 'none' : 'block'};
`;

const ProductContent = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  line-height: 1.4;
`;

const ProductPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #4CAF50;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #95a5a6;
`;

const ProductCategory = styled.span`
  background: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #7f8c8d;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const NoResultsIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const NoResultsTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const NoResultsText = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Books',
    'Sports',
    'Toys',
    'Beauty',
    'Automotive',
    'Music',
    'Other'
  ];

  useEffect(() => {
    fetchProducts();
  }, [sortBy, sortOrder]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm,
        category: category,
        minPrice: minPrice,
        maxPrice: maxPrice,
        sortBy: sortBy,
        sortOrder: sortOrder
      };

      const response = await productsAPI.searchProducts(params);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchProducts();
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('createdAt');
    setSortOrder('desc');
  };

  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <PageTitle>Discover Amazing Finds</PageTitle>
          <Subtitle>
            Browse through our curated collection of quality second-hand items and find your next treasure
          </Subtitle>
        </Header>

        <FilterSection>
          <FilterGrid>
            <FilterGroup>
              <Label>Search Products</Label>
              <Input
                type="text"
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </FilterGroup>

            <FilterGroup>
              <Label>Category</Label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
            </FilterGroup>

            <FilterGroup>
              <Label>Min Price ($)</Label>
              <Input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </FilterGroup>

            <FilterGroup>
              <Label>Max Price ($)</Label>
              <Input
                type="number"
                placeholder="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </FilterGroup>
          </FilterGrid>

          <FilterActions>
            <SearchButton onClick={handleSearch} disabled={loading}>
              {loading ? '🔍 Searching...' : '🔍 Search Products'}
            </SearchButton>
            <ClearButton onClick={handleClearFilters}>
              🗑️ Clear Filters
            </ClearButton>
          </FilterActions>
        </FilterSection>

        <ResultsHeader>
          <ResultsCount>
            {loading ? 'Loading...' : `${products.length} products found`}
          </ResultsCount>
          <FilterGroup>
            <Label>Sort by</Label>
            <SortSelect
              value={`${sortBy}-${sortOrder}`}
              onChange={handleSortChange}
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Name: A to Z</option>
              <option value="title-desc">Name: Z to A</option>
            </SortSelect>
          </FilterGroup>
        </ResultsHeader>

        {loading ? (
          <LoadingContainer>
            <div>🔍 Finding amazing products for you...</div>
          </LoadingContainer>
        ) : products.length === 0 ? (
          <NoResults>
            <NoResultsIcon>😔</NoResultsIcon>
            <NoResultsTitle>No products found</NoResultsTitle>
            <NoResultsText>
              Try adjusting your search criteria or browse all categories
            </NoResultsText>
          </NoResults>
        ) : (
          <ProductsGrid>
            {products.map((product) => {
              const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;
              return (
                <ProductCard key={product._id} to={`/products/${product._id}`}>
                  <ProductImage imageUrl={imageUrl}>
                    <ImagePlaceholder hasImage={!!imageUrl}>📦</ImagePlaceholder>
                  </ProductImage>
                  <ProductContent>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductPrice>${product.price}</ProductPrice>
                    <ProductDescription>
                      {product.description.length > 100
                        ? `${product.description.substring(0, 100)}...`
                        : product.description}
                    </ProductDescription>
                    <ProductMeta>
                      <ProductCategory>{product.category}</ProductCategory>
                      <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                    </ProductMeta>
                  </ProductContent>
                </ProductCard>
              );
            })}
          </ProductsGrid>
        )}
      </Container>
    </PageContainer>
  );
};

export default ProductListPage;
