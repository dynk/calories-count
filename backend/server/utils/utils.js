function findMissingFields(target, requiredFields){
  const result = [];
  if(typeof target !== 'object' || target === null){
    return [];
  }
  for(const field of requiredFields){
    if(!target.hasOwnProperty(field)){
      result.push(field);
    }
  }
  return result;
}

module.exports = {
  findMissingFields
};