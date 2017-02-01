angular
  .module('ourApp')
  .controller('UserShowCtrl', UserShowCtrl);

UserShowCtrl.$inject = ['User', '$stateParams', '$state', 'CurrentUserService', 'Question'];
function UserShowCtrl(User, $stateParams, $state, CurrentUserService, Question){
  const vm = this;

  function getUser(){
    console.log('i am running');
    User
      .get($stateParams)
      .$promise
      .then(response => {
        console.log(response);
        vm.user = response;
      });
  }
  getUser();


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
