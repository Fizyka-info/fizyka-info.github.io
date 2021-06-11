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

app.use(router)

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
 

return false;
});
