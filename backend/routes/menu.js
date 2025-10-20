const fs = require('fs');
const path = require('path');

function handleMenu(req, res) {
  if (req.url === '/api/menu') {
    // надежден път към JSON файла
    const menuPath = path.join(__dirname, 'data', 'menu.json');

    fs.readFile(menuPath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Грешка при четене на menu.json:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
    return true;
  }
  return false;
}

module.exports = handleMenu;
