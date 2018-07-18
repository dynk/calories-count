const service = require('../../utils/utils');
const assert = require('assert');

describe('Utils Service test', () => {
  it('findMissingFields - Should get missing fields correctly', () => {
    const target = {
      field1: 'value1',
      field2: 'value2',
      field3: 'value3'
    };
    const requiredFields = ['field3', 'field4'];
    const expected = ['field4'];
    const result = service.findMissingFields(target,requiredFields);
    return assert.deepEqual(result,expected);
  });
  it('findMissingFields - Should return empty array when required fields are correct', () => {
    const target = {
      field1: 'value1',
      field2: 'value2',
      field3: 'value3'
    };
    const requiredFields = ['field1', 'field2','field3'];
    const expected = [];
    const result = service.findMissingFields(target,requiredFields);
    return assert.deepEqual(result,expected);
  });
  it('findMissingFields - Should return empty array when there are no required fields', () => {
    const target = {
      field1: 'value1',
      field2: 'value2',
      field3: 'value3'
    };
    const requiredFields = [];
    const expected = [];
    const result = service.findMissingFields(target,requiredFields);
    return assert.deepEqual(result,expected);
  });
  it('findMissingFields - Should return empty array if target is empty', () => {
    const target = {};
    const requiredFields = [];
    const expected = [];
    const result = service.findMissingFields(target,requiredFields);
    return assert.deepEqual(result,expected);
  });

  it('findMissingFields - Should return empty array if target is not an object', () => {
    const target = 'test';
    const requiredFields = [];
    const expected = [];
    const result = service.findMissingFields(target,requiredFields);
    return assert.deepEqual(result,expected);
  });

  it('findMissingFields - Should return empty array if target is null', () => {
    const target = null;
    const requiredFields = [];
    const expected = [];
    const result = service.findMissingFields(target,requiredFields);
    return assert.deepEqual(result,expected);
  });
});