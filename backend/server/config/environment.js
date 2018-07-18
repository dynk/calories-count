const appConfig = {
  test:{
    PORT: process.env.LOCAL_PORT || 3020,
    MONGODB_URI: process.env.MONGODB_URI || 'localhost',
    MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME || 'db',
    MONGODB_USERNAME: process.env.MONGODB_USERNAME ,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD ,
    MONGODB_PORT: process.env.MONGODB_PORT || '27017',
    JWT_SECRET: process.env.JWT_SECRET || '!meal$ecret!'
  },
  development: {
    PORT: process.env.LOCAL_PORT || 3020,
    MONGODB_URI: process.env.MONGODB_URI || 'localhost',
    MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME || 'db',
    MONGODB_USERNAME: process.env.MONGODB_USERNAME ,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD ,
    MONGODB_PORT: process.env.MONGODB_PORT || '27017',
    JWT_SECRET: process.env.JWT_SECRET || '!meal$ecret!'
  },
  production: {
    PORT: process.env.LOCAL_PORT || 3020,
    MONGODB_URI: process.env.MONGODB_URI || 'mongo',
    MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME || 'db',
    MONGODB_USERNAME: process.env.MONGODB_USERNAME ,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD ,
    MONGODB_PORT: process.env.MONGODB_PORT || '27017',
    JWT_SECRET: process.env.JWT_SECRET || '!meal$ecret!'
  }
};

module.exports = {
  appConfig
};