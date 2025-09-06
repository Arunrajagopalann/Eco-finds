import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { productsAPI } from '../services/api';

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

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const Select = styled.select`
  width: 100%;
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
  margin-right: 1rem;
  
  &:hover {
    background: #45a049;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background: #6c757d;
  
  &:hover {
    background: #5a6268;
  }
`;

const categories = [
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

const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Electronics',
    condition: 'Good'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await productsAPI.createProduct({
        ...formData,
        price: parseFloat(formData.price)
      });
      alert('Product listed successfully!');
      navigate('/my-listings');
    } catch (error) {
      alert('Failed to create product listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Title>Add New Product</Title>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Product Title *</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter product title"
          />
        </FormGroup>

        <FormGroup>
          <Label>Category *</Label>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Condition *</Label>
          <Select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            {conditions.map(condition => (
              <option key={condition} value={condition}>{condition}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Price ($) *</Label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </FormGroup>

        <FormGroup>
          <Label>Description *</Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe your product..."
          />
        </FormGroup>

        <FormGroup>
          <Label>Product Image</Label>
          <div style={{ 
            border: '2px dashed #ddd', 
            padding: '2rem', 
            textAlign: 'center',
            borderRadius: '5px',
            color: '#999'
          }}>
            📷 Image upload placeholder
            <br />
            <small>Image upload functionality to be implemented</small>
          </div>
        </FormGroup>

        <div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Listing'}
          </Button>
          
          <CancelButton type="button" onClick={() => navigate('/my-listings')}>
            Cancel
          </CancelButton>
        </div>
      </Form>
    </PageContainer>
  );
};

export default AddProductPage;
