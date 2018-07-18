const { responseErrorJson, responseJson } = require('../utils/controllers-response');
const HttpStatus = require('http-status-codes');
const service = require('../services/meals/meals');
// const { pick } = require('lodash');

async function get(req, res) {
  try{
    const response = await service.get(req);
    return responseJson(res, response);
  }catch(err){
    return responseErrorJson(res, 'meals::get', err);
  }
}


async function post(req, res) {
  try{
    const response = await service.post(req);
    return responseJson(res, response, HttpStatus.CREATED);
  }catch(err) {
    return responseErrorJson(res, 'meals::post', err);
  }
}

async function patch(req, res) {
  try{
    const response = await service.patch(req);
    return responseJson(res, response, HttpStatus.CREATED);
  }catch(err) {
    return responseErrorJson(res, 'meals::patch', err);
  }
}

async function destroy(req, res) {
  try{
    const response = await service.destroy(req);
    return responseJson(res, response, HttpStatus.ACCEPTED);
  }catch(err) {
    return responseErrorJson(res, 'meals::destroy', err);
  }
}


module.exports = {
  destroy,
  get,
  patch,
  post
};