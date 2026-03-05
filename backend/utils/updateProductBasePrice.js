const Product = require('../models/product.model.js');
const Setting = require('../models/settings.model.js');
const { calculateProductPrice } = require("./calculateProductPrice.js");

const updateProductBasePrices = async () => {

  const settings = await Setting.find().lean();

  const formattedSettings = {};

  settings.forEach((s) => {
    formattedSettings[s.name] = s.value;
  });

  const products = await Product.find().lean();

  const bulkOperations = products.map((product) => {

    const price = calculateProductPrice({
      product,
      selectedMetal: "14",     
      selectedDiamond: "IJ_SI", 
      settings: formattedSettings
    });

    return {
      updateOne: {
        filter: { _id: product._id },
        update: { productBasePrice: price }
      }
    };

  });

  if (bulkOperations.length) {
    await Product.bulkWrite(bulkOperations);
  }

  console.log("All product base prices updated");

};

module.exports = { updateProductBasePrices };