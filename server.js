const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001; // You can change the port number to any available port you prefer

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Middleware to parse JSON data
app.use(bodyParser.json());

// Route to handle form data submission
app.post('/api/submit-reservation', (req, res) => {
  const formData = req.body;
  console.log('Received data:', formData);

  // Process the data and send a response
  // You can save it to a database, perform validation, etc.

  res.status(200).json({ message: 'Data received successfully' });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
