import http2 from 'http2';
import fs from 'fs';

const optionsHttp2 = {
    key:fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt')
}
const server = http2.createSecureServer(optionsHttp2,(req,res)=>{
    //     console.log(req.url);
    // //     res.writeHead(200,{'Content-Type':'text/html'});
    // //     res.write(`<h2> Url : ${req.url}</h2>`)
    // //     res.end();
    // const payLoad = {
    //     name: 'omar',
    //     age: 30,
    //     city: 'buenos aires'
    // };
    // res.writeHead(200,{'Content-Type':'application/json'});
    // res.end(JSON.stringify(payLoad))
    if (req.url==='/'){
        const html = fs.readFileSync('./public/index.html','utf-8');
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(html);
        return;
    } 
    if (req.url?.endsWith('.js')){
        res.writeHead(200,{'Content-Type':'application/javascript'});
    } else if (req.url?.endsWith('.css')){
        res.writeHead(200,{'Content-Type':'text/css'});
    }
    try {
        const responseContent = fs.readFileSync(`./public${req.url}`,'utf-8');
        res.end(responseContent);
    } catch (error) {
        res.writeHead(404,{'Content-Type':'text/html'});
        res.end();

    }
})

server.listen(3000,()=>{
    console.log('Server running on 3000');
})