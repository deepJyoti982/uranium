const express = require('express');
const welcome = require('../logger/logger');
const helperModule = require('../util/helper');
const formatter = require('../validator/formatter')
const lodash = require('lodash')

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
    welcome.welcome();
    helperModule.date()
    helperModule.month()
    helperModule.info()
    formatter.trim()
    formatter.changetoLowerCase()
    formatter.changeToUpperCase()

    // console.log(welcome)
});

router.get('/hello',function(req,res) {
    res.send('Welcome to my hello api!')
    let month = ['jan','feb','mar','aprl','may','jun','jul','aug','sep','oct','nov','dec']
    let subMonth = lodash.chunk(month,3)
    console.log(subMonth)

    let oddNum = [1,3,5,7,9,11,13,15,17,19]
    console.log('The last 9 odd numbers are: ',lodash.tail(oddNum))

    let a = [1 , 2, 1, 4]
    let b = [2, 3, 4, 3]
    let c = [6, 1, 5, 10]
    let d = [1, 1, 1]
    let e = [1, 2, 3, 4, 5]

    console.log('Final array of unique numbers is: ',lodash.union(a,b,c,d,e))

    let arr = [["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
    console.log(lodash.fromPairs(arr))
});

module.exports = router;
// adding this comment for no reason