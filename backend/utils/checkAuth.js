import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 's3cr3t');

      req.userId = decoded._id;

      next();
    } catch (error) {
      res.status(403).json({
        message: 'No access',
        error: error.message,
      });
    }
  } else {
    res.status(403).json({
      message: 'No access',
    });
  }
};

export const checkAuthWithoutRestrict = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 's3cr3t');

      req.userId = decoded._id;

      next();
    } catch (error) {
      res.status(403).json({
        message: 'No access',
        error: error.message,
      });
    }
  } else {
    req.userId = null;
    next();
  }
};
