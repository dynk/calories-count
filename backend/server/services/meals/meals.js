
const { MealsModel } = require('../../models/meals');
const { pick } = require('lodash');
const { findMissingFields } = require('../../utils/utils');
const { PropertyRequiredError } = require('../../utils/errors');


function get(req = {}) {
  const filter = buildFilter(req);
  return MealsModel.find(filter);
}

function buildFilter(req = {}){
  const result = {};
  const { query = {} } = req;
  const { userId } = query;
  if(userId) {
    result.user = userId;
  }
  return result;
}

async function post(req = {}){

  const { body }= req;
  const requideFields = ['user', 'text','calories','date','time'];
  const missingFields = findMissingFields(body, requideFields);
  if(missingFields && missingFields.length){
    throw new PropertyRequiredError(missingFields);
  }
  const mealsBody = pick(req.body, requideFields);
  const meal = new MealsModel(mealsBody);
  try{
    await meal.save();
    return meal;
  }catch(err){
    throw err;
  }
}

async function patch(req = {}){

  const { id } = req.params;
  const mealBody = pick(req.body, ['text','calories','date','time']);
  try{
    await MealsModel.findOneAndUpdate({_id: id}, mealBody);
    return;
  }catch(err){
    throw err;
  }
}


async function destroy(req = {}){

  const { id } = req.params;
  try{
    await MealsModel.deleteOne({_id: id});
    return;
  }catch(err){
    throw err;
  }
}

module.exports = {
  destroy,
  get,
  patch,
  post
};