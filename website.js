const polka = require('polka');
const app = polka();

const PORT = process.env.PORT || 5226;
var fs = require('fs');

const dotenv = require('dotenv');
dotenv.config();

const { join } = require('path');
const dir = join(__dirname, 'public');
const serve = require('serve-static')(dir);
app.use(serve);

app.get('/', (req, res) => {
    var htmlTemplate = fs.readFileSync(__dirname + '/public/website/' + `home.html`, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlTemplate);
});

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${PORT}`);
});