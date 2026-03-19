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
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
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