const env = process.env.NODE_ENV || 'development';

const { appConfig } = require('./environment.js');
const envConfig = appConfig[env];

Object.keys(envConfig).forEach((key) => {
  if(envConfig[key]){
    process.env[key] = envConfig[key];
  }
});
