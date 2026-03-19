const { asyncHandler } = require("../utils/asyncHandler");
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const Setting = require("../models/settings.model");
const { importProducts } = require("../utils/importProductHandler");
const {
  generateImageUrl,
  generateVideoUrl,
} = require("../utils/productUrlHandler");
const {
  calculatePriceSchema,
  deleteProductSchema,
  addProductSchema,
} = require("../zod/product.validation.schema");
const { calculateProductPrice } = require("../utils/calculateProductPrice");

const uploadProducts = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const products = importProducts(req.file.path);

  if (!products) {
    return res.status(400).json({
      success: false,
      message: "Product insertion failed",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product inserted successfully",
    data: {
      products,
    },
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate("category", "name");

  if (!products) {
    return res.status(404).json({
      success: false,
      message: "No products found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: {
      products,
    },
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const validatedData = deleteProductSchema.parse(req.params);
  const { productSku } = validatedData;

  await Product.deleteOne({ productSku: productSku });

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.find({});

  if (!category || category.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No categories found",
    });
  }

  const updatedCategory = category.map((cat) => ({
    ...cat._doc,
    videoUrl: `${req.protocol}://${req.get("host")}/assets/video/${cat.name.toLowerCase()}.mp4`,
  }));

  let sortedCategory = [];
  updatedCategory.forEach((cat) => {
    if (cat.name == "Rings") {
      sortedCategory[1] = cat;
    } else if (cat.name == "Earrings") {
      sortedCategory[0] = cat;
    } else if (cat.name == "Bracelets") {
      sortedCategory[4] = cat;
    } else if (cat.name == "Chains") {
      sortedCategory[3] = cat;
    } else if (cat.name == "Pendants") {
      sortedCategory[5] = cat;
    } else if (cat.name == "Bangles") {
      sortedCategory[2] = cat;
    }
  });

  res.status(200).json({
    success: true,
    message: "Category fetched successfully",
    data: {
      category: sortedCategory,
    },
  });
});

const newArrivals = asyncHandler(async (req, res) => {
  const chainCategory = await Category.findOne({ name: "Chains" });

  const products = await Product.find({
    category: { $ne: chainCategory._id },
    status: true,
    quantity: { $gt: 0 },
  })
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  if (!products.length) {
    return res.status(404).json({
      success: false,
      message: "No products found",
    });
  }

  const updatedProducts = products.map((product) => {
    const imageUrl = generateImageUrl(product);

    const defaultImages = imageUrl?.[product.defaultColor]?.length > 0;

    return {
      ...product,
      imageUrl,
      videoUrl: generateVideoUrl(product),
      hasImage: defaultImages,
    };
  });

  const filteredProducts = updatedProducts
    .filter((product) => product.hasImage);

  if (!filteredProducts.length) {
    return res.status(404).json({
      success: false,
      message: "No products with images found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: {
      products: filteredProducts,
    },
  });
});

const bestSellers = asyncHandler(async (req, res) => {
  const products = await Product.find({
    isMostSelling: true,
    status: true,
    quantity: { $gt: 0 },
  })
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .lean();

  if (!products.length) {
    return res.status(404).json({
      success: false,
      message: "No bestsellers found",
    });
  }

  const updatedProducts = products.map((product) => {
    const imageUrl = generateImageUrl(product);

    const defaultImages = imageUrl?.[product.defaultColor]?.length > 0;

    return {
      ...product,
      imageUrl,
      videoUrl: generateVideoUrl(product),
      hasImage: defaultImages,
    };
  });

  const filteredProducts = updatedProducts.filter(
    (product) => product.hasImage,
  );

  if (!filteredProducts.length) {
    return res.status(404).json({
      success: false,
      message: "No bestsellers with images found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Bestsellers fetched successfully",
    data: {
      products: filteredProducts,
    },
  });
});

const getProducts = asyncHandler(async (req, res) => {
  const { categoryName } = req.params;

  let products;
  let filter = {};

  if (categoryName && categoryName !== "all") {
    const categoryDoc = await Category.findOne({ name: categoryName });

    if (!categoryDoc) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    filter.category = categoryDoc._id;
  }

  products = await Product.find(filter).populate("category", "name").lean();

  if (!products.length) {
    return res.status(404).json({
      success: false,
      message: "No products found",
    });
  }

  const updatedProducts = products.map((product) => {
    const imageUrl = generateImageUrl(product);

    const hasImage = imageUrl?.[product.defaultColor]?.length > 0;

    return {
      ...product,
      imageUrl,
      videoUrl: generateVideoUrl(product),
      hasImage,
    };
  });

  const filteredProducts = updatedProducts.filter(
    (product) => product.hasImage,
  );

  if (!filteredProducts.length) {
    return res.status(404).json({
      success: false,
      message: "No products with images found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: {
      products: filteredProducts,
    },
  });
});

const getProductDetails = asyncHandler(async (req, res) => {
  const { category, productSlug } = req.params;

  const categoryDoc = await Category.findOne({ name: category });

  const product = await Product.findOne({
    slug: productSlug,
    category: categoryDoc._id,
  })
    .populate("category", "name")
    .lean();

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "No products found",
    });
  }

  const imageUrl = generateImageUrl(product);
  const videoUrl = generateVideoUrl(product);

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: {
      product: {
        ...product,
        imageUrl,
        videoUrl,
        sizes: categoryDoc.sizes,
        defaultSize: categoryDoc.defaultSize,
      },
    },
  });
});

const calculatePrice = asyncHandler(async (req, res) => {
  const validatedData = calculatePriceSchema.parse(req.body);
  const { items } = validatedData;

  const settings = await Setting.find();

  const formattedSetting = {};
  settings.forEach((item) => {
    formattedSetting[item.name] = item.value;
  });

  let cartTotal = 0;
  const cartItems = [];

  for (const item of items) {
    const product = await Product.findOne({
      productSku: item.productSku,
    });

    if (!product) continue;

    const pricingDetails = calculateProductPrice({
      product,
      selectedMetal: item.metal,
      selectedDiamond: item.diamondQuality,
      settings: formattedSetting,
    });

    const total = pricingDetails.unitPrice * item.quantity;
    cartTotal += total;

    cartItems.push({
      productSku: product.productSku,
      name: product.name,
      metal: {
        quality: item.metal,
        weight: pricingDetails.goldWeight,
        price: pricingDetails.goldTotal,
        // color: product.metalColor || "white"
      },
      diamond: {
        carat: product.diamondCarat || 0, // adjust based on your schema
        type: item.diamondQuality,
        price: pricingDetails.diamondTotal,
      },
      stonePrice: pricingDetails.stonePrice || 0,
      quantity: item.quantity,
      makingCharges: product.makingCharges,
      size: item.size,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Price calculated successfully",
    data: {
      items: cartItems,
      cartTotal,
    },
  });
});

const addSingleProduct = asyncHandler(async (req, res) => {
  // Build images array from uploaded files
  const images = [];
  
  if (req.files && Array.isArray(req.files)) {
    // Filter files by fieldname since .any() returns array
    const imageFiles = req.files.filter(file => file.fieldname === 'images');
    
    imageFiles.forEach((file) => {
      images.push(`/assets/product/${req.body.productSku}/${file.filename}`);
    });
  }

  // Add images to body for validation
  const bodyWithImages = {
    ...req.body,
    images: images.length > 0 ? images : [],
  };

  const validatedData = addProductSchema.parse(bodyWithImages);

  // Handle video file
  if (req.files && Array.isArray(req.files)) {
    const videoFile = req.files.find(file => file.fieldname === 'video');
    if (videoFile) {
      validatedData.videoUrl = `/assets/product/${validatedData.productSku}/${videoFile.filename}`;
    }
  }

  const product = await Product.create(validatedData);

  res.status(201).json({
    success: true,
    message: "Product added successfully",
    product,
  });
});

const searchProducts = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  const products = await Product.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { productSku: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
    status: true,
    quantity: { $gt: 0 },
  })
    .populate("category", "name")
    .lean();

  if (!products.length) {
    return res.status(404).json({
      success: false,
      message: "No products found matching your search",
    });
  }

  const updatedProducts = products.map((product) => {
    const imageUrl = generateImageUrl(product);
    const hasImage = imageUrl?.[product.defaultColor]?.length > 0;

    return {
      ...product,
      imageUrl,
      videoUrl: generateVideoUrl(product),
      hasImage,
    };
  });

  const filteredProducts = updatedProducts.filter(
    (product) => product.hasImage,
  );

  if (!filteredProducts.length) {
    return res.status(404).json({
      success: false,
      message: "No products with images found matching your search",
    });
  }

  res.status(200).json({
    success: true,
    message: "Products found successfully",
    data: {
      products: filteredProducts,
      count: filteredProducts.length,
    },
  });
});

module.exports = {
  uploadProducts,
  getAllProducts,
  deleteProduct,
  getCategory,
  newArrivals,
  bestSellers,
  getProducts,
  getProductDetails,
  calculatePrice,
  addSingleProduct,
  searchProducts,
};
