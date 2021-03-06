import { expect } from 'chai';
import { loginDetails, signupDetails,
  LogoutAction } from '../../src/actions/AuthAction';
import AuthReducer from '../../src/reducers/AuthReducer';

describe('Auth Reducer', () => {
  describe('Login Details', () => {
    it('should save the users login detail in the store', () => {
      const userParams = {
        id: 1,
        firstName: 'Fred',
        lastName: 'Flintstone',
        email: 'fred@flintstone.com',
        username: 'fred',
        roleID: 1
      };
      const action = loginDetails(userParams);
      const newState = AuthReducer({ valid: false, user: null }, action);
      expect(newState.login.id).to.eql(action.payload.id);
    });
  });
});

describe('Sign up Details', () => {
  it('should save the users signup detail in the store', () => {
    const payload = {
      id: 1,
      firstName: 'Fred',
      lastName: 'Flintstone',
      email: 'fred@flintstone.com',
      username: 'fred',
    };
    const action = signupDetails(payload);
    const newState = AuthReducer({ }, action);
    expect(newState.data.id).to.eql(action.payload.id);
  });
});

describe('Logout Reducer:', () => {
  it('should set user vlue to null', () => {
    const action = LogoutAction();
    const newState = AuthReducer({ }, action);
    expect(newState.user).to.eql(action.payload.user);
  });
});
