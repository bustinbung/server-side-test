//init and load node packages
const express = require('express');
const DataStore = require('nedb');
const app = express();

//start app
app.listen(3000,  () => console.log('listening on port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

//int or load database
const database = new DataStore('database.db');
database.loadDatabase();

//code to be called on POST request
app.post('/api', (req, res) => {
    //get body of the request
    const data = req.body;

    //create and add timestamp to data
    const timestamp = new Date().getTime();
    data.timestamp = timestamp;

    //add data to database
    database.insert(data);

    //respond with success
    res.json({status: 'success'});
});

//code to be called on GET request
app.get('/api', (req, res) => {

    //get all data
    database.find({}, (err, data) => {
    //if nedb throws error, return
    if (err) {
        console.log('error');
        res.end();
        return;
    }
    
    //return data to client
    res.json(data);
    });
});