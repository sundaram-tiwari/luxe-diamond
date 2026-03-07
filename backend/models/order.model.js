const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{
        name: {
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
        size: {
            type: Number,
            required: true,
        },
        metal: {
            quality: {
                type: String,
                required: true
            },
            weight: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        },
        diamond: {
            carat: {
                type: Number
            },
            type: {
                type: String
            },
            price: {
                type: Number
            },
        },
        stonePrice: {
            type: Number
        },
        quantity: {
            type: Number
        },
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    address: {
        receiverName: String,
        phone: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        pincode: String,
        country: {
            type: String,
            default: "India"
        }
    }
})