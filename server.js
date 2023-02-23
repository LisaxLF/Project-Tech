// starten van express
const express = require('express')
const res = require('express/lib/response')
const app = express()
const path = require('path')

// port waar server op loopt
const port = 3000

// Set the View Engine or Template Engine
app.set('view engine', 'ejs');

// static content gebruiken
app.use(express.static(__dirname + '/static'));

// een route die leidt naar de login
app.get('/login', (req, res) => {
    res.send('<h1> Welcome to Gamerz, login in to continue</h1>')
})
// een route die leidt naar de homepage
app.get('/', function (req, res) {
    const gamer = {
        gamertag: "@Geert",
        bio: "Hoi ik ben geert welkom, ik zoek goede teammates",
        rank: ['/static/images/icons/champ.png', '/static/images/icons/champ2.png', '/static/images/icons/champ3.png' ]
      }
    res.render("index", {gamer});
  })


// een route die leidt naar profiel
app.get('/profiel/:user/', (req, res) => {
    console.log(`Input from ${req.params.user}`)
    res.send('<h1>Hello ' + req.params.user + ',' + 'Dit is jouw profiel</h1>')
})


// de port openen zodat de server kan lopen
app.listen(port, function(error){
    if(error) throw error
    console.log("Server created Successfully")
})