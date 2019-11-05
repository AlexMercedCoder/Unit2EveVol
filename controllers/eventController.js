const express = require('express');
const router = express.Router();

module.exports = router;

//Schema
const Events = require('../models/events.js');

/////////////////////
//Index Routes
/////////////////////
router.get('/', (req, res) => {
    if(req.session){
        console.log(req.session);
    if (req.session.login === true){
        Events.find({user: req.session.user}, (error, data)=>{
        res.render('./events/index.ejs', {
            data: data,
        });
    });} else {res.redirect('/events/error')}}
    else{
        res.redirect('/events/error');
    }
});

//login or signup error page
router.get('/error', (req, res) => res.render('./events/error.ejs'))


/////////////////////
//Create Routes
/////////////////////
router.post('/index/', (req, res) => {
    req.body.user = req.session.user;
    if(req.body.shipIsBroken === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.shipIsBroken = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.shipIsBroken = false;
    }
    Logs.create(req.body, (error, created)=>{
        res.redirect('/index');
    });
});

router.get('/index/new', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    res.render('new.ejs',
        {
            tabTitle: 'Create'
        });} else {res.redirect('/login')}}
        else{
            res.redirect('/');
        }
});

/////////////////////
//Show Routes
/////////////////////
router.get('/index/:indexOf', function(req, res){
        Logs.findById(req.params.indexOf, (err, foundData)=>{
            res.render('show.ejs', {
                data:foundData,
                tabTitle: 'Show'
            });
        });
    });

/////////////////////
//Delete Route
/////////////////////
router.delete('/index/:indexOf', (req, res) => {
    Logs.findByIdAndRemove(req.params.indexOf, (err, data)=>{
        res.redirect('/index');
    });
});

/////////////////////
//Update Routes
/////////////////////
router.get('/index/:indexOf/edit', (req, res)=>{
    Logs.findById(req.params.indexOf, (err, foundData)=>{
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
    if(req.body.shipIsBroken === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.shipIsBroken = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.shipIsBroken = false;
    }
    Logs.findByIdAndUpdate(req.params.indexOf, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/index');
    });
});
