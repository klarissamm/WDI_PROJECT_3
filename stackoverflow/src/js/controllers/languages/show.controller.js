angular
  .module('ourApp')
  .controller('LanguageShowCtrl', LanguageShowCtrl);

LanguageShowCtrl.$inject = ['Language', '$stateParams', 'Question'];
function LanguageShowCtrl(Language, $stateParams, Question){
  const vm = this;
  vm.language = Language.get($stateParams);
  vm.questions = Question.query();
}
