const express = require('express');
const router = express.Router();

module.exports = router;

//Schema
const Volunteers = require('../models/vol.js');
const Events = require('../models/events.js');

/////////////////////
//Index Routes
/////////////////////
router.get('/', (req, res) => {
    if(req.session){
    if (req.session.login === true){
        Volunteers.find({username: req.session.user}, (error, data)=>{
        res.render('./vol/index.ejs', {
            data: data,
        });
    });} else {res.redirect('/vol/error')}}
    else{
        res.redirect('/vol/error');
    }
});

//login or signup error page
router.get('/error', (req, res) => res.render('./vol/error.ejs'))


/////////////////////
//Create Routes
/////////////////////
router.post('/new', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    req.body.username = req.session.user;
    Volunteers.create(req.body, (error, created)=>{
        res.redirect('/vol/');
    });}
    else {res.redirect('/vol/error')}}
        else{
            res.redirect('/vol/error');
        }
});

router.get('/new', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    res.render('./vol/new.ejs');}
    else {res.redirect('/vol/error')}}
        else{
            res.redirect('/vol/error');
        }
});

/////////////////////
//Show Routes
/////////////////////
router.get('/view/:indexOf', function(req, res){
    if(req.session){
    if (req.session.login === true){
        Volunteers.findById(req.params.indexOf, (err, foundData)=>{
            res.render('./vol/show.ejs', {
                data:foundData
            });
        });}
        else {res.redirect('/vol/error')}}
            else{
                res.redirect('/vol/error');
            }
    });

/////////////////////
//Delete Route
/////////////////////
router.get('/delete/:indexOf', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    Volunteers.findByIdAndRemove(req.params.indexOf, (err, data)=>{
        res.redirect('/vol/');
    });}
    else {res.redirect('/vol/error')}}
        else{
            res.redirect('/vol/error');
        }
});

/////////////////////
//Update Routes
/////////////////////
router.get('/edit/:indexOf', (req, res)=>{
    if(req.session){
    if (req.session.login === true){
    Volunteers.findById(req.params.indexOf, (err, foundData)=>{
        res.render(
    		'./vol/edit.ejs',
    		{
    			data: foundData

    		}
    	);
    });}
    else {res.redirect('/vol/error')}}
        else{
            res.redirect('/vol/error');
        }
});

router.put('/edit/:indexOf', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    req.body.username = req.session.user;
    Volunteers.findByIdAndUpdate(req.params.indexOf, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/vol/');
    });}
    else {res.redirect('/vol/error')}}
        else{
            res.redirect('/vol/error');
        }
});

/////////////////////
//Assign Volunteers
/////////////////////

router.get('/assign/:event', (req, res) => {
    if(req.session){
    if (req.session.login === true){
        Volunteers.find({username: req.session.user}, (error, data)=>{
        res.render('./vol/assign.ejs', {
            data: data,
            event: req.params.event
        });
    });} else {res.redirect('/vol/error')}}
    else{
        res.redirect('/vol/error');
    }
});

router.post('/assign/:indexOf', (req, res) => {
    //Check if user logged in
    if(req.session){
    if (req.session.login === true){
    req.body.username = req.session.user;
    //check for each request object that is 'on' and add key to name array
    const bodyKeys = Object.keys(req.body);
    let nameArray = [];
    for (key of bodyKeys){
        if (req.body[key] === 'on'){
            nameArray.push(key);
        }
    }
    updateObj = {volunteers: nameArray}
    //set name array as volunteer property of event
    Events.findByIdAndUpdate(req.params.indexOf, updateObj, {new:true}, (err, updatedModel)=>{
        res.redirect('/events/');
    });}
    else {res.redirect('/events/error')}}
        else{
            res.redirect('/events/error');
        }
});
