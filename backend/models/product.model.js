import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  productSku: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    uppercase: true
  },

  description: {  
    type: String,
    required: true,
    trim: true
  },

  slug: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },

  images: {
    type: [String],
    default: []
  },

  videoUrl: {
    type: String
  },

  metalColor: {
    type: String,
    enum: ["Yellow", "Rose", "White"],
    default: "Yellow"
  },

  metalPurity: {
    type: String,
    required: true
  },

  metalWeight: {
    type: Number,
    required: true,
    min: 0
  },

  diamondQuality: {
    type: String,
    enum: ["IJ-SI","GH-SI","GH-VS","EF-VVS"]
  },

  makingCharge: {
    type: Number,
    required: true,
    min: 0
  },

  discountPercent: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },

  basePrice: {
    type: Number,
    required: true,
    min: 0
  },

  finalPrice: {
    type: Number,
    min: 0
  },

  stock: {
    type: Number,
    default: 1,
    min: 0
  },

  ratingsAverage: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },

  ratingsCount: {
    type: Number,
    default: 0,
    min: 0
  },

  isRecommended: {
    type: Boolean,
    default: false
  },

  isBestSelling: {  
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

productSchema.pre("save", function(next) {
  this.finalPrice =
    this.basePrice - (this.basePrice * this.discountPercent) / 100;
  next();
});

productSchema.index({
  name: "text",
  description: "text"
});


productSchema.index({ slug: 1 });
productSchema.index({ productSku: 1 });
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });

export default mongoose.model("Product", productSchema);
