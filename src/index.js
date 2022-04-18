// const express = require('express');
// var bodyParser = require('body-parser');

// const route = require('./routes/route.js');

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/', route);

// app.listen(process.env.PORT || 3000, function() {
//     console.log('Express app running on port ' + (process.env.PORT || 3000))
// });

const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb+srv://deepJyoti982:deep982@cluster0.hcglv.mongodb.net/deepJyoti982', { useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
