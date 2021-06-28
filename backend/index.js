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

function sendTextFromDB(title, versionTitle, chapter, verse, response) {
    console.log(chapter, verse)
    collection.find({"title":title, 
		     "versionTitle":versionTitle}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send([result[0].chapter[chapter][verse]]);
    });
}

 app.get("/heb", (request, response) => {

     sendTextFromDB("Genesis", "Tanach with Nikkud", 
        request.query.chapter, 
        request.query.verse, 
        response);
  });

 app.get("/eng", (request, response) => {
    sendTextFromDB("Genesis", "The Koren Jerusalem Bible",         
    request.query.chapter, 
    request.query.verse, 
    response);
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
