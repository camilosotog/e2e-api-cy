import { AuthApiResponse, AuthRequest } from '../interfaces/auth.interface';

const DEFAULT_API_BASE_URL = 'https://api.demoblaze.com';

const getApiBaseUrl = Cypress.env('API_BASE_URL') || DEFAULT_API_BASE_URL;

/**
 * @description Genera un username único utilizando un prefijo y un número aleatorio.
 * @param prefix Prefijo para el username.
 * @returns Username único generado.
 * @author Camilo
 */
export const generateUniqueUsername = (prefix = 'test'): string =>`${prefix}_${Cypress._.random(1000, 9999)}`;

/**
 * @description Realiza una solicitud de autenticación (signup o login) a la API.
 * @param endpoint Endpoint de la API al que se realizará la solicitud.
 * @param body Cuerpo de la solicitud de autenticación.
 * @returns Respuesta de la API envuelta en un objeto Cypress.Chainable.
 * @author Camilo
 */
export const authRequest = ( endpoint: string, body: AuthRequest): Cypress.Chainable<Cypress.Response<AuthApiResponse>> =>
  cy.request<AuthApiResponse>({
    method: 'POST',
    url: `${getApiBaseUrl}/${endpoint}`,
    headers: { 'Content-Type': 'application/json' },
    body,
    failOnStatusCode: false,
  });

  /**
   * @description Función  para loguear los inputs y outpus de las solicitudes de autenticación.
   * @param scenario Escenario de la prueba.
   * @param input Datos de entrada de la solicitud.
   * @param response Respuesta de la API.
   * @author Camilo
   */
export const logRequestAndResponse = (scenario: string, input: AuthRequest, response: Cypress.Response<AuthApiResponse>): void => {
  cy.log(`[${scenario}] Input: ${JSON.stringify(input)}`);
  cy.log(`[${scenario}] Status: ${response.status}`);
  cy.log(`[${scenario}] Output: ${JSON.stringify(response.body)}`);
};
