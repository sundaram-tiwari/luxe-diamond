const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require('path');

const {connectDatabase} = require('./config/dbConnect');
const errorHandler = require('./middleware/error.middleware');

dotenv.config();
connectDatabase();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
  "/assets",
  express.static(path.join(__dirname, "public/assets"))
);

app.use('/api/v1/auth',require('./routes/auth.routes'));
app.use('/api/v1/admin',require('./routes/admin.routes'));
app.use('/api/v1/product',require('./routes/product.routes'));
app.use('/api/v1/order',require('./routes/order.routes'));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT,() => {
    console.log("Server started at port ", PORT);
});