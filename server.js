/*jshint esversion: 6 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var stylus = require('stylus');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

var fs = require('fs');


// set port
app.set('port', (process.env.PORT || 8000));

app.use(stylus.middleware({
  src: __dirname + '/style',
  dest: __dirname + '/public',
  debug: true,
}));
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.render('index.html');
});

//GET ajax for testing
app.get('/skills', function(req, res){
  res.send(['Vue', 'Axios']);
});

// GET uploaded -- send back list of file in uploaded folder
app.get('/uploaded',function(req,res){
  var storedFiles = [];
  fs.readdir('uploads/', function(err, files){
    files.forEach(function(file){
      let path = 'uploads/'+file;
      let size = Buffer.byteLength(fs.readFileSync(path));
      let obj = {'name': file, 'size': size};
      storedFiles.push(obj);
    });
    res.send(storedFiles);
  });
});

// POST method route
app.post('/uploads', upload.single('file'), function (req, res, next) {
  if(req.file){
    console.log(req.file.path);
    res.json({'size': req.file.size,
              'name': req.file.originalname,
              });
  }

});

// DELETE from uploads
app.post('/delete',function (req, res, next){
  let path = 'uploads/'+req.body.delete;
  fs.unlink(path, (err) => {
  if (err) throw err;
  res.json({'deleted': req.body.delete});
});

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
