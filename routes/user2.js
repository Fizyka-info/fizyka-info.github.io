const express = require('express')
const mysql = require('mysql')
const router2 = express.Router()


router2.get('/messages', (req, res) => {
  res.end()
})

router2.get("/user2", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM users2"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
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

router2.post('/user2', (req, res) => {

 
    const firstQuestion = req.body.Q11
    const secondQuestion = req.body.Q22
    const thirdQuestion = req.body.Q33

  
    const queryString = "INSERT INTO users2 (first_question, second_question, third_question) VALUES (?, ?, ?)"
    getConnection().query(queryString, [firstQuestion, secondQuestion, thirdQuestion], (err, results, fields) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      res.redirect("/atomowa3.html");
      res.end()
    })
  })
  
router2.get('/user2/:id', (req, res) => {

    const connection = getConnection()

    const user2Id = req.params.id
    const queryString = "SELECT * FROM users2 WHERE id = ?"
   connection.query(queryString, [user2Id], (err, rows, fields) => {
        if (err) {
        res.sendStatus(500)
        return
        }

        const users2 = rows.map((row) => {
        return {firstQuestion: row.first_question, secondQuestion: row.second_question, thirdQuestion: row.third_question}
        })

        res.json(users2)
    })
})

module.exports = router2
