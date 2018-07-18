const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Number,
    require: true,
    default: 0,
    min:0,
    max: 23
  },
  calories:{
    type: Number,
    require: true,
    min:0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  }
});


const MealsModel = mongoose.model('Meals', MealsSchema);

module.exports = {MealsModel};
