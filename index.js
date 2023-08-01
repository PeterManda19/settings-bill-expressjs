import express from 'express';
import { engine } from 'express-handlebars';

let app = express();

// Set up Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Set the 'main' layout as the default layout
app.set('views', './views');
app.set('view options', { layout: 'main' });

// Serve static resources from the 'public' folder
app.use(express.static('public'));

// GET route '/'
app.get('/', function(req, res){
  res.render('index')
});

// POST route '/settings'
app.post('/settings', function(req, res){
  res.send('Settings Bill App')
});

// POST route '/action'
app.post('/action', function(req, res){
  res.send('Settings Bill App')
});

// GET route '/actions'
app.post('/actions', function(req, res){
  res.send('Settings Bill App')
});

// GET route '/actions/:type'
app.post('/actiions/:type  ', function(req, res){
  res.send('Settings Bill App')
});

const PORT = process.env.PORT || 3011;

app.listen(3011, function(){
  console.log("App started at port:", PORT)
});
