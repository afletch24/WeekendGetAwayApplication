$(document).ready(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBqWvvdNun4O5cQVwHJQ4lnghY8u1d3c8w",
        authDomain: "project-1-cf436.firebaseapp.com",
        databaseURL: "https://project-1-cf436.firebaseio.com",
        projectId: "project-1-cf436",
        storageBucket: "project-1-cf436.appspot.com",
        messagingSenderId: "1095123216815"
    };
    
    firebase.initializeApp(config);
    var database = firebase.database();
    


    $("#submitButton").on("click", function(){


        var firstName = $("#inputFirstName").val().trim();
        var lastName = $("#inputLastName").val().trim();
        var email = $("#inputEmail").val().trim();

        newUser = {
            FirstName: firstName,
            LastName:  lastName,
            Email: email,
        };

        database.ref().push(newUser);

       

        $("#inputFirstName").val("");
        $("#inputLastName").val("");
        $("#inputEmail").val("");

    });

});
