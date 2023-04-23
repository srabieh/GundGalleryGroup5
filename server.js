const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');
const installationRoutes = require('./routes/installationRoutes');
const userRoutes = require('./routes/userRoutes');
const wordRoutes = require('./routes/wordRoutes');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));

// Set the view engine
app.set('view engine', 'ejs');

// Index route
app.get('/', (req, res) => {
    res.render('index');
});

// Use the routes
app.use('/admin', adminRoutes);
app.use('/clients', clientRoutes);
app.use('/installations', installationRoutes);
app.use('/users', userRoutes);
app.use('/words', wordRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
