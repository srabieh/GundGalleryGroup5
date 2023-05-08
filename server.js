require('dotenv').config();
const express = require('express');
const path = require('path');
const jwt = require("jsonwebtoken");
const router = express.Router();
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const Jimp = require("jimp");
const fs = require('fs')

const Client = require('./models/clientModel.js').Client;
const Installation =  require('./models/installationModel.js').Installation;

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')))

// File-upload
app.use(
    fileUpload({
        limits: {
            fileSize: 1000000000,
        },
    })
);

// Routes
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');
const installationRoutes = require('./routes/installationRoutes');
const wordRoutes = require('./routes/wordRoutes');

// Routes
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);
app.use('/installation', installationRoutes);
app.use('/word', wordRoutes);

// Serve index.ejs
app.get('/', async (req, res) => {
    res.render('index');
});

// Seve wordcloud
app.get('/wordCloud', async (req, res) => {
    res.render('words');
});


app.get('/survey', async (req, res) => {
    if (req.cookies.access_token) {
        try {
            const token_data = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
            const client = await Client.getByEmail(token_data.email);

            return res.render("survey", { 
                isClient: client instanceof Client, 
                client: client
            });
        } catch(err) {
            console.log(err);
        }
    }

    return res.render("survey", { 
        isClient: false, 
        client: null
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}` + process.env.JWT_SECRET);
});