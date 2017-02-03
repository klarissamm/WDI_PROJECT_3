angular
.module('ourApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state', 'User'];
function MainCtrl($rootScope, CurrentUserService, $state, User){
  const vm = this;

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
  });

  $rootScope.$on('$stateChangeStart', ()=> {
    document.getElementById('logdrop').className = 'loginDropdown';
  });

  $rootScope.$on('loggedOut', () => {
    vm.user = CurrentUserService.currentUser;
    $state.go('home');
  });

  vm.toggleLogin = function(){
    var logDrop = document.getElementById('logdrop');
    console.log(logDrop);
    if(logDrop.className.indexOf('showing') === -1){
      logDrop.className += ' showing';
    } else {
      logDrop.className = 'loginDropdown';
    }
  };

  vm.login = () => {
    console.log(vm.userLogin);
    User.login(vm.userLogin)
    .$promise
    .then(() => {
      console.log('returned');
      CurrentUserService.getUser();
      $state.go('languages');
    }, err => {
      console.log(err);
    });
  };

  vm.logout = () => {
    CurrentUserService.removeUser();
  };

}
