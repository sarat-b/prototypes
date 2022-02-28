var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
//const dburl = 'mongodb://127.0.0.1:27017';
const dburl = 'mongodb://host.docker.internal:27017';

const dbname = 'test';
const collname = 'Cat';


/* GET cats. */
router.get('/', function(req, res, next) {
  MongoClient.connect(dburl, function(err, client){
    if (!err) {
      console.log(client);
      const db = client.db(dbname);
      console.log(db);
      const collection = db.collection(collname);
      console.log(collection);
      collection.find({}).toArray(function(err, cats) {
        if (!err) {
          console.log("found cats!" + cats)
          res.render('cats-directory', { cats: cats});
        } else {
          console.log(err);
          throw err;
        }
        if(client)
          client.close();
      
      });
    }
    else {
      if(err)
        console.log(err)
    }
  });

  
});

module.exports = router;
