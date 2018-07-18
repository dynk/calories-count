const {UsersModel} = require('./../models/users');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth') || req.headers('x-auth');
  UsersModel.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((err) => {
    res.status(401).send(err);
  });
};

const isAdmin = (req, res, next) => {
  const token = req.header('x-auth');
  UsersModel.findByToken(token).then((user) => {
    if (!user || (user.credential !== 'ADMIN')) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch(() => {
    res.status(401).send({message: 'User not authorized!'});
  });
};

const isUserAdminOrAdmin = (req, res, next) => {
  const token = req.header('x-auth');
  UsersModel.findByToken(token).then((user) => {
    const authorizedCredentials = ['ADMIN', 'USERADMIN'];
    if (!user || !authorizedCredentials.includes(user.credential) ) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch(() => {
    res.status(401).send({message: 'User not authorized!'});
  });
};

module.exports = {
  authenticate,
  isAdmin,
  isUserAdminOrAdmin
};
