const express = require('express');
const welcome = require('../logger/logger');
const helperModule = require('../util/helper');
const formatter = require('../validator/formatter')
const lodash = require('lodash');
// const { players } = require('../controller/controller');
const handler = require('../data/dataobj');
const { values } = require('lodash');


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
    res.send('Welcome to my hello api! i love this api')
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


// Date: 08/04/2022
// Problem => 1
router.get('/missing-num',function(req,res) {
    let numbers = [1,2,3,4,5,7,8,9]
    let sum = 0
    for(let i = 0;i<numbers.length;i++)
    {
        sum += numbers[i]
        var n = numbers[i]
    }
    // console.log(n)
    let sn = (n*(n+1))/2;
    let mn = (sn - sum)
    // console.log(mn)
    res.send(String(mn))
});

// Problem => 2
router.post('/player',function(req,res) {
    res.send({data: handler.players , status: true})
});


// Date: 07/04/2022
// Problem => 1
router.get('/movies',function(req,res) {
    res.send(handler.movies)
});


// Problem => 2
router.get('/movies/:indexNumber',function(req,res) {
    let index = req.params.indexNumber
    // console.log(index)

    if(index < 0 || index > handler.movies.length) {
        res.status(404).send("Invalid Index")
    }
    else{
        for(let i = 0; i < handler.movies.length; i++) {
            if(i == index) {
                res.send(handler.movies[index])
            }
        }
    }
});


// Problem => 3
router.get('/films',function(req,res) {
    res.send(handler.films)
});


// Problem => 4
router.get('/films/:filmId',function(req,res) {
    let id = req.params.filmId
    // console.log(id)
    let flag = 0
    handler.films.forEach(element => {
        // console.log(element)
        if(element.id == id) {
            // console.log(element.name)
            res.send(element.name)
            flag = 1
            
        }
    });
    if(flag == 0) {
        res.status(404).send("No movie exists with this id")
    } 
});

module.exports = router;
// adding this comment for no reason