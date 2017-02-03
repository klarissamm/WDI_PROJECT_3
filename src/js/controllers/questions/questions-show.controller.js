angular
.module('ourApp')
.controller('QuestionsShowCtrl', QuestionsShowCtrl);

QuestionsShowCtrl.$inject = ['Question', '$stateParams', 'Answer', 'CurrentUserService', '$http', 'User'];
function QuestionsShowCtrl(Question, $stateParams, Answer, CurrentUserService, $http, User){
  const vm = this;

  vm.question = Question.get($stateParams);
  console.log(vm.question);
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

// Pass answer to selectBest function, it is saved in newAnswer(above). We validate the answer.

  vm.selectBest = function(answer, $event){
    User
    .get({id: answer.owner})
    .$promise
    .then(response => {
      vm.charityUser = response;
      vm.charityChosen = response.charity;
      $http({
        method: 'GET',
        url: `https://api.justgiving.com/06beb149/v1/charity/search?charityId=${vm.charityChosen}`
      }).then(response => {
        vm.charity = response.data.charitySearchResults[0];
        $('#myCharityModal').modal('show');
      });
    });
    $http({
      method: 'PUT',
      url: `http://localhost:7000/api/questions/${$stateParams.id}/answers/${answer._id}`,
      data: answer
    }).then(response => {
      for (var i = 0; i < vm.question.answers.length; i++) {
        vm.question.answers[i].chosen = false;
        // angular.element(document.getElementsByClassName('iquestion-icon')[i]).removeClass('glyphicon-check').addClass('glyphicon-edit');
      }
      vm.question.answers[vm.question.answers.indexOf(answer)].chosen = true;
      // angular.element($event.target).removeClass('glyphicon-edit').addClass('glyphicon-check');
    });
  };
}

// Answers are false by default until selected true here. If you choose one answer and then select another answer, the first chosen will revert back to false and second will render true.
