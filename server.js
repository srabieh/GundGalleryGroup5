const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');
const installationRoutes = require('./routes/installationRoutes');
const wordRoutes = require('./routes/wordRoutes');

app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);
app.use('/installation', installationRoutes);
app.use('/word', wordRoutes);

// Serve index.ejs
app.get('/', (req, res) => {
    res.render('index');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
