var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var app = express();
var fs = require("fs");
var port = 3000;
var enviarCorreo = require("./server/correo");

// Constants for API Zone
var mainRoute = "/assets";
var archiveExt = "json";
var department = "departamentos";
var catalog = "catalogo";
var pdf = "pdf";
var email = "email";

app.use(bodyParser.json());
app.use(cors());

// Functions Zone

function sourceLocation(route, prefix, extension) {
  return `${__dirname}${route}/${prefix}.${extension}`;
}

// API Zone

app.get(`/${department}`, function (req, res) {
  var fileSource = sourceLocation(mainRoute, department, archiveExt);
  fs.readFile(fileSource, "utf8", function (err, data) {
    res.end(data);
  });
});

app.get(`/${catalog}`, function (req, res) {
  var fileSource = sourceLocation(mainRoute, catalog, archiveExt);
  fs.readFile(fileSource, "utf8", function (err, data) {
    res.end(data);
  });
});

app.get(`/${pdf}`, function (req, res) {
  var fileSource = sourceLocation(mainRoute, pdf, pdf);
  fs.readFile(fileSource, function (err, data) {
    res.setHeader("Content-Type", "application/pdf");
    res.end(data);
  });
});

app.post(`/${email}`, (req, res) => {
  enviarCorreo(req.body);
  res.status(200).send();
});

//  Server Zone
var server = app.listen(port, function () {
  console.log("DemoApp BackEnd listening at http://localhost", port);
});
