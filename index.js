import express from 'express';
import { engine } from 'express-handlebars';
import SettingsBill from './settings-bill.js';
import bodyParser from 'body-parser';
import { fileURLToPath} from 'url';
import path from 'path'; 
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
var settingsBill = SettingsBill();

// Set up Handlebars view engine
app.engine('handlebars', engine({
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');

// Set the 'main' layout as the default layout
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: 'main' });

// Serve static resources from the 'public' folder
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// GET route '/'
app.get('/', function(req, res){
  res.render('index', {
    settings: settingsBill.getSettings()
  });
});

// POST route '/settings'
app.post('/settings', function(req, res){
  console.log(req.body);

  settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel
  });
  console.log(settingsBill.getSettings());

  res.redirect('/');
});

const PORT = process.env.PORT || 3011;

app.listen(3011, function(){
  console.log("App started at port:", PORT)
});
