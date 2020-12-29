import * as express from "express";
import * as mongodb from 'mongodb';
import { MongoHelper } from "./mongo.helper";
const todoRoutes = express.Router();
// @ Mongo Operation Implementation 
const getCollection = () => {
    return MongoHelper.client.db('todoapp').collection('todos')
}
// @ Enpoint Implementation:
 todoRoutes.get('/todo', (req: express.Request, resp: express.Response, next: express.NextFunction) =>{
    const collection  =  getCollection();
    collection.find({}).toArray((err, item) => {
        if(err){
            resp.status(500);
            resp.end();
            console.error('Caught Error', err)
        }
         else {
             item = item.map((item) =>{
                 return { id: item._id, description: item.description}
             });
             resp.json(item)
         }
    })
});

todoRoutes.post('/todo', (req: express.Request, resp: express.Response, next: express.NextFunction) =>{
      const description = req.body['description'];
      //console.log(description);
      const collection = getCollection();
      collection.insertOne({description: description})
      resp.end();
});

todoRoutes.put('/todo/:id', (req: express.Request, resp: express.Response, next: express.NextFunction) =>{
      const description = req.body['description'];
      const id = req.params['id'];
      const collection =  getCollection(); 
      collection.findOneAndUpdate({"_id": new mongodb.ObjectId(id)}, {$set: {description: description}});
      resp.end()
})

todoRoutes.delete('/todo/:id', (req: express.Request, resp: express.Response, next: express.NextFunction) =>{
    const id = req.params['id'];
    const collection =  getCollection(); 
    collection.remove({"_id": new mongodb.ObjectId(id)}, )
   resp.end()
})

export { todoRoutes };