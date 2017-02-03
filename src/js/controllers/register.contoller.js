angular
.module('ourApp')
.controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['User', 'CurrentUserService', '$state', '$http'];
function RegisterCtrl(User, CurrentUserService, $state, $http){
  const vm =this;

  vm.register = () => {
    User.register(vm.user)
    .$promise
    .then(() => {
      CurrentUserService.getUser();
      $state.go('usersIndex');
    }, err => {
      console.log(err);
    });
  };

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
  vm.restartSearch = restartSearch;
  function restartSearch(){
    vm.charitiesList = null;
    vm.charitySearch = null;
    vm.auction.charity = null;
  }
}
