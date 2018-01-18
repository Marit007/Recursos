const http = require('http');

server = http.createServer().listen(3000);

server.on('request',(req, res) => {   
    if (req.url === '/') {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("Hello word");
        }
        else if (req.url === '/despido') {
            if (req.method === 'GET') {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end("chau por get");
            }
            else if(req.method ==='POST'){
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end("chau por post");
            }
        }
    
    });