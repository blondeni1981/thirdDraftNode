let taskArray = [];
let selectedPriority = "not selected";

// define a constructor to create player objects
var TaskObject = function (pTask, pDate, pPriority, pDescription, pLocation) {
  this.Task = pTask;
  this.Date = pDate;
  this.Priority = pPriority;  // action  comedy  drama  horrow scifi  musical  western
  this.Description = pDescription;
  this.Location = pLocation;
}

taskArray.push(new TaskObject("Clean", 04/01/2020, "****", "Bathroom, Kitchen ", "House"));


document.addEventListener("DOMContentLoaded", function () {

  let newMovie = new TaskObject(document.getElementById("task").value, document.getElementById("date").value,
       selectedPriority, document.getElementById("description").value,
       document.getElementById("location").value);
       addNewTask(newtask); // now post new movie object to node server
  
  

  $(document).bind("change", "#select-task", function (event, ui) {
    selectedPriority = $('#select-task').val();
  });

  document.getElementById("buttonSortTask").addEventListener("click", function () {
    taskArray = taskArray.sort(compareTask);
    createList();
  
  });
  document.getElementById("buttonSortPriority").addEventListener("click", function () {
    TaskArray = TaskArray.sort(comparePriority);
    createList();

  });
  ////////may change
  // delete button  Had trouble with spaces in titles, its an easy thing to fix
  // I just didn't get the time
  document.getElementById("buttonClear").addEventListener("click", function () {
    let deleteTask = document.getElementById("deleteTask").value;
    // doing the call to the server right here
    fetch('users/deleteTask/' + deleteTask , {
    // users/deleteMovie/Moonstruck   for example, this is what the URL looks like sent over the network
        method: 'DELETE'
    })  
    // now wait for 1st promise, saying server was happy with request or not
    .then(responsePromise1 => responsePromise1.text()) // ask for 2nd promise when server is node
    .then(responsePromise2 =>  console.log(responsePromise2), document.location.href = "index.html#refreshPage")  // wait for data from server to be valid
    // force jump off of same page to refresh the data after delete
    .catch(function (err) {
        console.log(err);
        alert(err);
       });

   
  });

$(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
  FillArrayFromServer(); 
});

$(document).on("pagebeforeshow", "#refreshPage", function (event) {   
  document.location.href = "index.html#ListAll";
});

  
  document.getElementById("buttonClear").addEventListener("click", function () {
    document.getElementById("task").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
    document.getElementById("location").value = "";
  });
  
$(document).on("pagebeforeshow", "#Load", function (event) {   // have to use jQuery 
  document.getElementById("task").value = "";
  document.getElementById("date").value = "";
  document.getElementById("description").value = "";
  document.getElementById("location").value = "";
  });
  $(document).on("pagebeforeshow", "#detailPage", function (event) {   // have to use jQuery 
    let localTask = document.getElementById("IDparmHere").innerHTML;
    for(let i=0; i < taskArray.length; i++) {   
        if(taskArray[i].Task = localTask){
            document.getElementById("oneTask").innerHTML =  movieArray[i].Task;
            document.getElementById("oneDate").innerHTML =  movieArray[i].Date;
            document.getElementById("onePriority").innerHTML =  movieArray[i].Priority;
            document.getElementById("oneDescription").innerHTML =   movieArray[i].Description;
            document.getElementById("oneLocation").innerHTML =   movieArray[i].Location;
        }  
    }
//$(document).on("pagebeforeshow", "#page3", function (event) {   // have to use jQuery 
  //let localID =  document.getElementById("IDparmHere").innerHTML;
  //document.getElementById("oneTask").innerHTML = "Your Task:   " + taskArray[localID-1].Task;
  //document.getElementById("oneDate").innerHTML = "Date:  " + taskArray[localID - 1].Date;
  //document.getElementById("onePriority").innerHTML = "Priority:   " + taskArray[localID - 1].Priority;
  //document.getElementById("oneDescription").innerHTML = "Description: " + taskArray[localID - 1].Description;
  //document.getElementById("oneLocation").innerHTML = "Location:   " + taskArray[localID - 1].Location;
 });

});

function createList()
{
  // clear prior data
  var divUserlist = document.getElementById("divTask");
  while (divTask.firstChild) {    // remove any old data so don't get duplicates
  divTask.removeChild(divTask.firstChild);
  };

  var ul = document.createElement('ul');  
  console.log(taskArray);
  taskArray.forEach(function (element,) {   // use handy array forEach method
    var li = document.createElement('li');
    li.innerHTML = "<a data-transition='pop' class='oneTask' data-parm=" + element.ID + "  href='#page3'>Get Details </a> " + element.ID + ":  " + element.Task + "  " + element.Priority;
    ul.appendChild(li);
  });
  divTask.appendChild(ul)

    //set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
    var classname = document.getElementsByClassName("oneTask");
    Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            //do something here with parameter on  pickbet page
            document.getElementById("IDparmHere").innerHTML = parm;
            document.location.href = "index.html#page3";
        });
    });
   
};
function compareTask(a, b) {
  // Use toUpperCase() to ignore character casing
  const taskA = a.Task.toUpperCase();
  const taskB = b.Task.toUpperCase();

  let comparison = 0;
  if (taskA > taskB) {
    comparison = 1;
  } else if (taskA < taskB) {
    comparison = -1;
  }
  return comparison;
}
  
function comparePriority(a, b) {
  // Use toUpperCase() to ignore character casing
  const priorityA = a.Priority.toUpperCase();
  const priorityB = b.Priority.toUpperCase();

  let comparison = 0;
  if (priorityA > priorityB) {
    comparison = 1;
  } else if (priorityA < priorityB) {
    comparison = -1;
  }
  return comparison;
}





// code to exchange data with node server

function FillArrayFromServer(){
  // using fetch call to communicate with node server to get all data
  fetch('/users/taskList')
  .then(function (response) {  // wait for reply
      return response.json();
  })
  .then(function (serverData) {     // now wait for data to be complete
  // use our server data    
  taskArray.length = 0;  // clear array
  taskArray = serverData;
  createList();  // placing this here will make it wait for data from server
  })
  .catch(function (err) {
   console.log(err);
  });
};


// using fetch to push an object up to server
function addNewTask(newTask){
 
  // post body data is our movie object
  
  // create request object
  const request = new Request('/users/taskList', {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
  });
  
  // pass that request object we just created into the fetch()
  fetch(request)
      // wait for initial server response of "200" success
      .then(resPromise1 => resPromise1.json())    // the .json sets up 2nd promise
      // wait for the .json promise, which is when the data is back
      .then(resPromise2 => document.location.href = "#ListAll" )
      .catch(function (err) {
          console.log(err);
      });
  
}; // end of addNewUser
  
/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  }
}