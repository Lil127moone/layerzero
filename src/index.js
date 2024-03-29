// Import necessary modules
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Create an Express application
const app = express();

// Serve a simple HTML page for demonstration purposes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Create an HTTP server and integrate it with the Express app
const server = http.createServer(app);

// Create a WebSocket server by passing the HTTP server
const wss = new WebSocket.Server({ server });

// Set up a connection event for WebSocket
wss.on('connection', (ws) => {
  // Set up a message event for WebSocket
  ws.on('message', (message) => {
    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
