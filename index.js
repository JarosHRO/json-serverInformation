const path = require('path');
const fs = require('fs');
const http = require('http');

const jsonServer = require('json-server')
const bodyParser = require('body-parser');

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()


const hostname = '127.0.0.1';
const port = 3000;

server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(bodyParser.json());

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

server.get('/peoples', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    var db = router.db
    var peoples = db.get('peoples').value()
    if (peoples) {
        res.jsonp({
            response,
            peoples
        })
    } else {
        sendError(res)
    }
})

server.use(middlewares)
server.use(router)

var response = {
    codigo: '0',
    descripcion: 'Ok'
}

function sendError(res) {
    res.setHeader('Content-Type', 'application/json');
    var readable = fs.createReadStream(errorFilePath)
    readable.pipe(res)
    return
}