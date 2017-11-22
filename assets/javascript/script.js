$(document).ready(function() {

// Initialize Firebase
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

  $("#player-button").on("click", function(event) {

    event.preventDefault();

    let player = $("#player-name").val().trim();
    console.log(player);

    database.ref().push({ player: player, dateAdded: firebase.database.ServerValue.TIMESTAMP });

    });

    database.ref().on("child_added", function(snapshot) {
      console.log(snapshot.val());

      $("#player-1-box").text(snapshot.val().player);

    }, function(errorObject) {
      console.log("Errors: " + errorsObject.code);
    });

});
