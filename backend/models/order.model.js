const mongoose = require("mongoose");

const diamondSchema = new mongoose.Schema(
  {
    carat: Number,
    type: String,
    price: Number
  },
  { _id: false }
);

const metalSchema = new mongoose.Schema(
  {
    quality: String,
    weight: Number,
    price: Number
  },
  { _id: false }
);

const orderItemSchema = new mongoose.Schema(
  {
    productSku: String,
    name: String,
    size: Number,
    metal: metalSchema,
    diamond: diamondSchema,
    stonePrice: Number,
    quantity: Number
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],

  orderTotal: {
    type: Number,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  address: {
    receiverName: String,
    phone: String,
    addressLine1: String,
    city: String,
    state: String,
    pincode: String,
    country: {
      type: String,
      default: "India"
    }
  }
});

module.exports =
  mongoose.models.Order || mongoose.model("Order", orderSchema);