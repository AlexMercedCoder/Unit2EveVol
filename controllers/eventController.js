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
    if (req.session.login === true){
        Events.find({username: req.session.user}, (error, data)=>{
        res.render('./events/index.ejs', {
            data: data,
        });
    });} else {res.redirect('/events/error')}}
    else{
        res.redirect('/events/error');
    }
});


//////////////////////////////
//API Endpoint
//////////////////////////////
router.get('/api/:user', (req, res) => {
        Events.find({username: req.params.user}, (error, data)=>{
        res.send(data);
    });
});


//login or signup error page
router.get('/error', (req, res) => res.render('./events/error.ejs'))


/////////////////////
//Create Routes
/////////////////////
router.post('/new', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    req.body.username = req.session.user;
    Events.create(req.body, (error, created)=>{
        res.redirect('/events/');
    });}
    else {res.redirect('/events/error')}}
        else{
            res.redirect('/events/error');
        }
});

router.get('/new', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    res.render('./events/new.ejs');}
    else {res.redirect('/events/error')}}
        else{
            res.redirect('/events/error');
        }
});

/////////////////////
//Show Routes
/////////////////////
router.get('/view/:indexOf', function(req, res){
        Events.findById(req.params.indexOf, (err, foundData)=>{
            res.render('./events/show.ejs', {
                data:foundData
            });
        });
    });

/////////////////////
//Delete Route
/////////////////////
router.get('/delete/:indexOf', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    Events.findByIdAndRemove(req.params.indexOf, (err, data)=>{
        res.redirect('/events/');
    });}
    else {res.redirect('/events/error')}}
        else{
            res.redirect('/events/error');
        }
});

/////////////////////
//Update Routes
/////////////////////
router.get('/edit/:indexOf', (req, res)=>{
    if(req.session){
    if (req.session.login === true){
    Events.findById(req.params.indexOf, (err, foundData)=>{
        res.render(
    		'./events/edit.ejs',
    		{
    			data: foundData

    		}
    	);
    });}
    else {res.redirect('/events/error')}}
        else{
            res.redirect('/events/error');
        }
});

router.put('/edit/:indexOf', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    req.body.username = req.session.user;
    Events.findByIdAndUpdate(req.params.indexOf, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/events/');
    });}
    else {res.redirect('/events/error')}}
        else{
            res.redirect('/events/error');
        }
});
