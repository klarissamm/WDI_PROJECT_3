angular
.module('ourApp')
.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService'];
function LoginCtrl(User, CurrentUserService) {
  const vm = this;

  vm.login = () => {
    console.log('running');
    User.login(vm.user)
    .$promise
    .then(() => {
      CurrentUserService.getUser();
    }, err => {
      console.log(err);
    });
  };
}

// If you now login, we should see the decoded token and the logged in user's full information

// Can take token out due to token service, this drys up the code!
