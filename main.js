let http = require('http');
let fs = require('fs');
let qs = require('qs')
let handles = {}
const server = http.createServer((req, res) => {
    
});
server.listen( 3000, ', () => {
    console.log('http server http://localhost:5050')
})
// handles.formInput = function (req,res){
//         fs.readFile('./form.html', 'utf-8', (err, data) => {
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(data);
//             return res.end();
//         })
// }
