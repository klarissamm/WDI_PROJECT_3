angular
  .module('ourApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl);

UsersIndexCtrl.$inject = ['User', 'CurrentUserService'];
function UsersIndexCtrl(User, CurrentUserService){
  const vm = this;
  vm.users = User.query();


  vm.getUser = function(){
    return CurrentUserService.currentUser;
  };



}
