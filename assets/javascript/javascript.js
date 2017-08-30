var sendRequest = function(){
    var FlightRequest = {
            "request": {
                "passengers": { 
                    "adultCount": "1"
                },
                "slice": [  
                    {
                        "origin": "SFO",
                        "destination": "LAX",
                        "date": "2017-09-19"
                    }
                ],
                "solutions": "1"
            }
    };

    $.ajax({
        method: "POST",
        url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAMl5As1sJ8De-76Dt8QgvlIursOApZ38o",
        contentType: 'application/json', 
        dataType: 'json',
        data: JSON.stringify(FlightRequest)
        //  success: function (data) {
        //   console.log(JSON.stringify(data));
        // },
        //   error: function(){
        //    alert("Access to Google QPX Failed.");
        //  }
    }).done(function(data1){
        console.log(data1);
    });
}


$(document).ready(function(){
    $("#send").click(function(){sendRequest();});
});