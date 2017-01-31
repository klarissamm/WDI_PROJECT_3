angular
  .module('ourApp')
  .controller('UserShowCtrl', UserShowCtrl);

UserShowCtrl.$inject = ['User', '$stateParams', '$state', 'CurrentUserService'];
function UserShowCtrl(User, $stateParams, $state, CurrentUserService){
  const vm = this;
  vm.user = User.get($stateParams);
  console.log(vm.user);
  console.log($stateParams);
  vm.delete = function(){
    User
    .delete($stateParams)
    .$promise
    .then(() => {
      $state.go('usersIndex');
    });
  };

  vm.isCurrentUser = function(){
    return CurrentUserService.currentUser._id === $stateParams.id;
  };
}
