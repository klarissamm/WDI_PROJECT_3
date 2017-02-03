angular
.module('ourApp')
.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function LoginCtrl(User, CurrentUserService, $state) {
  const vm = this;

  vm.login = () => {
    User.login(vm.user)
    .$promise
    .then(() => {
      CurrentUserService.getUser();
      $state.go('languages');
    }, err => {
      console.log(err);
    });
  };
}

// If you now login, we should see the decoded token and the logged in user's full information

// Can take token out due to token service, this drys up the code!
