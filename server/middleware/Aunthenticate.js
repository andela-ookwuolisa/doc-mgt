import jwt from 'jsonwebtoken';

require('dotenv').config();

const secret = process.env.SECRET;

const Authenticate = {
  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.query.token
    || req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.status(400).send({
            message: 'Authentication failed.'
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).send({
        message: 'No Token provided'
      });
    }
  },
  verifyAdmin(req, res, next) {
    if (req.decoded.roleID === 1) {
      next();
    } else {
      res.status(401).send({ message: 'Access Denied' });
    }
  }
};

export default Authenticate;
