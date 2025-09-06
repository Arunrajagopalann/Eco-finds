import React, { useState } from 'react';
import styled from 'styled-components';
import { productsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem;
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.875rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.875rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.875rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const ImageUploadArea = styled.div`
  border: 3px dashed #e9ecef;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  
  &:hover, &.dragover {
    border-color: #4CAF50;
    background: rgba(76, 175, 80, 0.05);
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #4CAF50;
`;

const UploadText = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
  margin: 0;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  margin-top: 1rem;
  
  &:hover:not(:disabled) {
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

const CancelButton = styled(Button)`
  background: transparent;
  color: #e74c3c;
  border: 2px solid #e74c3c;
  box-shadow: none;
  margin-right: 1rem;
  
  &:hover:not(:disabled) {
    background: #e74c3c;
    color: white;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(231, 76, 60, 0.2);
  font-size: 0.9rem;
  text-align: center;
`;

const SuccessMessage = styled.div`
  background: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(76, 175, 80, 0.2);
  font-size: 0.9rem;
  text-align: center;
`;

const AddProductPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      setImage(file);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validation
      if (!formData.title.trim()) {
        throw new Error('Product title is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Product description is required');
      }
      if (!formData.price || formData.price <= 0) {
        throw new Error('Please enter a valid price');
      }
      if (!formData.category) {
        throw new Error('Please select a category');
      }
      if (!formData.condition) {
        throw new Error('Please select a condition');
      }

      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('condition', formData.condition);
      
      if (image) {
        formDataToSend.append('images', image);
      }

      const response = await productsAPI.createProduct(formDataToSend);
      console.log('Product created:', response);
      
      setSuccess('Product created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/my-listings');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating product:', error);
      setError(error.message || 'Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Container>
      <FormContainer>
        <Title>Add New Product</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Product Title *</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a descriptive title for your item"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Category *</Label>
            <Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup>
            <Label>Condition *</Label>
            <Select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              required
            >
              <option value="">Select condition</option>
              {conditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup>
            <Label>Price ($) *</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Description *</Label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your product..."
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Product Image</Label>
            <ImageUploadArea onClick={() => document.getElementById('imageInput').click()}>
              <ImageUploadInput
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              
              {imagePreview ? (
                <ImagePreview>
                  <PreviewImage src={imagePreview} alt="Preview" />
                </ImagePreview>
              ) : (
                <>
                  <UploadIcon>📷</UploadIcon>
                  <UploadText>
                    Click here to upload an image<br />
                    <small>Maximum size: 5MB | Supported: JPG, PNG, GIF</small>
                  </UploadText>
                </>
              )}
            </ImageUploadArea>
          </InputGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={handleCancel}>
              Cancel
            </CancelButton>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating Listing...' : 'Create Listing'}
            </Button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default AddProductPage;
