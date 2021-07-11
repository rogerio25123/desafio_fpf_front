export const environment = {
  production: true,
  apiUrl: 'https://back-desafio-rogerio.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('back-desafio-rogerio.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
