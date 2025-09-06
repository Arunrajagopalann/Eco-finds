import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  margin-bottom: 3rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #4caf50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s;
  
  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
`;

const FeaturesSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const QuickActions = styled.section`
  background: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const ActionCard = styled(Link)`
  display: block;
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s;
  border: 2px solid transparent;
  
  &:hover {
    background: #4caf50;
    color: white;
    transform: translateY(-3px);
    border-color: #45a049;
  }
`;

const ActionIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ActionTitle = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const ActionDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const HomePage = () => {
  const { user } = useAuth();

  return (
    <HomeContainer>
      <Hero>
        <HeroTitle>Welcome to EcoFinds</HeroTitle>
        <HeroSubtitle>
          Discover amazing second-hand treasures and give items a new life
        </HeroSubtitle>
        <CTAButton to="/products">Start Shopping</CTAButton>
      </Hero>

      <FeaturesSection>
        <SectionTitle>Why Choose EcoFinds?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🌱</FeatureIcon>
            <FeatureTitle>Sustainable Shopping</FeatureTitle>
            <FeatureDescription>
              Reduce waste and help the environment by giving pre-owned items a second chance.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>💰</FeatureIcon>
            <FeatureTitle>Great Deals</FeatureTitle>
            <FeatureDescription>
              Find quality items at affordable prices and save money while shopping consciously.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🤝</FeatureIcon>
            <FeatureTitle>Community-Driven</FeatureTitle>
            <FeatureDescription>
              Connect with like-minded people in your community who care about sustainable living.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <QuickActions>
        <SectionTitle>Quick Actions</SectionTitle>
        <ActionsGrid>
          <ActionCard to="/products">
            <ActionIcon>🔍</ActionIcon>
            <ActionTitle>Browse Products</ActionTitle>
            <ActionDescription>Explore our marketplace</ActionDescription>
          </ActionCard>
          
          <ActionCard to="/add-product">
            <ActionIcon>➕</ActionIcon>
            <ActionTitle>Sell an Item</ActionTitle>
            <ActionDescription>List your products</ActionDescription>
          </ActionCard>
          
          <ActionCard to="/my-listings">
            <ActionIcon>📋</ActionIcon>
            <ActionTitle>My Listings</ActionTitle>
            <ActionDescription>Manage your products</ActionDescription>
          </ActionCard>
          
          <ActionCard to="/cart">
            <ActionIcon>🛒</ActionIcon>
            <ActionTitle>My Cart</ActionTitle>
            <ActionDescription>View saved items</ActionDescription>
          </ActionCard>
          
          <ActionCard to="/orders">
            <ActionIcon>📦</ActionIcon>
            <ActionTitle>Order History</ActionTitle>
            <ActionDescription>Track your purchases</ActionDescription>
          </ActionCard>
          
          <ActionCard to="/dashboard">
            <ActionIcon>👤</ActionIcon>
            <ActionTitle>Profile</ActionTitle>
            <ActionDescription>Update your info</ActionDescription>
          </ActionCard>
        </ActionsGrid>
      </QuickActions>
    </HomeContainer>
  );
};

export default HomePage;
