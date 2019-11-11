# EveVol - Event Volunteers Application
## By Alex Merced
### [LIVE PROJECT](https://shrouded-beach-63520.herokuapp.com/)
### [Portfolio Website](https://www.AlexMercedCoder.com)
---
**SUMMARY** :
A full stack CRUD app for keeping track of events and volunteers staffed at events.
---
## Resources Used

- jquery
- jquery UI
- Google Fonts
- Axios
- MongoDB
- ejs
- Express
- MustardUI Css Framework
- Express sessions
- Bcrypt

## User Story

As user I can track events I'm planning along with volunteers and have a publicly shareable page that I can share with event details and assigned volunteers.

As a User I can takes notes which I can refer to later to assist in event planning.

## Overview of Projects

Models:

Users - Everyone can create a user account and login and have data of their own.

Events - Keep track of events and assign volunteers to them. The show page for events is the only publicly accessible one.

Volunteers - Add volunteers to your roster so you can keep track of contact info and assign them to events.

Notes - Keep track of notes.

Views:

Events, Volunteers and Notes can all be created, edited and deleted.

## Unique User data

How did I achieve unique user data? Below I'll explain.

Step 1 - persistent username

When someone logs it the username is submitted is part of the req.body object then disappears after the post request completes and the session is initiated. While I already stored a Boolean for login status in session I also store the username in session so it's available for use as long as their logged in.

Step 2 - Username in Models

Every model includes username as a field even though it isn't part of the form the user submits. After a user creates an object (event/volunteer) before submitting the req.body object to create a new document the username from the session object is added to the req.body. This allows me to make sure every document is identified by the user that created it.

Step 3 - Username queries in the show page

Every show route queries the username based on the session object when pulling data so only that users data shows.

## Assigning Volunteers

When you go to assign volunteers it lists all the volunteers that user has listed to their account which a checkbox which a inpux name property equal to the volunteer name.

On submission an array is created and a for loop goes through each req.property property and if the value is "on" pushes the key into an array (since the key is the name, it's pushing the name of the volunteer into the array). I also generate an array of all keys before this for loop starts making it easier to push the keys when necessary.

The event model has a volunteer property that takes an array which is where I insert the array of names when I update the item using find one and update as the post endpoint uses the events ID as param so this allows me to store the event id in the req.params object to insert the array into the right event.

## Other Comments


<!-- Image Tag: ![alt text](image.jpg) -->
<!-- Link Tag: [title](https://www.example.com) -->
<!-- https://www.markdownguide.org/cheat-sheet/ -->
