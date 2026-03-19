const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const productSku = req.body.productSku;
    if (!productSku) return cb(new Error("Product SKU is required"), null);

    const uploadPath = path.join(
      __dirname,
      "../public/assets/product",
      productSku.toUpperCase()
    );
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const productSku = req.body.productSku?.toUpperCase() || "PRODUCT";
    const ext = path.extname(file.originalname);
    
    // Get color code from request body (default to Yellow if not provided)
    const colorMap = { "yellow": "Y", "rose": "R", "white": "W" };
    const defaultColor = (req.body.defaultColor || "Yellow").toLowerCase();
    const colorCode = colorMap[defaultColor] || "Y";
    
    // For images, append index; for videos, use color code
    if (file.fieldname === "images") {
      // Get existing files in folder to determine index
      const uploadPath = path.join(
        __dirname,
        "../public/assets/product",
        productSku
      );
      
      if (fs.existsSync(uploadPath)) {
        const existing = fs.readdirSync(uploadPath)
          .filter(f => f.startsWith(`${productSku}_${colorCode}`))
          .length;
        cb(null, `${productSku}_${colorCode}_${existing + 1}${ext}`);
      } else {
        cb(null, `${productSku}_${colorCode}_1${ext}`);
      }
    } else if (file.fieldname === "video") {
      cb(null, `${productSku}_${colorCode}${ext}`);
    } else {
      // Fallback for other field names
      cb(null, `${productSku}_${file.fieldname}${ext}`);
    }
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") || // Note singular 'image/'
    file.mimetype === "video/mp4"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files and MP4 video are allowed"), false);
  }
};

const uploadImageAndVideo = multer({ storage, fileFilter }).any();

module.exports = uploadImageAndVideo;