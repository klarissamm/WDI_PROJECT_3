angular
  .module('ourApp')
  .controller('QuestionsShowCtrl', QuestionsShowCtrl);

QuestionsShowCtrl.$inject = ['Question', '$stateParams'];
function QuestionsShowCtrl(Question, $stateParams){
  const vm = this;

  vm.questions = Question.get();
  console.log(vm.questions);
}
