const fs = require('fs');

function handleGallery(req, res) {
  if (req.url === '/api/gallery') {
    fs.readFile('./backend/data/gallery.json', 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
      }
    });
    return true; // заявката е обработена
  }
  return false; // заявката не е за този маршрут
}

module.exports = handleGallery;
