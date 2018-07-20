
const express = require('express');
const app = express();


  
  app.get('/api/v1/autocomplete', function (req, res) { 


    const googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyB3qahqCuPZlkmD7s1SyWlGuWdCPGGEmo0',
        Promise: Promise
      });
    var data = req.query.input;
    googleMapsClient.placesAutoComplete({input: data, sessiontoken: "1234567890"})
    .asPromise()
    .then((response) => {
        var o ={};
        var key = 'data';
        o[key] = [];
        for (var i = 0; i < response.json.predictions.length; i++) {
            //res.write(data[i].text);
            //str += "{ "+ i +" : " + data[i].text +" } ";
            var str ={
                        userMessage : "OK",
                        internalMessage: "Eyerything is working",
                        code: 200,
                        text : response.json.predictions[i]
                } 	
            //res.write(JSON.stringify({ 1 : data[i].text }, null, 3));
            o[key].push(str);

        }
        var d = JSON.stringify(o);
        res.write(d);
		res.end();
    })
    .catch((err) => {
      console.log(err);
    });
    
})

app.get('/api/v1/directions', function (req, res) { 

    var origin = req.query.from;
    var destination = req.query.to;

    const googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyB3qahqCuPZlkmD7s1SyWlGuWdCPGGEmo0',
        Promise: Promise
      });

    console.log(origin);
    console.log(destination);
    googleMapsClient.directions({origin: origin, destination: destination})
    .asPromise()
    .then((response) => {
        var o ={};
        var key = 'data';
        o[key] = [];
        /*for (var i = 0; i< response.json.predictions.length ; i++) {
            //res.write(data[i].text);
            //str += "{ "+ i +" : " + data[i].text +" } ";
            var str ={
                        userMessage : "OK",
                        internalMessage: "Eyerything is working",
                        code: 200,
                        text : response.json.predictions[i]
                } 	
            //res.write(JSON.stringify({ 1 : data[i].text }, null, 3));
            o[key].push(str);

        }*/

        var str ={
            userMessage : "OK",
            internalMessage: "Eyerything is working",
            code: 200,
            text : response.json
    }
    o[key].push(str);
        var d = JSON.stringify(o);
        res.write(d);
		res.end();
    })
    .catch((err) => {
      console.log(err);
    });
    
})
app.get('*', function(req, res){

	res.setHeader('Content-Type', 'application/json');
					var error= {
						"errors": [
							   {
								"userMessage": "Not found – There is no resource behind the URI",
								"internalMessage": "No resource found in the database",
								"code": 404,
								"more info": "http://localhost/gmaps/home.html"
							   }
							  ]
							
					}
					res.write(JSON.stringify(error));
				 res.end();
	
  })
app.listen(8080, () => console.log('App listening on port 8080!'))