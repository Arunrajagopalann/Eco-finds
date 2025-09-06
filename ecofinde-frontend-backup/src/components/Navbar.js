import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../theme';
import { useAuth } from '../context/AuthContext';

const NavbarContainer = styled.nav`
  background: ${theme.colors.background};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${theme.colors.border};
  padding: 0 ${theme.spacing.lg};
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: ${theme.shadows.md};
  
  ${theme.mediaQueries.mobileAndTablet} {
    padding: 0 ${theme.spacing.md};
  }
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  height: 80px;
  
  ${theme.mediaQueries.mobileAndTablet} {
    height: 60px;
  }
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;


const BrandText = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandName = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BrandSubtitle = styled.span`
  font-size: 0.75rem;
  color: #7f8c8d;
  font-weight: 400;
  margin-top: -2px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  ${theme.mediaQueries.mobileAndTablet} {
    display: none;
  }
`;

const BurgerMenu = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  
  ${theme.mediaQueries.mobileAndTablet} {
    display: flex;
  }
  
  &:focus {
    outline: none;
  }
  
  div {
    width: 2rem;
    height: 0.25rem;
    background: ${theme.colors.text};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    
    :first-child {
      transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }
    
    :nth-child(2) {
      opacity: ${props => props.isOpen ? '0' : '1'};
      transform: ${props => props.isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }
    
    :nth-child(3) {
      transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.xl};
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 1001;
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  
  ${theme.mediaQueries.desktopAndUp} {
    display: none;
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  
  ${theme.mediaQueries.desktopAndUp} {
    display: none;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
`;

const MobileNavLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.text};
  font-weight: ${theme.typography.fontWeights.medium};
  font-size: ${theme.typography.fontSizes.lg};
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.border};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const MobileUserSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-top: auto;
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.border};
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #4CAF50;
    background: rgba(76, 175, 80, 0.1);
    transform: translateY(-1px);
  }
  
  &.active {
    color: #4CAF50;
    background: rgba(76, 175, 80, 0.1);
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  ${theme.mediaQueries.mobileAndTablet} {
    display: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 25px;
  border: 1px solid rgba(76, 175, 80, 0.2);
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
`;

const UserName = styled.span`
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
  }
`;

const CartButton = styled(Link)`
  position: relative;
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  text-decoration: none;
  padding: 0.6rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  
  &:hover {
    background: rgba(52, 152, 219, 0.2);
    transform: translateY(-1px);
  }
`;

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <NavbarContainer>
        <NavbarContent>
          <Brand to="/" onClick={closeMobileMenu}>
            <BrandText>
              <BrandName>EcoFinds</BrandName>
              <BrandSubtitle>Sustainable Marketplace</BrandSubtitle>
            </BrandText>
          </Brand>
          
          <NavLinks>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Browse</NavLink>
            <NavLink to="/add-product">Sell Item</NavLink>
            <NavLink to="/my-listings">My Listings</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <CartButton to="/cart">🛒</CartButton>
          </NavLinks>

          <UserSection>
            <UserInfo>
              <Avatar>{user?.username?.charAt(0).toUpperCase()}</Avatar>
              <UserName>{user?.username}</UserName>
            </UserInfo>
            <LogoutButton onClick={handleLogout}>Sign Out</LogoutButton>
          </UserSection>

          <BurgerMenu isOpen={isMobileMenuOpen} onClick={toggleMobileMenu}>
            <div />
            <div />
            <div />
          </BurgerMenu>
        </NavbarContent>
      </NavbarContainer>

      <MobileMenuOverlay isOpen={isMobileMenuOpen} onClick={closeMobileMenu} />
      
      <MobileMenu isOpen={isMobileMenuOpen}>
        <Brand to="/" onClick={closeMobileMenu}>
          <BrandText>
            <BrandName>EcoFinds</BrandName>
            <BrandSubtitle>Sustainable Marketplace</BrandSubtitle>
          </BrandText>
        </Brand>

        <MobileNavLinks>
          <MobileNavLink to="/" onClick={closeMobileMenu}>Home</MobileNavLink>
          <MobileNavLink to="/products" onClick={closeMobileMenu}>Browse</MobileNavLink>
          <MobileNavLink to="/add-product" onClick={closeMobileMenu}>Sell Item</MobileNavLink>
          <MobileNavLink to="/my-listings" onClick={closeMobileMenu}>My Listings</MobileNavLink>
          <MobileNavLink to="/dashboard" onClick={closeMobileMenu}>Dashboard</MobileNavLink>
          <MobileNavLink to="/cart" onClick={closeMobileMenu}>🛒 Cart</MobileNavLink>
        </MobileNavLinks>

        <MobileUserSection>
          <UserInfo>
            <Avatar>{user?.username?.charAt(0).toUpperCase()}</Avatar>
            <UserName>{user?.username}</UserName>
          </UserInfo>
          <LogoutButton onClick={handleLogout}>Sign Out</LogoutButton>
        </MobileUserSection>
      </MobileMenu>
    </>
  );
};

export default Navbar;
