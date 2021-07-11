export const environment = {
  production: true,
  apiUrl: 'https://back-desafio-rogerio.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('back-desafio-rogeri.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
