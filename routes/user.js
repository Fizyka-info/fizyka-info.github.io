// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()


router.get('/messages', (req, res) => {
  console.log("11111111")
  res.end()
})

router.get("/user", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM users"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      }
      res.json(rows)
    })
  })

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'be392d3481f8c6',
    password: '37efc915',
    database: 'heroku_576e0dbd383ebc6'
})

function getConnection() {
    return pool
}

router.post('/user', (req, res) => {
    console.log("Trying to create a new user...")
    console.log("How do we get the form data???")
  
    console.log("First name: " + req.body.create_first_name)
    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name
  
    const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
    getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new user: " + err)
        res.sendStatus(500)
        return
      }
  
      console.log("Inserted a new user with id: ", results.insertId);
      res.end()
    })
  })
  
router.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
        // throw err
        }

        console.log("I think we fetched users successfully")

        const users = rows.map((row) => {
        return {firstName: row.first_name, lastName: row.last_name}
        })

        res.json(users)
    })
})

module.exports = router