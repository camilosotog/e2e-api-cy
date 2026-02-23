import { authEndpoints, authExpectedMessages } from '../data/auth.data';
import { authRequest, generateUniqueUsername, logRequestAndResponse } from '../helpers/auth.helper';
import { AuthErrorResponse, AuthRequest } from '../interfaces/auth.interface';

describe('API Demoblaze - Signup y Login', () => {
  const defaultPassword = Cypress.env('DEFAULT_PASSWORD');

  const buildCredentials = (prefix: string): AuthRequest => ({
    username: generateUniqueUsername(prefix),
    password: defaultPassword,
  });

  it('Crear un nuevo usuario en signup', () => {
    const credentials = buildCredentials('signup_new');

    authRequest(authEndpoints.signup, credentials).then((response) => {
      logRequestAndResponse('signup - nuevo usuario', credentials, response);

      expect(response.status, 'El status code del signup debería ser 200').to.eq(200);
      expect(response.body, 'El body debería venir vacío cuando el usuario se crea correctamente').to.eq('');
      expect(response.duration, 'El tiempo de respuesta debe ser menor a 2 segundos').to.be.lessThan(2000);
    });
  });

  it('Intentar crear un usuario ya existente', () => {
    const credentials = buildCredentials('signup_existing');

    authRequest(authEndpoints.signup, credentials).then((firstSignupResponse) => {
      expect(firstSignupResponse.status, 'El status code del primer signup debería ser 200').to.eq(200);
      expect(firstSignupResponse.body, 'El body del primer signup debería venir vacío').to.eq('');
      expect(firstSignupResponse.duration, 'El tiempo de respuesta debe ser menor a 2 segundos').to.be.lessThan(2000);
    });

    authRequest(authEndpoints.signup, credentials).then((secondSignupResponse) => {
      logRequestAndResponse('signup - usuario existente', credentials, secondSignupResponse);

      expect(secondSignupResponse.status, 'El status code del segundo signup debería ser 200').to.eq(200);
      expect(
        (secondSignupResponse.body as AuthErrorResponse).errorMessage,
        'El mensaje de error debería indicar que el usuario ya existe'
      ).to.eq(authExpectedMessages.userAlreadyExists);
      expect(secondSignupResponse.duration, 'El tiempo de respuesta debe ser menor a 2 segundos').to.be.lessThan(2000);
    });
  });

  it('Usuario y password correcto en login', () => {
    const credentials = buildCredentials('login_ok');

    authRequest(authEndpoints.signup, credentials).then((signupResponse) => {
      expect(signupResponse.status, 'El status code del signup debería ser 200').to.eq(200);
      expect(signupResponse.body, 'El body debería venir vacío cuando el usuario se crea correctamente').to.eq('');
      expect(signupResponse.duration, 'El tiempo de respuesta debe ser menor a 2 segundos').to.be.lessThan(2000);
    });

    authRequest(authEndpoints.login, credentials).then((loginResponse) => {
      logRequestAndResponse('login - credenciales correctas', credentials, loginResponse);

      expect(loginResponse.status, 'El status code del login debería ser 200').to.eq(200);
      expect(loginResponse.body, 'El body debería contener un token de autenticación').to.be.a('string').and.match(/^Auth_token:\s.+/);
      expect(loginResponse.duration, 'El tiempo de respuesta debe ser menor a 2 segundos').to.be.lessThan(2000);
    });
  });

  it('Usuario y password incorrecto en login', () => {
    const validCredentials = buildCredentials('login_wrong_password');
    const invalidLoginPayload: AuthRequest = {username: validCredentials.username, password: `${validCredentials.password}_incorrect`};

    authRequest(authEndpoints.signup, validCredentials).then((signupResponse) => {
      expect(signupResponse.status, 'El status code del signup debería ser 200').to.eq(200);
      expect(signupResponse.body, 'El body debería venir vacío cuando el usuario se crea correctamente').to.eq('');
      expect(signupResponse.duration, 'El tiempo de respuesta debe ser menor a 2 segundos').to.be.lessThan(2000);
    });

    authRequest(authEndpoints.login, invalidLoginPayload).then((loginResponse) => {
      logRequestAndResponse('login - credenciales incorrectas', invalidLoginPayload, loginResponse);

      expect(loginResponse.status, 'El status code del login debería ser 200').to.eq(200);
      const errorBody = loginResponse.body as AuthErrorResponse;
      expect(errorBody, 'El response debería contener un parametro "errorMessage"').to.have.property('errorMessage');
      expect(errorBody.errorMessage, 'El mensaje de error debería indicar que la contraseña es incorrecta').to.eq(authExpectedMessages.wrongPassword);
      expect(loginResponse.duration, 'El tiempo de respuesta debe ser menor a 2 segundos').to.be.lessThan(2000);
    });
  });
});


