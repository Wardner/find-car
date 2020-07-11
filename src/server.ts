import http, { Server } from 'http'
import { app, initialize } from './app'

// HTTP Server
const server: Server = http.createServer(app);

try {
  //Launch App and Connected to Database
  initialize().then(() => {
    server.listen(app.get('port'), () => {
      console.log('[API SERVER]: running on port', app.get('port'))
    })
  })
} catch (error) {
  console.log('error');
  process.exit()
}

export {
  server
}