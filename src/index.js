const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://deepJyoti982:deep982@cluster0.spz7j.mongodb.net/deepJyoti982", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

const moment = require("moment")
app.use(function(req,res,next){
    let x = moment().format("YYYY-MM-DD HH:m:s")
    let y = req.ip
    let z = req.originalUrl
    console.log(x + " ,"+ y +" , "+ z)
    next()
})



app.use('/',route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

