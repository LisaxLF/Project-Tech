// starten van express
const express = require('express')
const res = require('express/lib/response')
const app = express()

// port waar server op loopt
const port = 3000

// static content gebruiken
app.use(express.static('static'))
// een route die leidt naar home
app.get('/', (req, res) => {
    res.send('<img src="/images/gebouwen.jpg" width="250"><h1> Welcome to this matching-application for gamers.</h1>')
})

// een route die leidt naar profiel
app.get('/profiel/:user/', (req, res) => {
    console.log(`Input from ${req.params.user}`)
    res.send('<h1>Hello ' + req.params.user + ',' + 'Dit jouw profiel</h1>')
})



// de port openen zodat de server kan lopen
app.listen(port, () => {
    console.log(`Turn up on port: ${port}`)
})