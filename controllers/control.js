const express = require('express');
const router = express.Router();

module.exports = router;

//Schema
const DATA = require('../models/schema.js');

/////////////////////
//Index Routes
/////////////////////
router.get('/index/', (request, response) => {
    DATA.find({}, (error, data)=>{
        response.render('index.ejs', {
            data: data,
            tabTitle: 'Index'
        });
    });
});


/////////////////////
//Create Routes
/////////////////////
router.post('/index/', (req, res) => {
    DATA.create(req.body, (error, created)=>{
        res.redirect('/index');
    });
});

router.get('/index/new', (req, res) => {
    res.render('new.ejs',
        {
            tabTitle: 'Create'
        });
});

/////////////////////
//Show Routes
/////////////////////
router.get('/index/:indexOf', function(req, res){
        DATA.findById(req.params.indexOf, (err, foundData)=>{
            res.render('show.ejs', {
                Data:foundData,
                tabTitle: 'Show'
            });
        });
    });

/////////////////////
//Delete Route
/////////////////////
router.delete('/index/:indexOf', (req, res) => {
    DATA.findByIdAndRemove(req.params.indexOf, (err, data)=>{
        res.redirect('/index');
    });
});

/////////////////////
//Update Routes
/////////////////////
router.get('/index/:indexOf/edit', (req, res)=>{
    DATA.findById(req.params.indexOf, (err, foundData)=>{
        res.render(
    		'edit.ejs',
    		{
    			data: foundData,
                tabTitle: 'edit'

    		}
    	);
    });
});

router.put('/index/:indexOf', (req, res) => {
    DATA.findByIdAndUpdate(req.params.indexOf, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/index');
    });
});
