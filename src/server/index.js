require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;


const Immutable = require('immutable');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));

// your API calls
const apiKey = process.env.API_KEY;


// Fetching rover photos from the Mars api using dynamic router


app.get('/rovers/:rover', async (req, res) => {
    const rover = req.params.rover;
    console.log(req.params);
    try {
        let image = await fetch (`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${apiKey}`)
     
            .then((res) => res.json());  res.send({image});
            
    } catch (error) {console.log('error:', error); }
});


// fetching rover info on the selected rover from the Mars api, preserving the Curiosity rover as the default if none of the others are selected

app.get('/manifests/:chosenRover', async (req, res) => {
    
    const chosenRover = req.params.chosenRover;
    console.log(req.params);  
    try {
        let data = await fetch (`https://api.nasa.gov/mars-photos/api/v1/manifests/${chosenRover}?api_key=${apiKey}`)
    
            .then((res) => res.json());  res.send({data}); 
                
    } catch (error) {console.log('error:', error); }    
            
});    






app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`

        ).then((res) => res.json());
        res.send({ image });
    } catch (err) {
        console.log('error:', err);
    }
});

app.listen(port, () => console.log(`Mars Rover Dashboard app listening on port ${port}!`));
