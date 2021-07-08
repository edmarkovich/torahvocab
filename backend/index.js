const Express = require("express");
const cors = require('cors')
const MongoClient = require("mongodb").MongoClient;
var morgan = require('morgan');
var bodyParser = require('body-parser')

var app = Express();
//app.use(morgan('combined'))


app.use(Express.static('public'))
app.use(cors())
app.use(bodyParser.json())

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
    sendTextFromDB(request.query.book, "Tanach with Nikkud", 
        request.query.chapter, 
        request.query.verse, 
        response);
  });

 app.get("/eng", (request, response) => {
    sendTextFromDB(request.query.book, "The Koren Jerusalem Bible",         
    request.query.chapter, 
    request.query.verse, 
    response);
  });

  app.get("/shape", (request, response) => {
    collection.find({"title":request.query.book, 
        "versionTitle":"Tanach with Nikkud"}).toArray((error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            response.send(result[0].chapter.map(x => x.length));
        });
  });

  app.get("/word/:word", (request, response) => {
    word_form.find({"form":request.params['word']}).toArray()
    .then(result => [...new Set(result.map(x=>x.lookups.map(y=>y.headword)).flat())]) //TODO: not just 1st
    .then(headword => lexicon_entry.find({headword: { "$in": headword }}).toArray())
    .then(result => result.map(x => x.content/*.senses.map(y=>y.definition)*/)) 
    .then(x => {response.send(x)})
  })

  app.get("/user/ed/bookmark", (request, response) => {
    console.log("heres my load")
    bookmarks.findOne({user:"ed"})
    .then(x => response.send(x))
  });
  
  app.put("/user/ed/bookmark", (request, response) => {
    console.log("put it in me", request.body)
    bookmarks.replaceOne({user:"ed"}, { ...request.body, user:"ed" }, {upsert: true})
    response.send({})
  }); 

  app.get("/word_freqs", (request, response) => {
    collection.find({versionTitle: "Tanach with Nikkud", 
        title: {$in: ["Genesis","Exodus","Leviticus","Numbers","Deuteronomy"]}} )
        .map(x => x.chapter).toArray((error,result) => {
            if (error) return response.status(500).send(error);
            var words_split = result.flat(10).map(x=>x.split(" ")).flat(2)
            var words = {} 
            words_split.forEach(element => {
                words[element] = ( typeof words[element] != 'undefined' ) ? words[element]+=1 : 1    
            });

            var out = {}
            for (key in words) {
                out[key] = words[key]
              }
            
            response.send(out)
        })
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
        bookmarks = database.collection("bookmarks")

        console.log("Connected");
    });


});
