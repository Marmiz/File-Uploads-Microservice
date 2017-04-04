/*jshint esversion: 6 */
var express = require('express');
var app =express();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });


// set port
app.set('port', (process.env.PORT || 8000));


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index.html');
});

//GET ajax for testing
app.get('/skills', function(req, res){
  res.send(['Vue', 'Axios']);
});

// POST method route
app.post('/uploads', upload.single('file'), function (req, res, next) {
  console.log(req.file);
  res.json({'size': req.file.size});

});

// handles errors
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).json({ error: '404 - Not Found' });
});

// server functionality
app.listen(app.get('port'), function () {
  console.log(`Server listening on port ${app.get('port')}`);
});
