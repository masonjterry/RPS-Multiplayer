$(document).ready(function() {

// Initialize Firebases
let config = {
  apiKey: "AIzaSyD6gCxB9q8njNgaM6avMMpfo1No2VU5cMI",
  authDomain: "rockpaperscissors-5a354.firebaseapp.com",
  databaseURL: "https://rockpaperscissors-5a354.firebaseio.com",
  projectId: "rockpaperscissors-5a354",
  storageBucket: "",
  messagingSenderId: "643534259380"
};
firebase.initializeApp(config);

let database = firebase.database();

    let ourConnectionsRef = database.ref("/connections");
    let googleConnectionsRef = database.ref(".info/connected");
    let connection;

    googleConnectionsRef.on("value", function(snapshot) {
      if (snapshot.val()) {
        connection = ourConnectionsRef.push(true);
        if (connection.onDisconnect().remove()) {
          $("#player-1-box").text("Player 1 please enter your name");
          $("#player-2-box").text("Player 2 please enter your name");
        }
      }
    });

    ourConnectionsRef.on("value", function(snapshot) {

    });

  $("#player-button").on("click", function(event) {

    let playerInfo = {
      player: $("#player-name").val().trim(),
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    $("#player-name").val("");

    database.ref().push(playerInfo);

    });

    let addPlayer = false;

    let picks = $("<button id=\"rock-button\" data-name=\"rock\">Rock</button><button id=\"paper-button\" data-name=\"paper\">Paper</button><button id=\"scissors-button\" data-name=\"scissors\">Scissors</button>");

    database.ref().on("child_added", function(snapshot) {

      let playerOne;
      let playerTwo;

      if (addPlayer === false) {
        playerOne = snapshot.val().player;
        $("#player-1-box").text(playerOne);
        addPlayer = true;
      } else {
        playerTwo = snapshot.val().player
        $("#player-2-box").text(playerTwo);
        addPlayer = false;
        $("#player-1-box").append(picks);
      }

  });

  $("button").on("click", function(event) {

    console.log("event", event);

    console.log("I was clicked");

  });
});
