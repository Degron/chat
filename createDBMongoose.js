var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

var schema = mongoose.Schema({
  name: String
});
schema.methods.meow = function () {
  console.log(this.get('name'))
}
var Cat = mongoose.model('Cat', schema);
var kitty = new Cat({
  name: 'Zelden'
});
console.log(kitty)

kitty.save((err, kitty, affected) => {
  // if (err)
  kitty.meow()
  // console.error('meow');
});