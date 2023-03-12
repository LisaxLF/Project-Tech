const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');
const multer = require('multer')

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


// database
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + "/" + "?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

client.connect(err => {
	if (err) { throw err }
})

const db = client.db(process.env.DB_NAME)

// port waar server op loopt
const port = 3000

// Set the View Engine or Template Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// static content gebruiken
app.use(express.static(__dirname + '/static'));

// een route die leidt naar de homepage

app.get('/', async (req, res) => {
  const data = await db.collection('user_matches').find().toArray();
  res.render('index', {data: data})
})

app.get('/settingsPref', async (req, res) => {
  const data = await db.collection('user_settings').find().toArray();
  res.render('profilePref', {data: data});
})

app.post('/settingsPref', async (req, res) => {
  console.log(req.body);
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