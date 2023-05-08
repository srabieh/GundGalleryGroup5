require('dotenv').config();
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();
const cookieParser = require('cookie-parser');
const fs = require('fs')

const Admin = require('./models/adminModel.js').Admin;
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

// Routes
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');
const installationRoutes = require('./routes/installationRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Routes
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);
app.use('/installation', installationRoutes);
app.use('/comment', commentRoutes);

// Serving survey
app.get('/', async (req, res) => {
    if (req.cookies.access_token) 
    {
        try {
            const token_data = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
            const client = await Client.getByEmail(token_data.email);
            return res.render('survey', { 
                isClient: client instanceof Client, 
                client: client
            });
        } catch(err) {
            console.log(err);
            res.render('error', {
                error: err
            });
        }
    }
    return res.render('survey', { 
        isClient: false, 
        client: null
    });
});

// Serve wordcloud.ejs
app.get('/wordCloud', async (req, res) => {
    res.render('words');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} using JWT Secret: ` + process.env.JWT_SECRET);
});