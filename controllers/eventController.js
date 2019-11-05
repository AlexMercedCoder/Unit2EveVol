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
        Events.find({username: req.session.user}, (error, data)=>{
        console.log(data);
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
router.post('/new', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    req.body.username = req.session.user;
    console.log(req.body)
    Events.create(req.body, (error, created)=>{
        console.log(created);
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
    Events.findByIdAndRemove(req.params.indexOf, (err, data)=>{
        res.redirect('/index');
    });
});

/////////////////////
//Update Routes
/////////////////////
router.get('/edit/:indexOf', (req, res)=>{
    if(req.session){
    if (req.session.login === true){
    Events.findById(req.params.indexOf, (err, foundData)=>{
        console.log(foundData, err)
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
    console.log(req.body)
    Events.findByIdAndUpdate(req.params.indexOf, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/events/');
    });}
    else {res.redirect('/events/error')}}
        else{
            res.redirect('/events/error');
        }
});
