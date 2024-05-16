const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/api/tabella1', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'tabella1.json'), (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.get('/api/tabella2', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'tabella2.json'), (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
