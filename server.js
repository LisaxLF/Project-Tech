// ACTIVEREN VAN MODULES
const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');
const multer = require('multer')
const Objectid = require('mongodb').ObjectId

let imageID = 0

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `static/upload/${req.body.title}/`)
  },
  filename: (req, file, callback) => {
    console.log(file)
    callback(null, `${imageID}.${file.mimetype.split('/')[1]}`)
    imageID++
  }
})

require('dotenv').config();

// DATABASE //
const {
  MongoClient,
  ServerApiVersion,
  ObjectId
} = require('mongodb');
const {
  redirect
} = require('express/lib/response');
const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + "/" + "?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
})

client.connect(err => {
  if (err) {
    throw err
  }
})

const db = client.db(process.env.DB_NAME) // Verbinden van de database in een env bestand

// port waar server op loopt
const port = process.env.DB_PORT

// Set the View Engine or Template Engine
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

// static content gebruiken
app.use(express.static(__dirname + '/static'));

// ROUTES //
// route naar homepage
app.get('/', async (req, res) => { //async is een asynchrone operatie die niet blokkerend is, dus ervoor zorgt dat de code verder kan gaan.
  const data = await db.collection('user_matches').find().toArray(); //gegevens uit de database op te halen en door te geven aan de template
  res.render('index', {
    data: data
  })
})

// route naar homepage met nieuwe match
app.get('/newMatch', async (req, res) => {
  const data = await db.collection('user_matches').find().toArray();
  res.render('index', {
    data: data
  })
})

app.get('/settingsPref', async (req, res) => {
  const data = await db.collection('user_settings').find().toArray();
  res.render('profilePref', {
    data: data
  });
})


app.post("/userSettings", async (req, res) => {
  // dit is object destructuring, mooie syntax
  const {
    gamerTag,
    gamerBio
  } = req.body;
  // vinden van mijn eigen 'account'  // ik heb geen login account
  const me = await db.collection('user_settings').findOne({
    _id: new ObjectId('640e055f497823593fe1db92'), // ik zoek mezelf op door mijn unieke _id
  });
  // in het eerste object zoek ik mezelf op {}, in het tweede object {} gebruik ik $set: om data te updaten en dan de data die ik wilt updaten komt mijn je req.body  
  console.log(me)
  await db.collection("user_settings").findOneAndUpdate({
    gamerTag: me.gamerTag,
  }, {
    $set: {
      gamerTag: gamerTag,
      gamerBio: gamerBio,
    },
  });
  res.redirect('/settingsPref')
});

app.post('/teammateSettings', async (req, res) => {
  console.log(req.body);
  res.redirect('/newMatch')
})

// een route die leidt naar 404 error
app.get('/notFound', (req, res) => {
  res.status(404).render('notFound.ejs');
})

// de port openen zodat de server kan lopen
app.listen(port, function (error) {
  if (error) throw error
  console.log("Server created Successfully")
})