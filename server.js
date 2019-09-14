const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/clients', require('./routes/api/clients'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/configurations', require('./routes/api/configurations'));
app.use('/api/sales', require('./routes/api/sales'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
