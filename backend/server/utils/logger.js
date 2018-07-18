
const winston = require('winston');

function timestamp () {
  return new Date().toLocaleString();
}

function CustomLogger (prefix = null, logFile = null) {
  this.instance = new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        colorize: 'all',
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: false,
        timestamp
      }),
    ].concat(!logFile ? [] : [
      new winston.transports.File({
        level: 'debug',
        filename: logFile,
        maxsize: 10000,
        maxFiles: 1,
        json: false,
        timestamp
      })
    ]),
    exitOnError: false,
  });

  this.setPrefix(prefix);
  this.requests = {
    write: (msg) => {
      msg = msg.replace(/gw-app-key=([A-Za-z0-9])+/g, 'gw-app-key=...');
      this.debug(msg);
    }
  };
}

CustomLogger.prototype.setPrefix = function (prefix) {
  this._prefix = prefix ? `[PID:${process.pid}][${prefix}]: ` : `[PID:${process.pid}]: `;
  return this;
};

CustomLogger.prototype.info = function (msg, meta) {
  this.instance.info(`${this._prefix}${msg}`, meta);
  return this;
};

CustomLogger.prototype.debug = function (msg, meta) {
  this.instance.debug(`${this._prefix}${msg}`, meta);
  return this;
};


CustomLogger.prototype.error = function (msg, meta) {
  this.instance.error(`${this._prefix}${msg}`, meta);
  return this;
};


CustomLogger.prototype.log = function (msg, meta) {
  this.instance.debug(`${this._prefix}${msg}`, meta);
  return this;
};

CustomLogger.prototype.prefix = function (prefix = null, logFile = null) {
  return this.create(prefix, logFile);
};


CustomLogger.prototype.create = function (prefix = null, logFile = null) {
  return new CustomLogger(prefix, logFile);
};

const logger = new CustomLogger();


module.exports = exports = logger;
