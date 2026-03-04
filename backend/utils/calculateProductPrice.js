const calculateProductPrice = ({
  goldWeight14k,
  diamondCarat,
  makingCharges,
  settings
}) => {

  const goldRate = settings.gold_rate_14k || 0;
  const diamondRate = settings.price_IJ_SI || 0;

  const goldTotal = goldWeight14k * goldRate;

  const diamondTotal = diamondCarat * diamondRate;

  const subtotal = goldTotal + diamondTotal + makingCharges;

  const gst = subtotal * 0.03;

  const total = subtotal + gst;

  return Math.round(total);
};

module.exports = { calculateProductPrice };