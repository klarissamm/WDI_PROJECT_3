angular
  .module('ourApp')
  .controller('QuestionsShowCtrl', QuestionsShowCtrl);

QuestionsShowCtrl.$inject = ['Question', '$stateParams', 'Answer'];
function QuestionsShowCtrl(Question, $stateParams, Answer){
  const vm = this;

  vm.question = Question.get($stateParams);
  vm.newAnswer = {
    question: $stateParams.id
  };
  vm.submitAnswer = function(){
    Answer
    .save({answer: vm.newAnswer})
    .$promise
    .then(response => {
      vm.question.answers.push(response);
      vm.newAnswer = {
        question: $stateParams.id
      };
    });
  };
}
