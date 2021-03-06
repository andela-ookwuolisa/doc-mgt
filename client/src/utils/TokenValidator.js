import jwt from 'jsonwebtoken';


/**
 * Checks if a token is valid and decodes it
 * @returns {object} user status
 */
const TokenValidator = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return {
      valid: false,
      user: null
    };
  } else if (token) {
    const decoded = jwt.decode(token);
    if (decoded) {
      if (decoded.exp < Date.now() / 1000) {
        return {
          valid: false,
          user: null,
        };
      }
      return {
        valid: true,
        user: decoded,
      };
    }
    return {
      valid: false,
      user: null
    };
  }
};

export default TokenValidator;

