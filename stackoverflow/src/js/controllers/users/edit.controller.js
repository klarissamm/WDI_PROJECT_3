angular
  .module('ourApp')
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['User', 'API', '$state', 'CurrentUserService'];
function UsersEditCtrl(User, API, $state, CurrentUserService){
  const vm = this;

  usersShow();

  function usersShow(){
    User
    .get({ id: CurrentUserService.currentUser._id })
    .$promise
    .then(response => {
      vm.user = response;
    });

  }

  vm.update = function(){
    User
    .update( { id: CurrentUserService.currentUser._id, user: vm.user})
    .$promise
    .then(response => {
      $state.go('usersIndex');
    });
  };
}
