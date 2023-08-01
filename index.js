import express from 'express';

let app = express();

// GET route '/'
app.get('/', function(req, res){
  res.send('Settings Bill App')
});

// POST route '/settings'
app.post('/settings', function(req, res){
  res.send('Settings Bill App')
});

// POST route '/action'

// GET route '/actions'

// GET route '/actions/:type'

const PORT = process.env.PORT || 3011;

app.listen(3011, function(){
  console.log("App started at port:", PORT)
});
