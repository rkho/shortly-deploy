// var bcrypt = require('bcrypt-nodejs');
// var db = require('../mongoconfig');
var mongoose = require('mongoose');


var User = mongoose.model('Users');

module.exports = User;
