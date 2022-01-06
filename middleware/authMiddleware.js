class AuthMiddleware {
  static auth = (req, res, next) => {
    res.locals.user = {
      id: '81f0fbe7-91f3-403f-bce4-a5358f2e4bbe',
    };

    next();
  };
}

module.exports = {
  AuthMiddleware,
};
