const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/auth',require('./routes/authRoutes'));

app.get('/',(req,res) => {
    res.send("Hi there! Testing");
});

app.get('/testing',(req,res) => {
    res.json([{
        username : "Sam",
        age: 20,
        gender: "male"
    },{
        username : "Max",
        age: 17,
        gender: "female"
    },{
        username : "Bruce",
        age: 24,
        gender: "male"
    },])
})

const PORT = process.env.PORT || 8000;

app.listen(PORT,() => {
    console.log("Server started at port ", PORT);
});