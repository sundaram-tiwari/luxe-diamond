
const fs = require("fs");
const path = require("path");

const generateImageUrl = (product) => {
    const sku = product.productSku.toUpperCase();

    const baseFolderPath = path.join(
        process.cwd(),
        "public",
        "assets",
        "product",
        sku
    );

    const baseUrl = `http://localhost:8000/assets/product/${sku}/`;

    const colorCodeMap = {
        yellow: "Y",
        rose: "R",
        white: "W"
    };

    const result = {};

    if (!fs.existsSync(baseFolderPath)) {
        return {};
    }

    const files = fs.readdirSync(baseFolderPath);

    const getImagesByCode = (code) => {
        return files
            .filter(file =>

                file.startsWith(`${sku}_${code}`) ||

                file.startsWith(`${sku}_Model_${code}`)
            )
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })) // sort properly
            .map(file => `${baseUrl}${file}`);
    };

    const defaultCode = colorCodeMap[product.defaultColor?.toLowerCase()];
    const defaultImages = defaultCode ? getImagesByCode(defaultCode) : [];

    product.color.forEach(color => {
        const code = colorCodeMap[color.toLowerCase()];
        const images = code ? getImagesByCode(code) : [];

        result[color] = images.length ? images : defaultImages;
    });

    return result;
};


const generateVideoUrl = (product) => {
    const baseFolderPath = path.join(
        __dirname,
        `../assets/product/${product.productSku}`
    );

    const baseUrl = `http://localhost:8000/assets/product/${product.productSku}/`;

    const colorCodeMap = {
        yellow: "Y",
        rose: "R",
        white: "W"
    };

    const result = {};

    if (!fs.existsSync(baseFolderPath)) {
        return {};
    }

    const files = fs.readdirSync(baseFolderPath);

    const getVideoByCode = (code) => {
        const file = files.find((f) =>
            f.startsWith(`${product.productSku}_${code}`) &&
            (f.endsWith(".mp4") || f.endsWith(".webm") || f.endsWith(".mov"))
        );

        return file ? `${baseUrl}${file}` : null;
    };

    const defaultCode = colorCodeMap[product.defaultVideo?.toLowerCase()];
    const defaultVideo = defaultCode ? getVideoByCode(defaultCode) : null;

    product.color.forEach((color) => {
        const code = colorCodeMap[color.toLowerCase()];

        if (!code) {
            result[color] = defaultVideo;
            return;
        }

        const colorVideo = getVideoByCode(code);

        result[color] = colorVideo ? colorVideo : defaultVideo;
    });

    return result;
};

module.exports = { generateImageUrl, generateVideoUrl }
