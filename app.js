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
    console.log(req.body);
    const { url } = req.body;

    if (!req.body.url !==  url) {
        return res.status(400).json({
            error: `Missing ${url} in request body`
        });
    }   
        
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