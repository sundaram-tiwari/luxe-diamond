export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (
  product,
  selectedColor = null,
  selectedSize = null,
) => {
  const cart = getCart();

  const finalColor = selectedColor || product.defaultColor;

  const existingItem = cart.find(
    (item) =>
      item.productId === product._id &&
      item.color === finalColor &&
      item.size === selectedSize,
  );

  const media = product?.imageUrl?.[finalColor] || [];

  const productImageWithoutModel =
    media.find(
      (url) =>
        !url.includes("_Model_") &&
        (url.endsWith(".webp") || url.endsWith(".jpg") || url.endsWith(".png")),
    ) ||
    media.find(
      (url) =>
        url.endsWith(".webp") || url.endsWith(".jpg") || url.endsWith(".png"),
    ) ||
    "";

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      image: productImageWithoutModel,
      color: finalColor,
      size: selectedSize,
      sku: product.productSku,
      metal: `${product.material} (${
        product.goldWeight14k || product.goldWeight18k || product.goldWeight22k
      } gm)`,
      diamond: `${product.diamond?.quantity} diamond, ${product.diamond?.carat} carat, ${product.diamond?.shape}`,
      priceAtAddTime: product.productBuyPrice,
      quantity: 1,
    });
  }

  saveCart(cart);
  return cart;
};
