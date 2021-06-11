$(form.ajax).on('submit', function(){
    var that = $(this),
    url = that.attr('action'),
    method =that.attr('method'),
    data = {};
   
    that.find('[name]').each(function(index, value){
      var that = $(this),
      name = that.attr('name'),
      value = that.val();
   
      data[name] = value;
    });
    $.ajax({
   url: url,
   type: type,
   data: data,
   success: function(response){
     console.log(response);
   }
    });
    const express = require('express')
const router = express.Router()
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
   
   return false;
   });