
  $(document).ready(function(){

  var config = {
    apiKey: "AIzaSyA6GCKTT5u0sK9XqfEh0QO_uUWV6-YfvBw",
    authDomain: "trainschedule-f42d1.firebaseapp.com",
    databaseURL: "https://trainschedule-f42d1.firebaseio.com",
    projectId: "trainschedule-f42d1",
    storageBucket: "trainschedule-f42d1.appspot.com",
    messagingSenderId: "1099058920669"
    };

  firebase.initializeApp(config);

    var database = firebase.database();

    var name = "";
    var destination = "";
    var firsTrainTime = "";
    var frequency = "";

    $("#add-train").on("click", function(){
      event.preventDefault();

      var name = $('#name-input').val().trim();
      var destination = $('#destination-input').val().trim();
      var firstTrainTime = $('#firstTrainTime-input').val().trim();
      var frequency = $('#frequency-input').val().trim();

      database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        timeAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });


    database.ref().on("child_added", function(childSnapshot){
  
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var firstTrainTime = childSnapshot.val().firstTrainTime;
        var frequency = childSnapshot.val().frequency;

        console.log("name: " + name);
        console.log("destination: " + destination);
        console.log("firstTrainTime: " + firstTrainTime);
        console.log("Frequency: " + frequency);


    var frequency = parseInt(frequency);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment().format('HH:mm'));
  
    var dConverted = moment(firstTrainTime, 'HH:mm').subtract(1, 'years');
    console.log("DATE CONVERTED: " + dConverted);
  
    var trainTime = moment(dConverted).format('HH:mm');
    console.log("TRAIN TIME : " + trainTime);
  
   
    var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
    var tDifference = moment().diff(moment(tConverted), 'minutes');
    console.log("DIFFERENCE IN TIME: " + tDifference);
  
    var tRemainder = tDifference % frequency;
    console.log("TIME REMAINING: " + tRemainder);
  
    var minsAway = frequency - tRemainder;
    console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);
  
    var nextTrain = moment().add(minsAway, 'minutes');
    console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));
  
    $('#currentTime').text(currentTime);
    $('.train-schedule').append(
    "<tr><td id='nameDisplay'>" + name +
    "</td><td id='destination-display'>" + destination +
    "</td><td id='frequency-Display'>" + frequency +
    "</td><td id='firstTrainTime-Display'>" + moment(nextTrain).format("HH:mm") +
    "</td><td id='away-Display'>" + minsAway  + ' minutes until arrival' + "</td></tr>");
 },

  function(errorObject){
    console.log("Read failed: " + errorObject.code)
  });
});