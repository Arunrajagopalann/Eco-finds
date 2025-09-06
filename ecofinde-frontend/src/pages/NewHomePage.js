import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { theme } from '../theme';

const HomePage = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.9) 0%, rgba(69, 160, 73, 0.9) 100%), 
              url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  color: white;
  padding: 120px 2rem 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  line-height: 1.6;
  font-weight: 300;
`;

const CTAButton = styled(Link)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  color: white;
  text-decoration: none;
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  display: inline-block;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }
`;

const StatsSection = styled.section`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  padding: 4rem 2rem;
  margin: -40px 2rem 0;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 3;
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xxl};
  
  ${theme.mediaQueries.mobileAndTablet} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
  
  ${theme.mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  border: 1px solid rgba(76, 175, 80, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-color: rgba(76, 175, 80, 0.3);
  }
`;

const StatIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #4CAF50;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
`;

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm0-20v20l17.321-10z'/%3E%3C/g%3E%3C/svg%3E") repeat;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xxl};
  
  ${theme.mediaQueries.mobileAndTablet} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
  
  ${theme.mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const ProductsPreview = styled.section`
  padding: 6rem 2rem;
  background: white;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xxl};
  
  ${theme.mediaQueries.mobileAndTablet} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    margin-top: ${theme.spacing.xl};
  }
  
  ${theme.mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${theme.mediaQueries.desktopAndUp} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background: ${props => props.imageUrl ? `url(http://localhost:5000${props.imageUrl})` : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.imageUrl ? 'rgba(0,0,0,0.2)' : 'none'};
  }
`;

const ImagePlaceholder = styled.div`
  position: relative;
  z-index: 2;
  display: ${props => props.hasImage ? 'none' : 'block'};
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4CAF50;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ViewAllButton = styled(Link)`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  display: inline-block;
  margin: 3rem auto 0;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(76, 175, 80, 0.4);
  }
`;

const ViewAllContainer = styled.div`
  text-align: center;
`;

const HomePageComponent = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsAPI.getProducts();
        setFeaturedProducts(response.data.slice(0, 6)); // Show first 6 products
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <HomePage>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Discover Sustainable Treasures</HeroTitle>
          <HeroSubtitle>
            Join our eco-friendly marketplace where every purchase helps reduce waste and creates a more sustainable future for our planet.
          </HeroSubtitle>
          <CTAButton to="/products">Start Shopping</CTAButton>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <StatsGrid>
          <StatCard>
            <StatIcon>♻️</StatIcon>
            <StatNumber>10K+</StatNumber>
            <StatLabel>Items Recycled</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>🌱</StatIcon>
            <StatNumber>50K+</StatNumber>
            <StatLabel>CO₂ Saved (kg)</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>👥</StatIcon>
            <StatNumber>5K+</StatNumber>
            <StatLabel>Happy Members</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>💚</StatIcon>
            <StatNumber>99%</StatNumber>
            <StatLabel>Satisfaction Rate</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>Why Choose EcoFinds?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🌍</FeatureIcon>
              <FeatureTitle>Eco-Friendly</FeatureTitle>
              <FeatureDescription>
                Every item you buy or sell helps reduce waste and promotes sustainable living for a greener planet.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>💰</FeatureIcon>
              <FeatureTitle>Great Prices</FeatureTitle>
              <FeatureDescription>
                Find amazing deals on quality pre-owned items while earning money by selling things you no longer need.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🔒</FeatureIcon>
              <FeatureTitle>Secure & Trusted</FeatureTitle>
              <FeatureDescription>
                Shop with confidence knowing all transactions are secure and our community is built on trust and reliability.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      <ProductsPreview>
        {/* <Container>
          <SectionTitle style={{ color: '#2c3e50' }}>Featured Items</SectionTitle>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '3rem' }}>⏳</div>
              <p>Loading amazing finds...</p>
            </div>
          ) : (
            <>
              <ProductsGrid>
                {featuredProducts.map((product) => {
                  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;
                  return (
                    <ProductCard key={product._id}>
                      <ProductImage imageUrl={imageUrl}>
                        <ImagePlaceholder hasImage={!!imageUrl}>📦</ImagePlaceholder>
                      </ProductImage>
                      <ProductInfo>
                        <ProductTitle>{product.title}</ProductTitle>
                        <ProductPrice>${product.price}</ProductPrice>
                        <ProductDescription>
                          {product.description.substring(0, 100)}...
                        </ProductDescription>
                      </ProductInfo>
                    </ProductCard>
                  );
                })}
              </ProductsGrid>
              <ViewAllContainer>
                <ViewAllButton to="/products">View All Products</ViewAllButton>
              </ViewAllContainer>
            </>
          )}
        </Container> */}
      </ProductsPreview>
    <FooterSection>
      <FooterContainer>
        <FooterBrand>
          <FooterTitle>EcoFinds</FooterTitle>
        </FooterBrand>
        <FooterSubtitle>Sustainable Second-Hand Marketplace</FooterSubtitle>
        <FooterLinksGrid>
          <FooterLinksColumn>
            <FooterLinksTitle>Explore</FooterLinksTitle>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/categories">Categories</FooterLink>
            <FooterLink to="/products">All Products</FooterLink>
          </FooterLinksColumn>
          <FooterLinksColumn>
            <FooterLinksTitle>Company</FooterLinksTitle>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/mission">Our Mission</FooterLink>
            <FooterLink to="/sustainability">Sustainability</FooterLink>
          </FooterLinksColumn>
          <FooterLinksColumn>
            <FooterLinksTitle>Support</FooterLinksTitle>
            <FooterLink to="/faqs">FAQs</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/returns">Returns & Refunds</FooterLink>
          </FooterLinksColumn>
          <FooterLinksColumn>
            <FooterLinksTitle>Legal</FooterLinksTitle>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/shipping">Shipping Policy</FooterLink>
          </FooterLinksColumn>
          <FooterLinksColumn>
            <FooterLinksTitle>Shop</FooterLinksTitle>
            <FooterLink to="/women">Women's Collection</FooterLink>
            <FooterLink to="/men">Men's Collection</FooterLink>
            <FooterLink to="/kids">Kids' Fashion</FooterLink>
          </FooterLinksColumn>
        </FooterLinksGrid>
        <FooterSocialRow>
          <FooterSocialIcon href="#" aria-label="Instagram">📸</FooterSocialIcon>
          <FooterSocialIcon href="#" aria-label="WhatsApp">🟢</FooterSocialIcon>
          <FooterSocialIcon href="#" aria-label="YouTube">▶️</FooterSocialIcon>
          <FooterSocialIcon href="#" aria-label="LinkedIn">💼</FooterSocialIcon>
          <FooterSocialIcon href="#" aria-label="X">✖️</FooterSocialIcon>
        </FooterSocialRow>
        <FooterCopyright>
          © {new Date().getFullYear()} EcoFinds | Sustainable Marketplace for Women, Men, Kids Fashion
        </FooterCopyright>
      </FooterContainer>
    </FooterSection>
  </HomePage>
);
}

// Footer Styles

const FooterSection = styled.footer`
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  padding: 4rem 2rem 2rem;
  border-top: 2px solid ${theme.colors.border};
  margin-top: 4rem;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;


const FooterTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin: 0;
`;

const FooterSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.muted};
  margin: 1rem 0 2rem 0;
`;

const FooterLinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: 2.5rem;
  border-bottom: 1px solid ${theme.colors.border};
  padding-bottom: 2rem;
  
  ${theme.mediaQueries.mobileAndTablet} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
  
  ${theme.mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FooterLinksColumn = styled.div`
  text-align: left;
`;

const FooterLinksTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${theme.colors.text};
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${theme.colors.muted};
  text-decoration: none;
  margin-bottom: 0.7rem;
  font-size: 1rem;
  transition: color 0.2s;
  &:hover {
    color: ${theme.colors.primary};
    text-decoration: underline;
  }
`;

const FooterSocialRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 0 1rem 0;
`;

const FooterSocialIcon = styled.a`
  font-size: 2rem;
  color: ${theme.colors.accent};
  background: ${theme.colors.background};
  border-radius: 50%;
  padding: 0.5rem;
  transition: background 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${theme.colors.primary};
    color: white;
  }
`;

const FooterCopyright = styled.div`
  font-size: 0.95rem;
  color: ${theme.colors.muted};
  margin-top: 1.5rem;
`;

export default HomePageComponent;
