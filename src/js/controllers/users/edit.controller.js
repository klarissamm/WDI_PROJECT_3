angular
  .module('ourApp')
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['User', 'API', '$state', 'CurrentUserService', '$http'];
function UsersEditCtrl(User, API, $state, CurrentUserService, $http){
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

  vm.searchCharities = searchCharities;
  function searchCharities(){
    if (vm.charitySearch) {
      $http({
        method: 'GET',
        url: `https://api.justgiving.com/06beb149/v1/charity/search?q=${vm.charitySearch}&pageSize=5`
      }).then(response => {
        vm.charitiesList = response.data.charitySearchResults;
      });
    }
  }

  vm.update = function(){
    User
    .update( { id: CurrentUserService.currentUser._id, user: vm.user})
    .$promise
    .then(response => {
      $state.go('userShow', { id: CurrentUserService.currentUser._id });
    });
  };
}
