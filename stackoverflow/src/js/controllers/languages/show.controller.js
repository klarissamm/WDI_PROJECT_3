angular
  .module('ourApp')
  .controller('LanguageShowCtrl', LanguageShowCtrl);

LanguageShowCtrl.$inject = ['Language', '$stateParams'];
function LanguageShowCtrl(Language, $stateParams){
  const vm = this;
  vm.language = Language.get($stateParams);
  // vm.questions = Question.get($stateParams);
}
