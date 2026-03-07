const Product = require("../models/product.model");
const Order = require("../models/order.model");
const Setting = require("../models/settings.model");
const User = require("../models/user.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { createUserOrderSchema } = require("../zod/order.validation");
const { calculateProductPrice } = require("../utils/calculateProductPrice");


const createUserOrder = asyncHandler(async (req, res) => {

    const validatedData = createUserOrderSchema.parse(req.body);
    const { items, address } = validatedData;

    const settings = await Setting.find();

    const formattedSetting = {};
    settings.forEach((s) => {
        formattedSetting[s.name] = s.value;
    });

    const orderItems = [];
    let orderTotal = 0;

    for (const item of items) {

        const product = await Product.findOne({
            productSku: item.productSku
        });

        if (!product) continue;

        const pricing = calculateProductPrice({
            product,
            selectedMetal: item.metal,
            selectedDiamond: item.diamondQuality,
            settings: formattedSetting
        });

        const itemTotal =
            (pricing.goldTotal + pricing.diamondTotal + pricing.stonePrice) *
            item.quantity;

        orderTotal += itemTotal;

        const orderItem = {
            productSku: product.productSku,
            name: product.name,
            size: item.size,

            metal: {
                quality: item.metal,
                weight:
                    item.metal === "14"
                        ? product.goldWeight14k
                        : item.metal === "18"
                            ? product.goldWeight18k
                            : product.goldWeight22k,
                price: pricing.goldTotal
            },

            stonePrice: pricing.stonePrice,

            quantity: item.quantity
        };

        if (pricing.diamondTotal > 0) {
            orderItem.diamond = {
                carat: product.diamond?.carat || 0,
                type: item.diamondQuality,
                price: pricing.diamondTotal
            };
        }

        orderItems.push(orderItem);
    }

    const order = await Order.create({
        userId: req.user._id,
        items: orderItems,
        address,
        orderTotal
    });

    // ✅ Save address in user profile
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $push: { addresses: address }
        }
    );

    res.status(201).json({
        success: true,
        message: "Order created",
        data: order
    });

});

module.exports = { createUserOrder }