const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Electronics',
      'Clothing',
      'Books',
      'Furniture',
      'Sports',
      'Toys',
      'Home & Garden',
      'Vehicles',
      'Others'
    ]
  },
  condition: {
    type: String,
    required: true,
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor'],
    default: 'Good'
  },
  images: [{
    type: String // URLs to image files
  }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available'
  },
  tags: [String],
  location: {
    city: String,
    state: String,
    country: String
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Add text index for search functionality
productSchema.index({ 
  title: 'text', 
  description: 'text', 
  tags: 'text' 
});

module.exports = mongoose.model('Product', productSchema);
