$(function(){
    //-------------------------global Vrialbles------------------------------//    
    var btnValue;
    var finalAirCodeArray; 
    var testArray=[];  
    var originAirportVal; 
    //-------------------------global Vrialbles------------------------------//
    
    //-----------------button click to get the Weather Value--------------------------//   
    $(document).on('click','.clickBtn',function(){
            btnValue=$(this).attr('value');
           console.log(btnValue);
           event.preventDefault();
            });
    //-----------------button click to get the Weather Value--------------------------//   
    
       
    //--------------------Submit button to Run the function--------------------------//   
    $("#submit").click(function(event){
        
    //--------This is the Value from the Input Function------------//
        originAirportVal=$("#originAirportCode").val().trim();
    //--------This is the Value from the Input Function------------//
    
    //---------This is the two arrays of Places and the Airport codes for each item of the Array----------//
    //-----!!!!!IMPORTANT When ever you are adding a city please add it at the end of the "placeArray" array and the airport code at the end of the "placeAirCode" array" !!!!IMPORTANT-------//
    //-----!!!!!IMPORTANT and the two array lenght must be same length. Also, the index of the citys and Airport codes must be same.!!!!IMPORTANT--------//
    
        var placeArray=["Denver","Houston","Chicago","Seattle","Miami","New Orleans","San Francisco","New Jersey","Tampa","Madison","Laguna Beach","Las Vegas"];
        var placeAirCode=["DEN","IAH","ORD","SEA","MIA","MYS","SFO","WWD","TPA","MSN","SNA","LAS"];
     
        console.log(placeAirCode.length);
        console.log(placeArray.length);
    
    //-------This is the two arrays of Places and the Airport codes for each item of the Array--------//
    
    //----------if Than to Check if the input Values are right---------------------------------//
        if(placeAirCode.indexOf(originAirportVal) == -1 || originAirportVal.length<3 || originAirportVal.length>3){
           $("#myModal").modal('show');
        }
    //----------if Than to Check if the input Values are right---------------------------------//
    
    //----------if else to do the opposit---------------------------------//     
        else{
      
        
        
        //--------------for loop to go thourgh each placeArray-------------------------//    
        
        for (var i=0; i<placeArray.length; i++){
        //-------------------------------------The for loop will call the Ajax for every palces-----------------------------//
    
        var URL="https://api.openweathermap.org/data/2.5/forecast/daily?q="+placeArray[i]+"&cnt=7&appid=fc5c98c81e9a7e1de7cf5a7cd3377b52&units=imperial";
            $.ajax({ 
            url:URL,
            method:'GET'
    
             }).done(function(data1){
               
            var dataArr=data1.list;
            var newPlaceAirArray=[];
            var count=1;
           
            //-----------------This for loop is going thorugh all the ajax call data------------------------//
             for(var z=0; z<dataArr.length; z++){
                 count++;
                
                //--------------------This if than Statements checks if it is a Saturday or Sunday-----------------------//
    
                if( /*moment.unix(dataArr[z].dt).format("ddd")==="Sun" ||*/ moment.unix(dataArr[z].dt).format("ddd")=="Sat"  ){
                    
                    
                   if(dataArr[z].weather[0].main === btnValue && btnValue !== undefined){
                    
                    newPlaceAirArray.push(placeAirCode[placeArray.indexOf(data1.city.name)]);
    
                    $("#mainSearchCont").fadeOut();
                    $("body").css("background","#d8e7ff");
                    $(".jumbotron").css("color","black");
                    $("#displayStuff").append("<div class='col-md-10 col-md-offset-1 clickGoogle' value="+placeAirCode[placeArray.indexOf(data1.city.name)]+" ><h2>Place : "+data1.city.name+"</h2> <br> <h3> Day : "+moment.unix(dataArr[z].dt).format("dddd")+"</h3></div>");
                    //testArray.push(placeAirCode[placeArray.indexOf(data1.city.name)]);
                   
                    
    
    
    
                    
                    }
                    
                } 
             
    
                
               }//this is the end of the nested loop
          
               
       
             //console.log(finalAirCodeArray);
             
               
            //console.log(btnValue);
            // console.log(newPlaceAirArray);
           
            });
            
            }//this is the first loop
    //--------------for loop to go thourgh each placeArray-------------------------//
        
           
        }// this is end of else if statement 
            
            
            event.preventDefault(); 
        
            
        //----------------------------This is the end of the Click Submit-------------------------------------------------//
        });
    
        $(document).on('click',".clickGoogle", function(){
            $("#displayStuff").empty();
            var originAirportDeparture =  originAirportVal; //determined from user's input on search
            
             var destinationAirportDeparture = $(this).attr("value");
    
             console.log(originAirportDeparture);
             console.log(destinationAirportDeparture);
    
             if(originAirportDeparture === destinationAirportDeparture){
                 $("#displayStuff").empty();
                 $("#displayStuff").html("<div class='col-md-10 col-md-offset-1' ><h1 class='errorDisplay'>You are in the Same Place!!!</div></h1>");
    
             }
    
            var departureDate = moment().weekday(5).format("YYYY-MM-DD");
    
    var returnDate = moment().weekday(7).format("YYYY-MM-DD");
    
    var sendRequest = function(){
        var FlightRequest = {
                "request": {
                    "passengers": {
                        "adultCount": "1"
                },
                "slice": [
                    {
                        "origin": originAirportDeparture, 
                        "destination": destinationAirportDeparture, 
                        "date": departureDate 
                    },
    
                    {
                        "origin": destinationAirportDeparture,
                        "destination": originAirportDeparture,
                        "date": returnDate 
                    }
                ],
                    "maxPrice": "USD1000", // caps the price of tickets returned from the search
                    "solutions": "10" //caps the number of ticket options returned from the search
                }
            };
    
        $.ajax({
            method: "POST",
            url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyByo2ZCuus45CzRcF8ukv322MfEAhg9s-I",
            //Das------AIzaSyByo2ZCuus45CzRcF8ukv322MfEAhg9s-I
            //John------AIzaSyA1K7p4y-7d3r4-Cj_QcAnpZRfnZKWnho0
            //Marina---- AIzaSyAMl5As1sJ8De-76Dt8QgvlIursOApZ38o 
            //Audrey---- AIzaSyBlNRXsFqZ9moDr_NzKgXKygBD3TF_Drn8 
            // Fifth API Key: AIzaSyBRD3kzyFZpZS_cSxFLOvrkKW2GbPm7IXU 
            // Sixth API Key: AIzaSyDZlRw9q19NwOaUzYr--cBNfp22w1dqObA 
            // Seventh API KEy: AIzaSyCbwuPLCkHgw1Sn2G4D0M8HHjE0zJUhzjA
            contentType: 'application/json', 
            dataType: 'json',
            data: JSON.stringify(FlightRequest),
             success: function (data) {
            //   console.log(JSON.stringify(data));
            },
              error: function(){
                  $("#displayStuff").empty();
                  $("#displayStuff").html("<div class='col-md-10 col-md-offset-1' ><h1 class='errorDisplay' >API call has Failed</h1></div>")
            //    alert("Access to Google QPX Failed.");
             }
        }).done(function(data1){
            if(data1["trips"]["tripOption"] === undefined){
                $("#displayStuff").html("<div class='col-md-10 col-md-offset-1' ><h3 class='errorDisplay'> NO Flights Under $1000</h3><div>");
            }
            console.log(data1);
            console.log(data1["trips"]);
            console.log(data1["trips"]["tripOption"]);
            console.log(data1["trips"]["data"].carrier);
            console.log(data1["trips"]["tripOption"][0]["pricing"][0]);
    
            var carrierInfo=data1["trips"]["data"].carrier;
            var tripsInfo=data1["trips"]["tripOption"];
            var carrierCode=[];
            var carrierName=[];
            var indexNo;
    
            for (var i=0; i<carrierInfo.length;i++){
                carrierCode.push(carrierInfo[i].code);
                carrierName.push(carrierInfo[i].name);
            
            }
            console.log(carrierCode);
            console.log(carrierName);
            for (var x=0; x<tripsInfo.length; x++){
                // var fareInfo = tripsInfo[i].pricing["0"].fare;
    
                if(carrierCode.includes(tripsInfo[x].pricing["0"].fare[0].carrier)){
                    indexNo = carrierCode.indexOf(tripsInfo[x].pricing["0"].fare[0].carrier);
                    $("#displayStuff").append("<div class='col-md-10 col-md-offset-1 flightResultCss'><h3> Air Company Name: "+carrierName[indexNo]+" <br>Flight Prices: "+tripsInfo[x].saleTotal+"</h3></div>");
    
                }
               
                
    
    
            }
    
    
    
        });
    }
    
    sendRequest();
    
        });
      
    
    });
    
    