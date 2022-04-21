const {  createServer } = require('http')
const { writeFile } = require('fs');
const { promisify } = require('util');
const writeFilePromised = promisify(writeFile)

const port = 3000
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
};
const routes = {
  postImage: (req) => req.url === '/' && req.method === 'POST'
}

const reqListener = async (req, res) => {
  let imagedata = ''
  const { postImage } = routes
  res.writeHead(200, headers);

  if (postImage(req)) {
    req.on('data', (chunk) => imagedata += chunk)
    
    req.on('end', async () => {
      try {
        const prefix = /^data:image\/(png|jpeg|jpg);base64,/.exec(imagedata)[1]
        const base64Data = imagedata.replace(/^data:image\/(png|jpeg|jpg);base64,/,"")

        await writeFilePromised(`file.${prefix}`, base64Data, 'base64')

        console.log('File saved!')
      } catch (e) {
        console.error(e)
      }
    })
  }
}

const server = createServer(reqListener)

server.listen(port, () => console.log(`Server is running on port ${port}!`))