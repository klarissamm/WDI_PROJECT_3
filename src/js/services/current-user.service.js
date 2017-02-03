angular
  .module('ourApp')
  .service('CurrentUserService', CurrentUserService);

// lets the DOM know if you are loggedIn/loggedOut - like a microphone

CurrentUserService.$inject = ['TokenService', '$rootScope', 'User'];
function CurrentUserService(TokenService, $rootScope, User) {
  const self = this;

  self.getUser = () => {
    const decoded = TokenService.decodeToken();
    if (decoded) {
      User
        .get({ id: decoded.id }).$promise
        .then(data => {
          self.currentUser = data;
          $rootScope.$broadcast('loggedIn');
        });
    }
  };

  self.getUser();

  self.removeUser = () => {
    self.currentUser = null;
    TokenService.removeToken();
    $rootScope.$broadcast('loggedOut');
  };
}
