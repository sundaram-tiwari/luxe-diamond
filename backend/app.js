const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const {connectDatabase} = require('./config/dbConnect');
const errorHandler = require('./middleware/error.middleware');

dotenv.config();
connectDatabase();

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/auth',require('./routes/auth.routes'));

app.get('/',(req,res) => {
    res.send("Hi there! Testing");
});

// app.get('/testing',(req,res) => {
//     res.json([{
//         username : "Sam",
//         age: 20,
//         gender: "male"
//     },{
//         username : "Max",
//         age: 17,
//         gender: "female"
//     },{
//         username : "Bruce",
//         age: 24,
//         gender: "male"
//     },])
// })

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