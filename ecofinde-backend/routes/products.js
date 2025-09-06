const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

// Get all products with filtering and search
router.get("/", async (req, res) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      condition,
      page = 1,
      limit = 10,
    } = req.query;

    let query = { status: "available" };

    // Category filter
    if (category && category !== "All Categories") {
      query.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Condition filter
    if (condition) {
      query.condition = condition;
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const products = await Product.find(query)
      .populate("seller", "username email")
      .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(req.params.id).populate(
      "seller",
      "username email phone"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Increment view count
    product.views += 1;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create new product (protected)
router.post("/", auth, upload.array("images", 5), async (req, res) => {
  try {
    console.log("Creating product with data:", req.body);
    console.log("Uploaded files:", req.files);
    console.log("User:", req.user);

    const productData = {
      ...req.body,
      seller: req.user.userId,
    };

    // Add image paths if files were uploaded
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map(
        (file) => `/uploads/products/${file.filename}`
      );
    }

    console.log("Final product data:", productData);

    const product = new Product(productData);
    await product.save();

    const populatedProduct = await Product.findById(product._id).populate(
      "seller",
      "username email"
    );

    console.log("Product created successfully:", populatedProduct);
    res.status(201).json(populatedProduct);
  } catch (error) {
    console.error("Detailed error creating product:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    if (error.errors) {
      console.error("Validation errors:", error.errors);
    }
    res.status(400).json({
      message: "Error creating product",
      error: error.message,
      details: error.errors
        ? Object.keys(error.errors).map((key) => ({
            field: key,
            message: error.errors[key].message,
          }))
        : undefined,
    });
  }
});

// Update product (protected)
router.put("/:id", auth, upload.array("images", 5), async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user owns the product
    if (product.seller.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this product" });
    }

    const updateData = { ...req.body };

    console.log("Update request received:");
    console.log("Product ID:", req.params.id);
    console.log("Request body:", req.body);
    console.log("Files:", req.files);

    // Handle image updates
    let finalImages = [];

    // If existingImages is provided, use those as the base
    if (req.body.existingImages) {
      try {
        finalImages = JSON.parse(req.body.existingImages);
        console.log("Parsed existing images:", finalImages);
      } catch (e) {
        console.log("Error parsing existing images:", e);
        finalImages = [];
      }
    } else {
      // If no existingImages specified, keep all current images
      finalImages = product.images || [];
      console.log("Using all current images:", finalImages);
    }

    // Add new images if uploaded
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(
        (file) => `/uploads/products/${file.filename}`
      );
      finalImages = [...finalImages, ...newImages];
      console.log("Added new images:", newImages);
    }

    updateData.images = finalImages;
    console.log("Final update data:", updateData);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate("seller", "username email");

    res.json(updatedProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating product", error: error.message });
  }
});

// Delete product (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user owns the product
    if (product.seller.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this product" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user's products (protected)
router.get("/user/my-listings", auth, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.userId }).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
