var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/test');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function(callback){
  console.log('opened!');
});

var urls = new Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: { type: Number, default: 0 }
});

urls.pre('save', function (next) {
  var url = this;
  var shasum = crypto.createHash('sha1');
  shasum.update(url.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});


var users = new Schema({
  username: String,
  password: String
});

users.pre('save', function(next){
  var user = this;

  if (!user.isModified('password')){
    next();
  }

  bcrypt.hash(user.password, null, null, function(err, hash){
    if (err){
      console.error('bcrypt hashing failed: ' + err);
    }
    user.password = hash;
    next();
  });
});

users.methods.comparePassword = function(attemptedPassword, callback){
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch){
    if (err){
      console.error('comparing passwords failed: ' + err);
    }
    callback(isMatch);
  });
};


mongoose.model('Urls', urls);
mongoose.model('Users', users);

exports.db = db;
