angular
  .module('ourApp')
  .controller('QuestionsShowCtrl', QuestionsShowCtrl);

QuestionsShowCtrl.$inject = ['Question', '$stateParams', 'Answer', 'CurrentUserService'];
function QuestionsShowCtrl(Question, $stateParams, Answer, CurrentUserService){
  const vm = this;

  vm.question = Question.get($stateParams);
  vm.newAnswer = {
    question: $stateParams.id
  };

  vm.getCurrentUser = () => {
    return CurrentUserService.currentUser;
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
