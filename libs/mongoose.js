var mongoose = require('mongoose');
var config = require('../config/config');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoose.url, config.mongoose.options);

module.exports = mongoose;
