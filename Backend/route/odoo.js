const express = require('express');
const app = express();
const odooRoutes = require('./routes/odoo');

// Middleware
app.use(express.json());

// Use your new route
app.use('/api', odooRoutes);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
