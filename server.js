let http = require('http');
let fs = require('fs');
let qs = require('qs');
let url = require('url')

// const { log } = require('console');
let handles = {}
let  userInfo
const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url).pathname
    
    switch (urlPath) {
        case '/home':
            console.log(111);
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
                res.writeHead(301,{location:'/print'})
                res.end();
            }
            break;
        case '/print':    
            handles.displayForm(req, res)
            break;
           
    }
});
server.listen( 3000, () => {
    console.log('http server http://localhost:3000')
})
handles.formInput = function (req,res){
    fs.readFile('./form.html', 'utf-8', (err, data) => {
        req.on('data',(err)=>{
            if (err) {
                console.log(err);
            }
        })
        req.on('end',(err)=>{
            if (err) {
                console.log(err.message);
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
        
    })
}

handles.displayForm = function(req, res){
   
    fs.readFile('./display.html', 'utf8', function (err, dataHtml) {
        if (err) {
            console.log(err);
        }
        res.write(dataHtml);
        return res.end();
    });
    req.on('error', () => {
        console.log('error')
    })
}

