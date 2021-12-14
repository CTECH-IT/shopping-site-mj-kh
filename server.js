const express = require('express');
const fs = require('fs');
const jsonLoc = './json.json';
const jsonData = require(jsonLoc);
const app = express();
const port = 3000;

app.use(express.static('public'));

/*
fetch("/api/v1/people?type=all") await the response
then with the response .json() await
use data how you please
*/

/*

    const res = await fetch("api/updatePerson?id="+personToUpdate, {
        method: 'POST',
        headers: {
            updatedperson: JSON.stringify(all[personToUpdate])
        } 
    })

    https://www.sitepoint.com/get-url-parameters-with-javascript/
    
*/
app.post('/api/removeID', (req, res) => {
    const key = req.query.id;
    delete jsonData[key];
    fs.writeFile(jsonLoc, JSON.stringify(jsonData), function writeJSON(err) {
        console.log('Updating json file.');
        if (err) return console.log('failed\n' + err);
        console.log('json file updated successfully');
        res.sendStatus(200);
    });
});
app.get('/api/get', (req, res) => {
    res.send(jsonData);
});
app.post('/api/updateID', (req, res) => {
    const key = req.query.id;
    const value = req.headers.json;
    if (!key || !value) return res.sendStatus(400);
    jsonData[key] = JSON.parse(value);
    fs.writeFile(jsonLoc, JSON.stringify(jsonData), function writeJSON(err) {
        console.log('Updating json file.');
        if (err) return console.log('failed\n' + err);
        console.log('json file updated successfully');
        res.sendStatus(200);
    });
});

app.listen(port);