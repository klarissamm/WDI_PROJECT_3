angular
  .module('ourApp')
  .controller('LanguageShowCtrl', LanguageShowCtrl);

LanguageShowCtrl.$inject = ['Language', '$stateParams', 'Question'];
function LanguageShowCtrl(Language, $stateParams, Question){
  const vm = this;
  vm.language = Language.get($stateParams);
  console.log('here', vm.language);
  // vm.questions = Question.get($stateParams);
}
