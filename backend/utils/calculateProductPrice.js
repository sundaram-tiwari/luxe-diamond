const calculateProductPrice = ({
  product,
  selectedMetal = "14",
  selectedDiamond = "IJ_SI",
  settings
}) => {

  const goldWeight =
    selectedMetal === "14"
      ? Number(product.goldWeight14k || 0)
      : selectedMetal === "18"
        ? Number(product.goldWeight18k || 0)
        : Number(product.goldWeight22k || 0);

  const goldRate = Number(settings?.[`gold_rate_${selectedMetal}k`] || 0);

  const goldTotal = goldWeight * goldRate;

  let diamondTotal = 0;

  if (
    product.diamond?.price_IJ_SI ||
    product.diamond?.price_GH_SI ||
    product.diamond?.price_GH_VS ||
    product.diamond?.price_EF_VVS
  ) {
    diamondTotal =
      product.diamond?.[`price_${selectedDiamond}`] ||
      product.diamond.price_IJ_SI ||
      product.diamond.price_GH_SI ||
      product.diamond.price_GH_VS ||
      product.diamond.price_EF_VVS;
  } else {
    const diamondRate = settings?.[`price_${selectedDiamond}`] || 0;

    diamondTotal = (product.diamond?.carat || 0) * diamondRate;
  }

  let stonePrice = 0;

  if (product.stone?.price) {
    stonePrice = product.stone.price;
  }

  const making = product.makingCharges || 0;

  const subtotal = goldTotal + diamondTotal + making + stonePrice;

  const gst = subtotal * 0.03;

  const total = subtotal + gst;

  return ({
    goldWeight: goldWeight,
    goldTotal: goldTotal,
    diamondTotal: diamondTotal,
    stonePrice: stonePrice,
    unitPrice: total
  });
};

module.exports = { calculateProductPrice };