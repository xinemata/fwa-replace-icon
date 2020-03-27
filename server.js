// server.js
// where your node app starts

// init project
var express = require('express');
const Datastore = require('nedb');

var app = express();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('views'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
// var listener = app.listen(process.env.PORT, function() {
//   console.log('Hello World');
//   console.log('Your app is listening on port ' + listener.address().port);
// });
