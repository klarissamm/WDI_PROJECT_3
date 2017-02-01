angular
  .module('ourApp')
  .controller('UserShowCtrl', UserShowCtrl);

UserShowCtrl.$inject = ['User', '$stateParams', '$state', 'CurrentUserService', 'Question', '$http'];
function UserShowCtrl(User, $stateParams, $state, CurrentUserService, Question, $http){
  const vm = this;

  function getUser(){
    console.log('i am running');
    User
      .get($stateParams)
      .$promise
      .then(response => {
        vm.user = response;
        console.log(vm.user.charity);
        $http({
          method: 'GET',
          url: `https://api.justgiving.com/06beb149/v1/charity/search?charityId=${vm.user.charity}`
        }).then(response => {
          vm.user.charity = response.data.charitySearchResults[0];
        });
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
