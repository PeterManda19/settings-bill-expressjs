import express from 'express';

let app = express();

app.get('/', function(req, res){
  res.send('Settings Bill App')
});

app.listen(3011, function(){
  console.log("App started")
});
