export const ProductValidation = (Product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
}) => {
  const availableColors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#A52A2A",
    "#808080",
    "#000000",
  ];

  const errors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [] as string[],
  };

  // ✅ التحقق من العنوان
  if (
    !Product.title.trim() ||
    Product.title.length < 10 ||
    Product.title.length > 80
  ) {
    errors.title =
      "Title should be between 10 and 80 characters long and cannot be empty";
  }

  // ✅ التحقق من الوصف
  if (
    !Product.description.trim() ||
    Product.description.length < 20 ||
    Product.description.length > 200
  ) {
    errors.description =
      "Description should be between 20 and 200 characters long and cannot be empty";
  }

  try {
    new URL(Product.imageURL); // يتحقق فقط من صحة الرابط
  } catch {
    errors.imageURL = "Image URL is not valid or empty";
  }

  // ✅ التحقق من السعر
  if (
    !Product.price.trim() ||
    isNaN(Number(Product.price)) ||
    Number(Product.price) <= 0
  ) {
    errors.price = "Price should be a positive number and cannot be empty";
  }

  // ✅ التحقق من الألوان المختارة
  if (!Array.isArray(Product.colors) || Product.colors.length < 1) {
    errors.colors = ["At least one valid color must be selected"];
  } else {
    const invalidColors = Product.colors.filter(
      (color) => !availableColors.includes(color)
    );
    if (invalidColors.length > 0) {
      errors.colors = [
        "Invalid color selected. Please choose from the available colors.",
      ];
    }
  }

  return errors;
};
