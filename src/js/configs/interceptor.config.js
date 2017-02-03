angular
  .module('ourApp')
  .config(Interceptor);

Interceptor.$inject = ['$httpProvider'];
function Interceptor($httpProvider) {
  return $httpProvider.interceptors.push('AuthInterceptor');
}

// Intercept the header to check whether it has a token.
