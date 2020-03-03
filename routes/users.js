
var express = require('express');
var router = express.Router();

let serverTaskArray = []; // our "permanent storage" on the web server

// define a constructor to create movie objects
let TaskObject = function (pTask, pDate, pPriority, pDescription, pLocation) {
  this.Task = pTask;
  this.Date = pDate;
  this.Priority = pPriority;  // action  comedy  drama  horrow scifi  musical  western
  this.Description = pDescription;
  this.Location = pLocation;
}

// for testing purposes, its nice to preload some data
taskArray.push(new TaskObject("Clean", 04/01/2020, "****", "Bathroom, Kitchen ", "House"));

/* POST to addMovie */
router.post('/addMovie', function(req, res) {
  console.log(req.body);
  serverTaskArray.push(req.body);
  console.log(serverTaskArray);
  //res.sendStatus(200);
  res.status(200).send(JSON.stringify('success'));
});


/* GET movieList. */
router.get('/movieList', function(req, res) {
  res.json(serverTaskArray);
 });

 /* DELETE to deleteMovie. */
 router.delete('/deleteMovie/:ID', function(req, res) {//id == title. une that for a variable
  let id = req.params.ID;
  id = id.toLowerCase();  // allow user to be careless about capitalization
  console.log('deleting ID: ' + id);
   for(let i=0; i < serverTaskArray.length; i++) {
     if(id == (serverTaskArray[i].Title).toLowerCase()) {
     serverTaskArray.splice(i,1);
     }
   }
   res.status(200).send(JSON.stringify('success'));
});


//  router.???('/userlist', function(req, res) {
//  users.update({name: 'foo'}, {name: 'bar'})



module.exports = router;

