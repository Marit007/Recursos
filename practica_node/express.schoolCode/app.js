const express = require('express'),
    logger = require('./logger.js'),
    bodyParser = require('body-parser');

app = express();
app.use(express.static('public'));
app.use(function (req, res, next) {
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    req.sarasa = "asd";
    next();
});

require('./routers/routers')(app);
app.listen(3000, function () {
    console.log("server up");
});

