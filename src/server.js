const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const requestHandler = (req, res) => {
    // Serve index.html for the root path
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    }
    // Serve CSS files
    else if (req.url.endsWith('.css')) {
        fs.readFile(path.join(__dirname, req.url), (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('CSS file not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(content);
        });
    }
    // Handle 404 for other routes
    else {
        res.writeHead(404);
        res.end('Page not found');
    }
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});