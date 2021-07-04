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

  app.get("/shape", (request, response) => {
    collection.find({"title":"Genesis", 
        "versionTitle":"Tanach with Nikkud"}).toArray((error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            response.send(result[0].chapter.map(x => x.length));
        });
  });

  app.get("/word/:word", (request, response) => {
      console.log(request.params['word']), 
    word_form.find({"form":request.params['word']}).toArray()
    .then(result => [...new Set(result.map(x=>x.lookups.map(y=>y.headword)).flat())]) //TODO: not just 1st
    .then(headword => lexicon_entry.find({headword: { "$in": headword }}).toArray())
    .then(result => result.map(x => x.content/*.senses.map(y=>y.definition)*/)) 
    .then(x => {response.send(x)})
  })


app.listen(5000, () => {

  MongoClient.connect("mongodb://localhost", { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db("sefaria");
        collection = database.collection("texts");
        word_form  = database.collection("word_form")
        lexicon_entry  = database.collection("lexicon_entry")

        console.log("Connected");
    });


});
