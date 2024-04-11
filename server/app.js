// importing the required libraries 
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const authRoutes = require('./routes/appRoutes');
const InformacjeUczniowie = require('./models/User');


// starting app with express
const app = express();

// describing which folder is public and data convertion type
app.use(express.static('public'));
app.use(express.json());


// starting engine with public
app.set('views', path.join(__dirname, 'views', 'templates'));
app.set('view engine', 'ejs');


// Define the connection URIs for the two databases
const dbURI_Uczniowie = 'mongodb+srv://JakubSztobryn:Malgosia1006!@cluster0.jmqs0ry.mongodb.net/Uczniowie';
mongoose.connect(dbURI_Uczniowie)
    .then((result) => {
        app.listen(5000)
        console.log('Connected to informcajeuczniowies database')
    })
    .catch((err) => console.log(err))




// Starting app 
app.get('/api/:email', (req, res) => {
    InformacjeUczniowie.findOne({ email: req.params.email })
        .then((result) => res.json(result))
})

app.use(cookieParser());
app.use(authRoutes); 

