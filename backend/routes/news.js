const fs = require('fs');
const path = require('path');

function handleNews(req, res) {
  if (req.url === '/api/news') {
    const newsPath = path.join(__dirname, 'data', 'news.json');
    
    fs.readFile(newsPath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
      }
    });
    return true; // казва на server.js, че заявката е обработена
  }
  return false;
}

module.exports = handleNews;
