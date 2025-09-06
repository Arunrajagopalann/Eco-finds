import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { usersAPI } from '../services/api';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  margin: 0 auto 2rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const Button = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  justify-self: start;
  
  &:hover {
    background: #45a049;
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

const UserDashboard = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await usersAPI.getProfile();
      setProfile({
        ...response.data,
        address: response.data.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        }
      });
    } catch (error) {
      console.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setProfile({
        ...profile,
        address: {
          ...profile.address,
          [addressField]: value
        }
      });
    } else {
      setProfile({
        ...profile,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await usersAPI.updateProfile(profile);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingMessage>Loading profile...</LoadingMessage>;
  }

  return (
    <PageContainer>
      <Title>User Dashboard</Title>
      
      <ProfileCard>
        <ProfileImage>👤</ProfileImage>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <InputGroup>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                value={profile.username}
                readOnly
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={profile.email}
                readOnly
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <Label>First Name</Label>
              <Input
                type="text"
                name="firstName"
                value={profile.firstName || ''}
                onChange={handleChange}
                placeholder="Enter first name"
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Last Name</Label>
              <Input
                type="text"
                name="lastName"
                value={profile.lastName || ''}
                onChange={handleChange}
                placeholder="Enter last name"
              />
            </InputGroup>
          </FormGroup>

          <InputGroup>
            <Label>Phone</Label>
            <Input
              type="tel"
              name="phone"
              value={profile.phone || ''}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </InputGroup>

          <InputGroup>
            <Label>Street Address</Label>
            <Input
              type="text"
              name="address.street"
              value={profile.address.street}
              onChange={handleChange}
              placeholder="Enter street address"
            />
          </InputGroup>

          <FormGroup>
            <InputGroup>
              <Label>City</Label>
              <Input
                type="text"
                name="address.city"
                value={profile.address.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
            </InputGroup>
            
            <InputGroup>
              <Label>State</Label>
              <Input
                type="text"
                name="address.state"
                value={profile.address.state}
                onChange={handleChange}
                placeholder="Enter state"
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <Label>ZIP Code</Label>
              <Input
                type="text"
                name="address.zipCode"
                value={profile.address.zipCode}
                onChange={handleChange}
                placeholder="Enter ZIP code"
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Country</Label>
              <Input
                type="text"
                name="address.country"
                value={profile.address.country}
                onChange={handleChange}
                placeholder="Enter country"
              />
            </InputGroup>
          </FormGroup>

          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Update Profile'}
          </Button>
        </Form>
      </ProfileCard>
    </PageContainer>
  );
};

export default UserDashboard;
