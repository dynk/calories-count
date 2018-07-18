
const { UsersModel } = require('../../models/users');
const { MealsModel } = require('../../models/meals');
const { pick } = require('lodash');
const { findMissingFields } = require('../../utils/utils');
const { PropertyRequiredError, UnauthorizedError } = require('../../utils/errors');
const validator = require('validator');

const edibleUserFields =
  ['email',
    'password',
    'name',
    'caloriesPerDay'];

function get() {
  return UsersModel.find();
}

function getById(req = {}) {
  const { id } = req.params;
  const { user } = req;
  if(user.id !== id){
    if(!['ADMIN','USERADMIN'].includes(user.credential)){
      return Promise.reject(new UnauthorizedError());
    }else{
      return UsersModel
        .findOne({_id:id})
        .then(user => {
          user.meals.length = 0;
          return user;
        });
    }
  }
  return UsersModel
    .findOne({_id:id})
    .populate('meals');
}

async function post(req = {}){

  const { body } = req;
  const requideFields = ['email', 'name', 'password'];
  const missingFields = findMissingFields(body, requideFields);
  if(missingFields && missingFields.length){
    throw new PropertyRequiredError(missingFields);
  }
  const userBody = pick(body, edibleUserFields);
  if (!userBody.password || userBody.password.length < 6){
    throw new RangeError('Invalid password. Should has at least 6 characters');
  }

  const { adminCode } = body;
  if(adminCode && (adminCode === '#$ecretadmincode123')){
    userBody.credential = 'ADMIN';
  }else if(adminCode && (adminCode === '#$ecretuser-admincode123')) {
    userBody.credential = 'USERADMIN';
  } else {
    userBody.credential = 'REGULAR';
  }
  const user = new UsersModel(userBody);
  try{
    await user.save();
    const token = await user.generateAuthToken();
    return {user, token};
  }catch(err){
    let error;
    if (err.code === 11000){
      error = new RangeError('Email already exists.');
    }
    throw error;
  }
}


async function patch(req = {}){

  const { id } = req.params;
  const { user } = req;
  if(
    (user.id !== id) &&
    !['ADMIN','USERADMIN'].includes(user.credential)
  ){
    return Promise.reject(new UnauthorizedError());
  }
  const userBody = pick(req.body, edibleUserFields);
  try{
    await UsersModel.findOneAndUpdate({_id: id}, userBody);
    return {};
  }catch(err){
    throw err;
  }
}

async function destroy(req = {}){

  const { id } = req.params;
  const { user } = req;
  if(
    (user.id !== id) &&
      !['ADMIN','USERADMIN'].includes(user.credential)
  ){
    return Promise.reject(new UnauthorizedError());
  }
  try{
    await UsersModel.deleteOne({_id: id});
    return {};
  }catch(err){
    throw err;
  }
}

async function getMeals(req = {}) {
  const { user } = req;
  const { id } = req.params;
  try{
    if(
      (user.id !== id) &&
      !['ADMIN'].includes(user.credential)
    ){
      throw new UnauthorizedError();
    }
    const filter = buildMealsFilter(req);
    return MealsModel.find(filter, null, {sort: {date: -1, time: -1}});
  }catch(err){
    throw err;
  }
}

function buildMealsFilter(req = {}){
  const { id } = req.params;
  const { query = {} } = req;
  const { startDate, endDate, startTime, endTime } = query;
  const result = {
    user: id
  };
  if(startDate){
    validateDate(startDate);
    result.date = {$gte: new Date(startDate)};
  }
  if(endDate){
    validateDate(endDate);
    result.date = result.date || {};
    result.date['$lt'] = new Date(endDate);
  }
  if(startTime){
    if(!endTime){
      throw new RangeError('startTime and endTime needed!');
    }
    const startTimeInt = parseInt(startTime, 10);
    const endTimeInt = parseInt(endTime, 10);
    validateTime(startTimeInt);
    validateTime(endTimeInt);
    if(startTimeInt <= endTimeInt){
      result.time = {$gte: startTimeInt, $lte: endTimeInt};
    }else{
      result.time = {$gte: endTimeInt, $lte: startTimeInt};
    }
  }

  return result;

  function validateDate(date){
    if(!validator.isISO8601(date)){
      throw new RangeError('Invalid Date format');
    }
  }

  function validateTime(time){
    if(isNaN(time) || time < 0 || time > 23 ){
      throw new RangeError('Invalid time format, should be between 0 and 23');
    }
  }
}

function getMealById(req = {}) {
  const { user } = req;
  const { id, mealId } = req.params;
  if(
    (user.id !== id) &&
    !['ADMIN'].includes(user.credential)
  ){
    return Promise.reject(new UnauthorizedError());
  }
  return MealsModel.findOne({_id: mealId, user: id});
}


async function postMeals(req = {}){

  const { user, body } = req;
  const { id } = req.params;
  const requideFields = ['text','calories','date','time'];
  const missingFields = findMissingFields(body, requideFields);
  if(missingFields && missingFields.length){
    throw new PropertyRequiredError(missingFields);
  }
  const mealBody = pick(body, requideFields);
  mealBody.user = id;
  if(
    (user.id !== id) &&
    !['ADMIN'].includes(user.credential)
  ){
    return Promise.reject(new UnauthorizedError());
  }
  try{
    const meal = new MealsModel(mealBody);
    await meal.save();
    await UsersModel.update({
      _id: id
    },
    {
      '$push' :{ 'meals' : meal.id }
    }
    );
    return meal;
  }catch(err){
    throw err;
  }
}

async function patchMeal(req = {}){

  const { id, mealId } = req.params;
  const { user } = req;
  if(
    (user.id !== id) &&
      !['ADMIN'].includes(user.credential)
  ){
    return Promise.reject(new UnauthorizedError());
  }
  const mealBody = pick(req.body, ['text','calories','date','time']);
  try{
    await MealsModel.findOneAndUpdate({_id: mealId}, mealBody);
    return;
  }catch(err){
    throw err;
  }
}

async function destroyMeal(req = {}){

  const { id, mealId } = req.params;
  const { user } = req;
  if(
    (user.id !== id) &&
        !['ADMIN'].includes(user.credential)
  ){
    return Promise.reject(new UnauthorizedError());
  }
  try{
    await MealsModel.deleteOne({_id: mealId});
    return {};
  }catch(err){
    throw err;
  }
}

async function login(req = {}){

  const requideFields = ['email', 'password'];
  const {body = {}} = req;
  try{
    const missingFields = findMissingFields(body, requideFields);
    if(missingFields && missingFields.length){
      throw new PropertyRequiredError(missingFields);
    }
    const userBody = pick(req.body, requideFields);
    const user = await UsersModel.findByCredentials(userBody.email, userBody.password);
    const token = await user.generateAuthToken();
    return {token, user};
  }catch(err){
    throw err;
  }
}

module.exports = {
  destroy,
  get,
  getById,
  getMeals,
  getMealById,
  login,
  patch,
  post,
  postMeals,
  patchMeal,
  destroyMeal
};