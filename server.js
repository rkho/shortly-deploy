var app = require('./server-config.js');

var port = process.env.SERVER_PORT || 4568;

app.listen(port, function(err, success){
  if(err){
    console.log('there was an error');
  } else {
    console.log('there was a success!');
  }
});

console.log(process);
console.log('Server now listening on port ' + port);
