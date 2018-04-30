#!/usr/bin/env node

var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 8080,
    publicDir = process.argv[2] || __dirname + '/public',
    path = require('path'),
    fs = require('fs'),
    files = fs.readdirSync('./public/images/photo-gallery');

app.get("/", function (req, res) {
    res.sendFile(path.join(publicDir, "/index.html"));
});

app.get("/rsvp", function (req, res) {
    res.sendFile(path.join(publicDir, "/rsvp.html"));
});

app.get("/photos", function (req, res) {
    res.sendFile(path.join(publicDir, "/photos.html"));
});

app.get("/travel", function (req, res) {
    res.sendFile(path.join(publicDir, "/travel.html"));
});

app.get("/gifts", function (req, res) {
    res.sendFile(path.join(publicDir, "/gifts.html"));
});

app.get("/photo-gallery", function (req, res) {
    res.send({files: files});
});

app.get("/form", function (req, res) {
    const name = req.query.name;
    const db = {
        'Grandma': 'https://goo.gl/forms/86rd8c0Iom8qJpJF2',
        'Chau Family': 'https://goo.gl/forms/58MEqd2KG5ZuAEBo1'
    };

    res.send({
        name: name,
        form: db[name]
    });
});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(publicDir));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

console.log("Simple static server showing %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);