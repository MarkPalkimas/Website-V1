// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS if your frontend is served from a different origin
app.use(cors());
app.use(express.json());

// In-memory store for visitor logs
let visitorLogs = [];

// Endpoint to return visitor logs
app.get('/api/getVisitorLogs', (req, res) => {
  res.json(visitorLogs);
});

// Endpoint to log visitor data
app.post('/api/logVisitor', (req, res) => {
  // Use x-forwarded-for for proxies or socket.remoteAddress as fallback.
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const timestamp = new Date().toISOString();
  
  const newLog = { timestamp, ip, userAgent };
  visitorLogs.push(newLog);
  
  res.json({ message: 'Logged successfully', log: newLog });
});

// (Optional) Serve static files if needed—for example, your admin.html
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
