const Express = require("express");
const cors = require('cors')
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use(Express.static('public'))
app.use(cors())

 app.get("/heb", (request, response) => {
    collection.find({"title":"Genesis", 
		     "versionTitle":"Tanach with Nikkud"}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send([result[0].chapter[0][0]]);
    });
  });


 app.get("/eng", (request, response) => {
    collection.find({"title":"Genesis", 
		     "versionTitle":"The Koren Jerusalem Bible"}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send([result[0].chapter[0][0]]);
    });
  });


app.listen(5000, () => {

  MongoClient.connect("mongodb://localhost", { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db("sefaria");
        collection = database.collection("texts");
        console.log("Connected");
    });


});
