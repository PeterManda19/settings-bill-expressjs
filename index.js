import express from 'express';
import { engine } from 'express-handlebars';
import SettingsBill from '../settings-bill.js';

// const app = express();
// const SettingsBill = SettingsBill();

// Set up Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Set the 'main' layout as the default layout
app.set('views', './views');
app.set('view options', { layout: 'main' });

// Serve static resources from the 'public' folder
app.use(express.static('public'));

// Instead of body-parser, use inbuilt express.json() and express.urlencoded()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET route '/'
app.get('/', function(req, res){
  res.render('index', {
    settings: SettingsBill.getSettings()
  });
});

// POST route '/settings'
app.post('/settings', function(req, res){
  console.log(req.body);

  SettingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel
  });
  console.log(SettingsBill.getSettings());

  res.redirect('/');
});

const PORT = process.env.PORT || 3011;

app.listen(3011, function(){
  console.log("App started at port:", PORT)
});
