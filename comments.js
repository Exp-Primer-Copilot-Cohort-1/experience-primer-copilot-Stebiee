// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Set up the server
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Get the comments from the JSON file
app.get('/comments', function(req, res) {
    console.log('GET comments');
    fs.readFile(__dirname + '/public/data/comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// Post the comments to the JSON file
app.post('/comments', function(req, res) {
    console.log('POST comments');
    var comments = JSON.parse(fs.readFileSync(__dirname + '/public/data/comments.json', 'utf8'));
    comments.push(req.body);
    fs.writeFile(__dirname + '/public/data/comments.json', JSON.stringify(comments, null, 4), function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comments));
});

// Start the server
app.listen(app.get('port'), function() {
    console.log('Server started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});