import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
  position: relative;
  
  ${theme.mediaQueries.mobileAndTablet} {
    padding: ${theme.spacing.md};
    align-items: flex-start;
    padding-top: ${theme.spacing.xxl};
  }
`;

const LoginCard = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  width: 100%;
  max-width: 420px;
  position: relative;
  border: 1px solid ${theme.colors.border};
  backdrop-filter: blur(10px);
  
  ${theme.mediaQueries.mobileAndTablet} {
    padding: ${theme.spacing.xl};
    max-width: 100%;
    margin: 0 ${theme.spacing.sm};
  }
`;

const Brand = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;


const BrandName = styled.h1`
  color: #111827;
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.025em;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0.5rem 0 0 0;
  font-weight: 400;
`;

const Title = styled.h2`
  text-align: center;
  color: #111827;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 500;
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  background: #ffffff;
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 
      0 0 0 3px rgba(59, 130, 246, 0.1),
      0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transform: translateY(-1px);
  }
  
  &:hover:not(:focus) {
    border-color: #9ca3af;
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent);
    transition: left 0.5s ease;
  }
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #334155 0%, #1e293b 100%);
    transform: translateY(-2px);
    box-shadow: 
      0 4px 8px rgba(0, 0, 0, 0.15),
      0 8px 24px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      0 1px 3px rgba(0, 0, 0, 0.1),
      0 2px 8px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &::before {
      display: none;
    }
  }
`;

const ToggleText = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ToggleLink = styled.span`
  color: #3b82f6;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #dc2626;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid #fecaca;
  font-size: 0.875rem;
  text-align: center;
  box-shadow: 
    0 1px 3px rgba(220, 38, 38, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    background: linear-gradient(135deg, 
      rgba(220, 38, 38, 0.05) 0%, 
      rgba(239, 68, 68, 0.05) 100%);
    pointer-events: none;
  }
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  color: #16a34a;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid #bbf7d0;
  font-size: 0.875rem;
  text-align: center;
  box-shadow: 
    0 1px 3px rgba(22, 163, 74, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    background: linear-gradient(135deg, 
      rgba(22, 163, 74, 0.05) 0%, 
      rgba(34, 197, 94, 0.05) 100%);
    pointer-events: none;
  }
`;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const result = await login({
          email: formData.email,
          password: formData.password
        });
        
        if (result.success) {
          setSuccess('Login successful! Redirecting...');
          setTimeout(() => navigate('/'), 1000);
        } else {
          setError(result.error || 'Login failed. Please check your credentials.');
        }
      } else {
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long');
          return;
        }
        
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        
        const result = await register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        
        if (result.success) {
          setSuccess('Registration successful! Redirecting...');
          setTimeout(() => navigate('/'), 1000);
        } else {
          setError(result.error || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Brand>
          <BrandName>EcoFinds</BrandName>
          <Subtitle>Sustainable Second-Hand Marketplace</Subtitle>
        </Brand>
        
        <Title>{isLogin ? 'Welcome Back' : 'Join Our Community'}</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <InputGroup>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a unique username"
              />
            </InputGroup>
          )}
          
          <InputGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder={isLogin ? "Enter your password" : "Create a secure password (6+ characters)"}
            />
          </InputGroup>
          
          {!isLogin && (
            <InputGroup>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
            </InputGroup>
          )}
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>
        </Form>
        
        <ToggleText>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <ToggleLink onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up here' : 'Sign in here'}
          </ToggleLink>
        </ToggleText>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
