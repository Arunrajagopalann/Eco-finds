import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { productsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const FormCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  animation: ${slideUp} 0.4s ease-out;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: grid;
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.3s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
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
  transition: all 0.2s ease;
  background: white;
  font-family: inherit;
  
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

const ImageSection = styled.div`
  animation: ${slideUp} 0.6s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #e9ecef;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DeleteImageButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: #c0392b;
    transform: scale(1.1);
  }
`;

const ExistingImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const NewImagePreview = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #4CAF50;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
  background: #f8f9fa;
  cursor: pointer;
  
  &:hover, &.dragover {
    border-color: #4CAF50;
    background: rgba(76, 175, 80, 0.05);
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const UploadIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #4CAF50;
`;

const UploadText = styled.p`
  color: #6c757d;
  font-size: 1rem;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
  animation: ${slideUp} 0.6s ease-out;
  animation-delay: 0.6s;
  animation-fill-mode: both;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  ${props => props.$primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
    }
  ` : `
    background: #e9ecef;
    color: #495057;
    
    &:hover {
      background: #dee2e6;
      transform: translateY(-2px);
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    status: 'available'
  });

  const fetchProduct = useCallback(async () => {
    try {
      console.log('Fetching product with ID:', id);
      console.log('Token:', localStorage.getItem('token'));
      const response = await productsAPI.getProduct(id);
      console.log('Product response:', response);
      const product = response.data;
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        condition: product.condition || '',
        status: product.status || 'available'
      });
      setExistingImages(product.images || []);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      console.error('Error response:', error.response);
      console.error('Error details:', error.response?.data);
      alert(`Failed to load product details: ${error.response?.data?.message || error.message}`);
      navigate('/my-listings');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    
    // Create previews for new images
    const previews = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setNewImagePreviews(previews);
  };

  const handleDeleteExistingImage = (index) => {
    setImagesToDelete(prev => [...prev, index]);
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteNewImage = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setNewImagePreviews(prev => {
      // Revoke object URL to prevent memory leak
      if (prev[index]) {
        URL.revokeObjectURL(prev[index].url);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const submitData = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });

      // Add remaining existing images (not deleted) as a JSON string
      const remainingImages = existingImages.filter((img, index) => !imagesToDelete.includes(index));
      submitData.append('existingImages', JSON.stringify(remainingImages));

      // Add new images if selected
      selectedFiles.forEach(file => {
        submitData.append('images', file);
      });

      console.log('Submitting form data:');
      console.log('Form data:', formData);
      console.log('Remaining images:', remainingImages);
      console.log('New files:', selectedFiles);
      console.log('Product ID:', id);

      const response = await productsAPI.updateProduct(id, submitData);
      console.log('Update response:', response);
      alert('Product updated successfully!');
      navigate('/my-listings');
    } catch (error) {
      console.error('Failed to update product:', error);
      console.error('Error response:', error.response?.data);
      alert(`Failed to update product: ${error.response?.data?.message || error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <FormCard>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <LoadingSpinner style={{ margin: '0 auto 1rem' }} />
            <p>Loading product details...</p>
          </div>
        </FormCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FormCard>
        <Title>Edit Product</Title>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup delay="0.1s">
            <Label>Product Title</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup delay="0.2s">
            <Label>Description</Label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup delay="0.3s">
            <Label>Price ($)</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </FormGroup>

          <FormGroup delay="0.4s">
            <Label>Category</Label>
            <Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports">Sports</option>
              <option value="Toys">Toys</option>
              <option value="Furniture">Furniture</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Others">Others</option>
            </Select>
          </FormGroup>

          <FormGroup delay="0.5s">
            <Label>Condition</Label>
            <Select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </Select>
          </FormGroup>

          <ImageSection>
            <Label>Manage Images</Label>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <>
                <Label>Current Images</Label>
                <ExistingImagesGrid>
                  {existingImages.map((image, index) => (
                    <ImagePreview key={index}>
                      <img 
                        src={`http://localhost:5000${image}`} 
                        alt={`Product ${index + 1}`}
                      />
                      <DeleteImageButton onClick={() => handleDeleteExistingImage(index)}>
                        ×
                      </DeleteImageButton>
                    </ImagePreview>
                  ))}
                </ExistingImagesGrid>
              </>
            )}

            {/* New Images Upload */}
            <Label>Add New Images (Optional)</Label>
            <ImageUploadArea
              onClick={() => document.getElementById('imageInput').click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <UploadIcon>📸</UploadIcon>
              <UploadText>
                {selectedFiles.length > 0 
                  ? `${selectedFiles.length} new file(s) selected`
                  : 'Click or drag images here to add new images'
                }
              </UploadText>
              <ImageUploadInput
                id="imageInput"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
              />
            </ImageUploadArea>

            {/* New Image Previews */}
            {newImagePreviews.length > 0 && (
              <>
                <Label>New Images to Add</Label>
                <ExistingImagesGrid>
                  {newImagePreviews.map((preview, index) => (
                    <NewImagePreview key={index}>
                      <img src={preview.url} alt={`New ${index + 1}`} />
                      <DeleteImageButton onClick={() => handleDeleteNewImage(index)}>
                        ×
                      </DeleteImageButton>
                    </NewImagePreview>
                  ))}
                </ExistingImagesGrid>
              </>
            )}
          </ImageSection>

          <ButtonGroup>
            <Button 
              type="button" 
              onClick={() => navigate('/my-listings')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              $primary 
              disabled={saving}
            >
              {saving && <LoadingSpinner />}
              {saving ? 'Updating...' : 'Update Product'}
            </Button>
          </ButtonGroup>
        </Form>
      </FormCard>
    </PageContainer>
  );
};

export default EditProductPage;
