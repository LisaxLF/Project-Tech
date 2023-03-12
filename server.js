const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');

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

app.get('/', (req, res) => {
  db.collection('RocketGamers').find().toArray(done)
  function done(err, data) {
		if (err) {
			console.log(err)
		} else {
			console.log(data)
			res.render('index', {data: data});
		}
	}  
})

app.get('/settingsPref', (req, res) => {
  res.render('profilePref.ejs');
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