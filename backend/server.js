const http = require('http'); //import http module

const app = require('./app'); //import express app 

app.set('port', process.env.PORT || 3000); // tell app where to go

server = http.createServer(app); // create server

server.listen(process.env.PORT || 3000); // start server 