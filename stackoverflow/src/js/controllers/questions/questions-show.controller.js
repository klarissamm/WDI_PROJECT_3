angular
.module('ourApp')
.controller('QuestionsShowCtrl', QuestionsShowCtrl);

QuestionsShowCtrl.$inject = ['Question', '$stateParams', 'Answer', 'CurrentUserService', '$http'];
function QuestionsShowCtrl(Question, $stateParams, Answer, CurrentUserService, $http){
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

  vm.selectBest = function(answer){
    $http({
      method: 'PUT',
      url: `http://localhost:7000/api/questions/${$stateParams.id}/answers/${answer._id}`,
      data: answer
    }).then(response => {
      for (var i = 0; i < vm.question.answers.length; i++) {
        vm.question.answers[i].chosen = false;
      }
      vm.question.answers[vm.question.answers.indexOf(answer)].chosen = true;
    });
  };
}
