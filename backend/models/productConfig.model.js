import mongoose from "mongoose";

const goldRateSchema = new mongoose.Schema({
  purity: {
    type: String,
    enum: ["18K", "22K", "24K"],
    required: true
  },
  ratePerGram: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

const diamondRateSchema = new mongoose.Schema({
  quality: {
    type: String,
    enum: ["IJ-SI", "GH-SI", "GH-VS", "EF-VVS"],
    required: true
  },
  ratePerCarat: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

const pricingConfigSchema = new mongoose.Schema({

  goldRates: {
    type: [goldRateSchema],
    default: []
  },

  diamondRates: {
    type: [diamondRateSchema],
    default: []
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

export default mongoose.model("PricingConfig", pricingConfigSchema);
