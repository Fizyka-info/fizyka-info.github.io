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
 
    const firstQuestion = req.body.Q1
    const secondQuestion = req.body.Q2
    const thirdQuestion = req.body.Q3
    const fourthQuestion = req.body.Q4
    const fifthQuestion = req.body.Q5

  
    const queryString = "INSERT INTO users (first_question, second_question, third_question, fourth_question, fifth_question) VALUES (?, ?, ?, ?, ?)"
    getConnection().query(queryString, [firstQuestion, secondQuestion, thirdQuestion, fourthQuestion, fifthQuestion], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new user: " + err)
        res.sendStatus(500)
        return
      }
      //res.redirect("/atomowa2.html");
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
        return {firstQuestion: row.first_question, secondQuestion: row.second_question, thirdQuestion: row.third_question, fourthQuestion: row.fourth_question, fifthQuestion: row.fifth_question}
        })

        res.json(users)
    })
})

module.exports = router
