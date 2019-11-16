var firebaseConfig = {
    apiKey: "AIzaSyB6oAdC54xf3RvTK_9ICjeDWax-dSsTvGU",
    authDomain: "traintimeapp-34e2f.firebaseapp.com",
    databaseURL: "https://traintimeapp-34e2f.firebaseio.com",
    projectId: "traintimeapp-34e2f",
    storageBucket: "traintimeapp-34e2f.appspot.com",
    messagingSenderId: "65007266016",
    appId: "1:65007266016:web:9fbc4243e1f34a4025c885"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var name = "";
var destination = "";
var firstTime = "";
var frequency = "";
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
var currentTime = moment();
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
var tRemainder = diffTime % frequency;
var tMinutesTillTrain = frequency - tRemainder;
var nextTrain = moment().add(tMinutesTillTrain, "minutes");

$("button").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    var name = $("#train-name").val().trim();
    var destination = $("#train-des").val().trim();
    var firstTime = $("#train-first").val().trim();
    var frequency = $("#train-min").val().trim();

    // Code for "Setting values in the database"
    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
        
        
        
    });
    console.log(name, destination, firstTime, frequency);
});

database.ref().on("value", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTime);
    console.log(snapshot.val().frequency);

    // Change the HTML to reflect
    $("#name-display").html(snapshot.val().name);
    $("#des-display").html(snapshot.val().destination);
    $("#first-display").html(snapshot.val().firstTime);
    $("#freq-display").html(snapshot.val().frequency);
    $("#next-display").html(snapshot.val().nextTrain);
    $("#min-display").html(snapshot.val().tRemainder);
    $("tbody").prepend(name, destination, firstTime, frequency);
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
database.ref();