let http = require('http');
let fs = require('fs');
let qs = require('qs');
let url = require('url')

const { log } = require('console');
let handles = {}
let  userInfo
const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url).pathname
    switch (urlPath) {
        case '/':
            if (req.method === 'GET') {
                handles.formInput(req,res)
                //
            } else {
                let data = ''
                req.on('data', chunk => {
                    data += chunk
                })
                req.on('end', () => {
                    userInfo = qs.parse(data);
                })
                res.writeHead(301,{location:'/display'})
                res.end();
            }
            break;
        case '/display':    
            handles.displayForm(req, res)
            break;
        default:
            res.end('deoco')
            break;
    }
});
server.listen( 3000, () => {
    console.log('http server http://localhost:3000')
})
handles.formInput = function (req,res){
    fs.readFile('./form.html', 'utf-8', (err, data) => {
        if (err) {
            console.log(err.message);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}

handles.displayForm = function(req, res){
   
    fs.readFile('./display.html', 'utf8', function (err, dataHtml) {
        if (err) {
            console.log(err);
        }
        dataHtml = dataHtml.replace("NAME", userInfo.name);
        dataHtml = dataHtml.replace("PASSWORD", userInfo.password);
        res.write(dataHtml);
        return res.end();
    });
    req.on('error', () => {
        console.log('error')
    })
}

