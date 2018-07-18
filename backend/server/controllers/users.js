const { responseErrorJson, responseJson } = require('../utils/controllers-response');
const HttpStatus = require('http-status-codes');
const service = require('../services/users/users');
const { pick } = require('lodash');

const userPick =
  ['email',
    'name',
    'meals',
    'caloriesPerDay'];

async function get(req, res) {
  try{
    const response = await service.get(req);
    return responseJson(res, response);
  }catch(err){
    return responseErrorJson(res, 'users::get', err);
  }
}

async function getById(req, res) {
  try{
    const response = await service.getById(req);
    return responseJson(res, pick(response, userPick));
  }catch(err){
    return responseErrorJson(res, 'users::getById', err);
  }
}

async function getMeals(req, res) {
  try{
    const meals = await service.getMeals(req);
    return responseJson(res, meals.map(m => pick(m, ['text', 'time', 'date', 'calories', 'id', '_id'])));
  }catch(err){
    return responseErrorJson(res, 'users::getMeals', err);
  }
}

async function getMealById(req, res) {
  try{
    const meals = await service.getMealById(req);
    return responseJson(res, pick(meals, ['text', 'time', 'date', 'calories', 'id']));
  }catch(err){
    return responseErrorJson(res, 'users::getMeals', err);
  }
}

async function post(req, res) {
  try{
    let {user, token} = await service.post(req);
    user = pick(user, ['id', 'email']);
    return responseJson(res, {user,token}, HttpStatus.CREATED);
  }catch(err) {
    return responseErrorJson(res, 'users::post', err);
  }
}

async function patch(req, res) {
  try{
    const response = await service.patch(req);
    return responseJson(res, response, HttpStatus.CREATED);
  }catch(err) {
    return responseErrorJson(res, 'users::patch', err);
  }
}

async function destroy(req, res) {
  try{
    const response = await service.destroy(req);
    return responseJson(res, response, HttpStatus.ACCEPTED);
  }catch(err) {
    return responseErrorJson(res, 'users::destroy', err);
  }
}


async function postMeals(req, res) {
  try{
    const response = await service.postMeals(req);
    return responseJson(res, response, HttpStatus.CREATED);
  }catch(err) {
    return responseErrorJson(res, 'users::postMeals', err);
  }
}

async function patchMeal(req, res) {
  try{
    const response = await service.patchMeal(req);
    return responseJson(res, response, HttpStatus.CREATED);
  }catch(err) {
    return responseErrorJson(res, 'users::patchMeal', err);
  }
}

async function destroyMeal(req, res) {
  try{
    const response = await service.destroyMeal(req);
    return responseJson(res, response, HttpStatus.ACCEPTED);
  }catch(err) {
    return responseErrorJson(res, 'users::destroyMeal', err);
  }
}

async function login(req, res){
  try{
    let {user ,token} = await service.login(req);
    user = pick(user, ['id', 'email']);
    return responseJson(res, {user, token});
  }catch(err) {
    return responseErrorJson(res, 'users::login', err);
  }
}



module.exports = {
  destroy,
  login,
  get,
  getById,
  getMeals,
  getMealById,
  patch,
  post,
  postMeals,
  patchMeal,
  destroyMeal
};