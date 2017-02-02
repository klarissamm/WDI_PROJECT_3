angular
  .module('ourApp')
  .controller('UserShowCtrl', UserShowCtrl);

UserShowCtrl.$inject = ['User', '$stateParams', '$state', 'CurrentUserService', 'Question', '$http'];
function UserShowCtrl(User, $stateParams, $state, CurrentUserService, Question, $http){
  const vm = this;

  function getUser(){
    User
      .get($stateParams)
      .$promise
      .then(response => {
        vm.user = response;
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

// If the person logged in has the same id as the user profile they can edit/delete said profile, otherwise they can not.
  vm.isCurrentUser = function(){
    return CurrentUserService.currentUser._id === $stateParams.id;
  };
}
