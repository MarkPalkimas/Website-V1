// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS if needed (adjust origin as necessary)
app.use(cors());
app.use(express.json());

// In-memory store for visitor logs (for production, use a database)
let visitorLogs = [];

// Endpoint to return visitor logs
app.get('/api/getVisitorLogs', (req, res) => {
  res.json(visitorLogs);
});

// Endpoint to log visitor data
app.post('/api/logVisitor', (req, res) => {
  // Get client IP from x-forwarded-for header (if behind a proxy) or socket.remoteAddress
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const timestamp = new Date().toISOString();
  
  const newLog = { timestamp, ip, userAgent };
  visitorLogs.push(newLog);
  
  res.json({ message: 'Logged successfully', log: newLog });
});

// Serve static files (including your admin.html) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
