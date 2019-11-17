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
var tRemainder = diffTime % tfrequency;
var tMinutesTillTrain = tfrequency - tRemainder;
var nextTrain = moment().add(tMinutesTillTrain, "minutes");

$("button").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    var name = $("#train-name").val().trim();
    var destination = $("#train-des").val().trim();
    var firstTime = $("#train-first").val().trim();
    var tfrequency = $("#train-min").val().trim();

    // Code for "Setting values in the database"
    database.ref().set({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        // tMinutesTillTrain: tMinutesTillTrain
        
    });
    console.log(name, destination, firstTime, frequency);


database.ref().on("value", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTime);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().tMinutesTillTrain);
    console.log(snapshot.val().nextTrain);
    // Change the HTML to reflect
    // $("#name-display").text(snapshot.val().name);
    // $("#des-display").text(snapshot.val().destination);
    // $("#first-display").text(snapshot.val().firstTime);
    // $("#freq-display").text(snapshot.val().frequency);
    // $("#next-display").text(snapshot.val().nextTrain);
    // $("#min-display").text(snapshot.val().tMinutesTillTrain);
    // $("#train-section").prepend(name, destination, firstTime, frequency, tMinutesTillTrain, nextTrain);
    $("#name-display").text(name);
    $("#des-display").text(destination);
    $("#first-display").text(firstTime);
    $("#freq-display").text(frequency);
    $("#next-display").text(nextTrain);
    $("#min-display").text(tMinutesTillTrain);
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
});
database.ref();