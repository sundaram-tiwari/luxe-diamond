const { asyncHandler } = require('../utils/asyncHandler');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const { importProducts } = require('../utils/importProductHandler');
const { generateImageUrl, generateVideoUrl } = require('../utils/productUrlHandler');


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
            products
        }
    });

});

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
        .populate("category", "name");

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
            products
        }
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

    const updatedCategory = category.map(cat => ({
        ...cat._doc,
        videoUrl: `${req.protocol}://${req.get("host")}/assets/video/${cat.name.toLowerCase()}.mp4`
    }));

    let sortedCategory = [];
    updatedCategory.forEach((cat) => {
        if (cat.name == 'Rings') {
            sortedCategory[1] = cat;
        } else if (cat.name == 'Earrings') {
            sortedCategory[0] = cat;
        } else if (cat.name == 'Bracelets') {
            sortedCategory[4] = cat;
        } else if (cat.name == 'Chains') {
            sortedCategory[3] = cat;
        } else if (cat.name == 'Pendants') {
            sortedCategory[5] = cat;
        } else if (cat.name == 'Bangles') {
            sortedCategory[2] = cat;
        }
    })

    res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        data: {
            category: sortedCategory
        }
    });
});

const newArrivals = asyncHandler(async (req, res) => {
    const chainCategory = await Category.findOne({ name: "Chains" });

    const products = await Product.find({
        category: { $ne: chainCategory._id },
        status: true,
        quantity: { $gt: 0 }
    })
        .populate("category", "name")
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();

    if (!products.length) {
        return res.status(404).json({
            success: false,
            message: "No products found",
        });
    }

    const updatedProducts = products.map(product => {
        const imageUrl = generateImageUrl(product);

        const defaultImages =
            imageUrl?.[product.defaultColor]?.length > 0;

        return {
            ...product,
            imageUrl,
            videoUrl: generateVideoUrl(product),
            hasImage: defaultImages
        };
    });

    const filteredProducts = updatedProducts
        .filter(product => product.hasImage)
        .slice(0, 4);

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
            products: filteredProducts
        }
    });
});

const getProducts = asyncHandler(async (req, res) => {
    const { categoryName } = req.params;

    let products;
    let filter = {};

    if (categoryName) {

        const categoryDoc = await Category.findOne({ name: categoryName });

        if (!categoryDoc) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        filter.category = categoryDoc._id;
    }

    if (categoryName == "all") {
        products = await Product.find()
            .lean();
    } else {
        products = await Product.find(filter)
            .populate("category", "name")
            .lean();
    }

    if (!products.length) {
        return res.status(404).json({
            success: false,
            message: "No products found",
        });
    }

    const updatedProducts = products.map(product => {
        const imageUrl = generateImageUrl(product);

        const hasImage = imageUrl?.[product.defaultColor]?.length > 0;

        return {
            ...product,
            imageUrl,
            videoUrl: generateVideoUrl(product),
            hasImage
        };
    });

    const filteredProducts = updatedProducts
        .filter(product => product.hasImage)

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
            products: filteredProducts
        }
    });
});

const getProductDetails = asyncHandler(async (req, res) => {
    const { category, productSlug } = req.params;

    const categoryDoc = await Category.findOne({ name: category });

    const product = await Product.findOne({ slug: productSlug, category: categoryDoc._id })
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
                videoUrl
            }
        }
    });

});

module.exports = { uploadProducts, getAllProducts, getCategory, newArrivals, getProducts, getProductDetails };