// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to serve JSON data
app.get('/api/products', (req, res) => {
  const dataPath = path.join(__dirname, 'data.json');
  
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading data' });
      return;
    }
    
    let products = JSON.parse(data);
    const { category, search } = req.query;

    // Filter products by category
    if (category) {
      products = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }
    
    // Search for products by name
    if (search) {
      products = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }
    
    res.json(products);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
