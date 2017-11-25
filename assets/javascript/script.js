// when player one name is input, have that name printed in the player one box
// when player one name is input, have player 2 box print that we are waiting on player 2
// when player two name in input, print player 2 name in player 2 box
// when player two name is input, provide the players with rock paper or Scissors
//

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

// variable for database
let database = firebase.database();

// variables for connections
    let ourConnectionsRef = database.ref("/connections");
    let googleConnectionsRef = database.ref(".info/connected");
    let connection;

    googleConnectionsRef.on("value", function(snapshot) {
      console.log("snapshot.val googleCon", snapshot.val());
      if (snapshot.val()) {
        connection = ourConnectionsRef.push(true);
        connection.onDisconnect().remove();
        $("#player-1-box").text("Please enter your name");
      }
    });

    ourConnectionsRef.on("value", function(snapshot) {
      console.log("snapshot.numChildren", snapshot.numChildren());
    });

  $("#player-button").on("click", function(event) {

    event.preventDefault();

    let player = $("#player-name").val().trim();
    console.log("player", player);

    database.ref().push({ player: player, dateAdded: firebase.database.ServerValue.TIMESTAMP });

    if (database.player === "") {
      $("#player-1-box").text(database.player);
    } else {
      $("#player-2-box").text(database.player);
    }

  });

});
