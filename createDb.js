var User = require('./models/user').User;

var user = new User({
  username: "Tester",
  password: 'secret'
});

user.save((err, user, affected) => {
  if (err) throw err;

  console.log(arguments);
});