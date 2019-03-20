const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var donateSchema = new Schema({
  books_quantity: Number,
  stationary_quantity: Number,
  clothes_quantity: Number,
  date: {type: Date, default: Date.now}
});

var Donate = mongoose.model("Donate", donateSchema);

module.exports = Donate;
