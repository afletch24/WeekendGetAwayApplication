$(function(){
    var btnValue;
    $(document).on('click','.clickBtn',function(){
        btnValue=$(this).attr('value');
       console.log(btnValue);
       event.preventDefault();
        });
   
   $("#submit").click(function(){
       //This is the two arrays of Places and the Airport codes for each item of the Array
       //!!!!!IMPORTANT When ever you are adding a city please add it at the end of the "placeArray" array and the airport code at the end of the "placeAirCode" array" !!!!IMPORTANT
       //!!!!!IMPORTANT and the two array lenght must be same length. Also, the index of the citys and Airport codes must be same.!!!!IMPORTANT
    var placeArray=["Denver","Houston","Chicago","Seattle","Miami","New Orleans","San Francisco","New Jersey","Tampa","Madison","Laguna Beach","Las Vegas"];
    var placeAirCode=["DEN","IAH","ORD","SEA","MIA","MYS","SFO","WWD","TPA","MSN","SNA","LAS"];
    console.log(placeAirCode.length);
    console.log(placeArray.length);
       //This is the two arrays of Places and the Airport codes for each item of the Array
    var arrCount=0;
    var newPlaceAirArray=[];
    for (var i=0; i<placeArray.length; i++){
      
        var URL="https://api.openweathermap.org/data/2.5/forecast/daily?q="+placeArray[i]+"&cnt=7&appid=fc5c98c81e9a7e1de7cf5a7cd3377b52&units=imperial";
        $.ajax({ 
        url:URL,
        method:'GET'

         }).done(function(data1){
            var dataArr=data1.list;
        for(var z=0; z<dataArr.length; z++){
            var convertDate;
            
            if( moment.unix(dataArr[z].dt).format("ddd")==="Sun" || moment.unix(dataArr[z].dt).format("ddd")=="Sat"  ){
                
                //console.log(dataArr[z].dt);
               if(dataArr[z].weather[0].main === btnValue && btnValue !== undefined){
                // console.log(dataArr[z].weather[0].main);
                 console.log(data1.city.name);
                // console.log(moment.unix(dataArr[z].dt).format("ddd"));
                // console.log(dataArr[z]);
                newPlaceAirArray.push(placeAirCode[placeArray.indexOf(data1.city.name)]);
               
                
                
                }
            }
            
            //console.log(newPlaceAirArray); 
            
           }
           console.log(newPlaceAirArray);
           
        //console.log(btnValue);
       
        });
        
        }
      event.preventDefault(); 
    }); 
});