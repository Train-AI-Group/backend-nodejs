// index.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', routes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
