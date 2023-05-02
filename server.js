const express = require('express');
const path = require('path');
const jwt = require("jsonwebtoken");
const router = express.Router();
const cookieParser = require("cookie-parser");

const Client = require('./models/clientModel.js').Client;

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

// Routes
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');
const installationRoutes = require('./routes/installationRoutes');
const wordRoutes = require('./routes/wordRoutes');

app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);
app.use('/installation', installationRoutes);
app.use('/word', wordRoutes);





//Serve css files
app.use(express.static('views'));



// Serve index.ejs
app.get('/', (req, res) => {
    res.render('visitorHomepage');
});

//To access the visitor survey test environment:
app.get('/visitorSurvey', (req, res) => {
    res.render('visitorSurvey');
});



app.get('/survey', (req, res) => {
    if (req.cookies.access_token) {
        try {
            const client = new Client(jwt.verify(req.cookies.access_token, process.env.JWT_SECRET));

            return res.render("visitorHomepage", { 
                isClient: true, 
                client: client, 
                error: null
            });
        } catch(err) {
            console.log(err);
            return res.render("visitorHomepage", { 
                isClient: false, 
                client: null,
                error: "Invalid token. Please login again."
            });
        }
    }

    return res.render("survey", { 
        isClient: false, 
        client: null,
        error: null
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
