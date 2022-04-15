const http = require('http')
const fs = require('fs')

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  };

const reqListener = (req, res) => {
    let imagedata = ''

    res.writeHead(200, headers);

    req.on('data', (chunk) => imagedata += chunk)
    
    req.on('end', async () => {
      const base64Data = imagedata.replace(/^data:image\/(png|jpeg|jpg);base64,/,"")
      fs.writeFile('file.png', base64Data, 'base64', (err) => {
        if (err) throw err
        console.log('File saved!')
      })
    })
    
}

const server = http.createServer(reqListener)
server.listen(3000)