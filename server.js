const express = require('express');
const path = require('path');
const jwt = require("jsonwebtoken");
const router = express.Router();
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const Jimp = require("jimp");
const fs = require('fs')
const QrCode = require('qrcode-reader');

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
        abortOnLimit: false,
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


app.get('/testPainting', (req, res) => {
    if (req.cookies.access_token) {
        try {
            const installation = new Installation(jwt.verify(req.cookies.access_token, process.env.JWT_SECRET));

            return res.render("testPainting", { 
                isInstallation: true, 
                installation: installation, 
                error: null
            });
        } catch(err) {
            console.log(err);
            return res.render("testPainting", { 
                isInstallation: false, 
                installation: null,
                error: "Invalid token. Please login again."
            });
        }
    }

    return res.render("testPainting", { 
        isInstallation: false, 
        installation: null,
        error: null
    });
});





// Serve index.ejs
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/words', (req, res) => {
    res.render('wordCloud');
});

app.post('/scan', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    const { image } = req.files;
    console.log(image);
    const buff = Buffer.from(image.data, 'base64');
    
    if (!image && !/^image/.test(image.mimetype) ) { return res.send("Not an image."); }
    
    // Parse the image using Jimp.read() method
    await Jimp.read(buff, function (err, image) {
        console.log(image);
        if (err) {
            console.error(err);
        }
        // Creating an instance of qrcode-reader module
        let qrcode = new QrCode();
        qrcode.callback = function (err, value) {
            if (err) {
                console.error(err);
            }
            console.log(value);
            if(value == undefined) { res.redirect('/survey') } else { res.json(value) }
        };
        // Decoding the QR code
        qrcode.decode(image.bitmap);
    });
    res.send("Failed.");
})

app.get('/survey', (req, res) => {
    if (req.cookies.access_token) {
        try {
            const client = new Client(jwt.verify(req.cookies.access_token, process.env.JWT_SECRET));

            return res.render("survey", { 
                isClient: true, 
                client: client, 
                error: null
            });
        } catch(err) {
            console.log(err);
            return res.render("survey", { 
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