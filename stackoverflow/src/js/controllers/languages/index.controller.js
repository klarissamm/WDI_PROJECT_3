angular
  .module('ourApp')
  .controller('LanguagesIndexCtrl', LanguagesIndexCtrl);

LanguagesIndexCtrl.$inject = ['Language'];
function LanguagesIndexCtrl(Language){
  const vm = this;
  vm.languages = Language.query();
  console.log(vm.languages);
}
