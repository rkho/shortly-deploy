var app = require('./server-config.js');

var port = process.env.SERVER_PORT || 4568;

app.listen(port);

console.log(process);
console.log('Server now listening on port ' + port);
