import { app } from './app';
import * as http from 'http';
import { MongoHelper } from './mongo.helper';

const PORT = 8088;
const server = http.createServer(app);
server.listen(PORT);

server.on('listening', async()=>{
      console.log(` Server is up and running on ${PORT}`)
      try {
        await MongoHelper.connect("mongodb://127.0.0.1:27017");
        console.info('Connected to Mongo DB ')
      }   catch (err) {
            console.error(err)
      }
});   