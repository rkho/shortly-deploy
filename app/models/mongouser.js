var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var User = mongoose.model('Users', users);

module.exports = User;
