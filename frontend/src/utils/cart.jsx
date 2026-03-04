export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (
  product,
  selectedColor,
  selectedSize,
  selectedMetal,
  selectedDiamond
) => {

  const cart = getCart();

  const existingItem = cart.find(
    (item) =>
      item.productId === product._id &&
      item.color === selectedColor &&
      item.size === selectedSize &&
      item.metal === selectedMetal &&
      item.diamondQuality === selectedDiamond
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: product._id,
      productSku: product.productSku,
      name: product.name,
      slug: product.slug,
      image: product.imageUrl?.[selectedColor]?.[2] || "",
      color: selectedColor,
      size: selectedSize,
      metal: selectedMetal,
      diamondQuality: selectedDiamond,
      quantity: 1
    });
  }

  saveCart(cart);
};
