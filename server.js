var cors    =  require('cors');
var express = require('express');
var multer  = require('multer');
var fs      = require('fs');
const path  = require('path');

const serveIndex = require('serve-index')

var app = express();

app.use(cors({ origin: true }));

app.use('/uploads', express.static('uploads'), serveIndex('uploads', {'icons': true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});



const upload = multer({ storage });

app.post('/upload', upload.single('file'), function(req, res) {
  const file = req.file;

  console.log(file);

  res.sendStatus(200);
});
app.listen(3000, () => {
    console.log(`Listening on port 3000, and to wind of changes!`);
  });
