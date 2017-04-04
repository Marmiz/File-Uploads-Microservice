var express = require('express');
var app =express();


// set port
app.set('port', (process.env.PORT || 8000));

app.get('/', function(req, res){
  res.send('Hello World');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

// handles errors
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).json({ error: '404 - Not Found' });
});

// server functionality
app.listen(app.get('port'), function () {
  console.log(`Server listening on port ${app.get('port')}`);
});
