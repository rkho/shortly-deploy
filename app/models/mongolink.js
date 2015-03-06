var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

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

var Link = mongoose.model('Urls', urls);

module.exports = Link;
