angular
  .module('ourApp')
  .controller('LanguageShowCtrl', LanguageShowCtrl);

LanguageShowCtrl.$inject = ['Language'];
function LanguageShowCtrl(Language){
  const vm = this;

  vm.languages = Language.query();
}
