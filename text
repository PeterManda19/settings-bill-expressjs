import express from 'express';
import { engine } from 'express-handlebars';
import SettingsBill from './settings-bill.js';
import bodyParser from 'body-parser';
import { fileURLToPath} from 'url';
import path from 'path'; 
import { dirname } from 'path';
import moment from 'moment'; // Import the moment library

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
    settings: settingsBill.getSettings(),
    totals: settingsBill.totals()
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

// POST route '/action'
app.post('/action', function(req, res){
  //const billType = req.body.billType; // 'call' or 'sms'

  // if (billType === 'call' || billType === 'sms') {
  //   const timestamp = new Date();
  //   const cost = billType === 'call' ? settingsBill.getSettings().callCost : settingsBill.getSettings().smsCost;
    
  //   settingsBill.recordAction({
  //     type: billType,
  //     cost: cost,
  //     timestamp: timestamp
  //   });

  //   res.redirect('/');
  // } else {
  //   res.status(400).send('Invalid bill type');
  // }
  //console.log(req.body.actionType);
  settingsBill.recordAction(req.body.actionType)
  res.redirect('/');
});

// GET route '/actions'
app.get('/actions', function(req, res) {
//   const actions = settingsBill.actions(); // Retrieve all recorded actions
//   let totalCost = 0;

//   // Calculate the total cost of all actions
//   actions.forEach(action => {
//     totalCost += action.cost;
//   });

//   // Render the 'actions' view, passing the actions and total cost to the template
//   res.render('actions', {
//     actions: actions.map(action => ({
//       ...action,
//       timestamp: moment(action.timestamp).fromNow() // Format timestamp using 'fromNow'
//     })),
//     totalCost: totalCost.toFixed(2) // Format total cost to two decimal places
//   });
    res.render('actions', {actions: settingsBill.actions});
});

// GET route '/actions/:type'
app.get('/actions/:actionType', function(req, res) {
  const actionType = req.params.actionType; // 'sms' or 'call'

//   if (actionType === 'sms' || actionType === 'call') {
//     const actionsOfType = settingsBill.actionsForType(actionType); // Retrieve actions of the specified type
//     let totalCost = 0;

//     // Calculate the total cost of actions of the selected type
//     actionsOfType.forEach(action => {
//       totalCost += action.cost;
//     });

//     // Render the 'actionsType' view, passing the actions and total cost to the template
//     res.render('actionsType', {
//       actions: actionsOfType.map(action => ({
//         ...action,
//         timestamp: moment(action.timestamp).fromNow()
//       })),
//       actionType,
//       totalCost: totalCost.toFixed(2)
//     });
//   } else {
//     res.status(400).send('Invalid action type');
//   }
    res.render('actions', {actions: settingsBill.actionsFor(actionType)});
});

const PORT = process.env.PORT || 3011;

app.listen(3011, function(){
  console.log("App started at port:", PORT)
});
