var mongoose = require('./libs/mongoose');
var User = require('./models/user').User;
var async = require('async');

async.series([
  open,
  dropDatabase,
  createUsers,
  close
], function (err, results) {
  console.log(results);
  console.log(arguments);
});

function open(callback) {
  mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
  var db = mongoose.connection.db;
  db.dropDatabase(callback);
}

function createUsers(callback) {
  async.parallel([
    function (callback) {
      var vasya = new User({ username: 'Vasya', password: 'supervasya' });
      vasya.save(function (err) {
        callback(err, vasya)
      });
    },
    function (callback) {
      var petya = new User({ username: 'Petya', password: '123' });
      petya.save(function (err) {
        callback(err, petya)
      });
    },
    function (callback) {
      var admin = new User({ username: 'admin', password: 'thetruehero' });
      admin.save(function (err) {
        callback(err, admin)
      });
    }
  ], callback);
}

function close(callback) {
  mongoose.disconnect(callback);
}

