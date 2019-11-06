const express = require('express');
const router = express.Router();

module.exports = router;

//Schema
const Notes = require('../models/notes.js');

/////////////////////
//Index Routes
/////////////////////
router.get('/', (req, res) => {
    if(req.session){
        console.log(req.session);
    if (req.session.login === true){
        Notes.find({username: req.session.user}, (error, data)=>{
        console.log(data);
        res.render('./notes/index.ejs', {
            data: data,
        });
    });} else {res.redirect('/notes/error')}}
    else{
        res.redirect('/notes/error');
    }
});

//login or signup error page
router.get('/error', (req, res) => res.render('./notes/error.ejs'))


/////////////////////
//Create Routes
/////////////////////
router.post('/new', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    req.body.username = req.session.user;
    console.log(req.body)
    Notes.create(req.body, (error, created)=>{
        console.log(created);
        res.redirect('/notes/');
    });}
    else {res.redirect('/notes/error')}}
        else{
            res.redirect('/notes/error');
        }
});

router.get('/new', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    res.render('./notes/new.ejs');}
    else {res.redirect('/notes/error')}}
        else{
            res.redirect('/notes/error');
        }
});

/////////////////////
//Show Routes
/////////////////////
router.get('/view/:indexOf', function(req, res){
    if(req.session){
    if (req.session.login === true){
        Notes.findById(req.params.indexOf, (err, foundData)=>{
            res.render('./notes/show.ejs', {
                data:foundData
            });
        });}
        else {res.redirect('/notes/error')}}
            else{
                res.redirect('/notes/error');
            }
    });

/////////////////////
//Delete Route
/////////////////////
router.get('/delete/:indexOf', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    Notes.findByIdAndRemove(req.params.indexOf, (err, data)=>{
        res.redirect('/notes/');
    });}
    else {res.redirect('/notes/error')}}
        else{
            res.redirect('/notes/error');
        }
});

/////////////////////
//Update Routes
/////////////////////
router.get('/edit/:indexOf', (req, res)=>{
    if(req.session){
    if (req.session.login === true){
    Notes.findById(req.params.indexOf, (err, foundData)=>{
        console.log(foundData, err)
        res.render(
    		'./notes/edit.ejs',
    		{
    			data: foundData

    		}
    	);
    });}
    else {res.redirect('/notes/error')}}
        else{
            res.redirect('/notes/error');
        }
});

router.put('/edit/:indexOf', (req, res) => {
    if(req.session){
    if (req.session.login === true){
    req.body.username = req.session.user;
    console.log(req.body)
    Notes.findByIdAndUpdate(req.params.indexOf, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/notes/');
    });}
    else {res.redirect('/notes/error')}}
        else{
            res.redirect('/notes/error');
        }
});
