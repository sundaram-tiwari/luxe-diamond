const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"SubCategory",
  },

  productSku: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    uppercase: true
  },

  name: {
    type: String,
    required: true,
    trim: true
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

  dimension: {
    height: {
      type: Number,
    },
    width: {
      type: Number
    }
  },

  material: {
    type: String,
    default: "Gold"
  },

  diamond: {
    carat: {
      type: Number
    },
    quantity: {
      type: Number
    },
    shape: {
      type: String
    }
  },

  stone: {
    carat: {
      type: Number
    },
    quantity: {
      type: Number
    },
    shape: {
      type: Number
    },
    price: {
      type: Number
    },
    color: {
      type: String
    },
    type: {
      type: String
    },
  },

  goldWeight22k: {
    type: Number
  },

  goldWeight18k: {
    type: Number
  },

  goldWeight14k: {
    type: Number
  },

  quantity: {
    type: Number,
    default: 1,
    min: 0
  },

  color: [],

  video: {
    type: String,
    enum: ["yellow", "white", "rose"]
  },

  defaultColor: {
    type: String,
  },

  defaultVideo: {
    type: String,
  },

  // images: {
  //   type: [String],
  //   default: [],
  //   required: true
  // },

  // videoUrl: {
  //   type: String
  // },

  isRecommended: {
    type: Boolean,
    default: true
  },

  isMostSelling: {
    type: Boolean,
    default: true
  },

  productBasePrice: {
    type: Number,
    required: true,
    min: 0
  },

  productBuyPrice: {
    type: Number,
    required: true,
    min: 0
  },

  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },

  status: {
    type: Boolean,
    default: true
  },

  totalReviews:{
    type: Number
  },

  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },

}, { timestamps: true });


module.exports = mongoose.model("Product", productSchema);
