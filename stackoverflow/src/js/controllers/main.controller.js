angular
.module('ourApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state'];
function MainCtrl($rootScope, CurrentUserService, $state){
  const vm = this;

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
  });

  $rootScope.$on('loggedIn', () => {
    $state.go('usersIndex');
  });

  $rootScope.$on('loggedOut', () => {
    vm.user = CurrentUserService.currentUser;
    $state.go('home');
  });

  vm.logout = () => {
    CurrentUserService.removeUser();
  };

}
