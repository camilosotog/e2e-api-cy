export const authEndpoints = {
  signup: 'signup',
  login: 'login',
} as const;

export const authExpectedMessages = {
  userAlreadyExists: 'This user already exist.',
  wrongPassword: 'Wrong password.',
} as const;
