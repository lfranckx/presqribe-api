const { response } = require('express');
const express = require('express');
const request = require('request');
const jsonParser = express.json();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.send('Oven is hot!');
});

app.get('/drugs/name', jsonParser, (req, res, next) => {
    const { type, url, dataType } = req.body;
    for (const field of ['type', 'url', 'dataType'])
        if (!req.body[field])
            return res.status(400).json({
                error: `Missing ${field} in request body`
            });
    request(
        { url: url },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }
            res.json(JSON.parse(body));
        }
    )
});

app.listen(8000, () => {
    console.log('The oven is cooking on PORT 8000');
});

// console.log('working');