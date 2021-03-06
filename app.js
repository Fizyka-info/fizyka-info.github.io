// load our app server using express somehow....
const cool = require('cool-ascii-faces');
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const path = require('path');

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))


app.use(express.static('./'))

app.use(morgan('short'))

const router = require('./routes/user.js')
const router2 = require('./routes/user2.js')

app.use(router)
app.use(router2)

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from ROOOOOT")
})

const PORT = process.env.PORT || 5000
//app.set("port",PORT);
// localhost:PORT
app.listen(PORT, () => {
  console.log("Server is up and listening on: " + PORT)
})


