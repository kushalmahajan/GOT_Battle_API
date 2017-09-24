'use strict';
const express = require('express'),
    config = require('./config/config'),
    notes = require('./routes/rs_notes'),
    battle = require('./routes/rs_battle'),
   // morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

require('./config/mongoose');
const router = express.Router();
// Setup logger
//app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
//app.use(express.static(path.resolve(__dirname, '..', 'build')));
//require('./loadCSV')(app);
// route middleware that will happen on every request

router.use((req, res, next) => {
    // log each request to the console
    console.log(req.method, req.url);
    next();
});

router.get('/', (req, res) => {
   res.send('Home');
});

app.use('/api', router);
app.use('/api/notes', notes);
app.use('/api/battle', battle);


module.exports = app;

const PORT = process.env.PORT || config.port;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
