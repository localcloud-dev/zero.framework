const polka = require('polka');
const app = polka();

const PORT = process.env.PORT || 5225;
var fs = require('fs');

const dotenv = require('dotenv');
dotenv.config();

const { join } = require('path');

const servePublic = require('serve-static')(join(__dirname, 'public'));
app.use(servePublic);

app.get('/*', (req, res) => {
    var htmlTemplate = fs.readFileSync(__dirname + '/public/app/' + `app.html`, 'utf8');
    res.end(htmlTemplate);
});

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${PORT}`);
});