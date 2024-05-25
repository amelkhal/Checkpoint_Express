const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to check working hours
const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 20) {
        next();
    } else {
        res.send('The web application is only available during working hours (Monday to Friday, 9 to 17).');
    }
};

// Use the middleware
app.use(workingHoursMiddleware);

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
