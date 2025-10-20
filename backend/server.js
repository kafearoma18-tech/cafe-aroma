const http = require('http');
const fs = require('fs');
const path = require('path');
const handleNews = require('./routes/news');
const handleMenu = require('./routes/menu'); // <- добавено

const server = http.createServer((req, res) => {
    // Първо проверяваме за API заявките
    if (req.url === '/api/menu') {
        // Променен път за надеждно намиране на JSON
        const menuPath = path.join(__dirname, 'data', 'menu.json');
        fs.readFile(menuPath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Грешка при четене на menu.json:', err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(data);
        });
        return; // спираме по-нататъшна обработка
    }

        if (req.url === '/api/news') {
        // Променен път за надеждно намиране на JSON
        const menuPath = path.join(__dirname, 'data', 'news.json');
        fs.readFile(menuPath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Грешка при четене на news.json:', err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(data);
        });
        return; // спираме по-нататъшна обработка
    }

    if (handleNews(req, res)) return;

    // Всички останали файлове от frontend
    let filePath = './frontend' + (req.url === '/' ? '/index.html' : req.url);
    const ext = path.extname(filePath);
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.json': 'application/json'
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
