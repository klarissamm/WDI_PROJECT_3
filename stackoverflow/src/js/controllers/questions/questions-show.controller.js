angular
.module('ourApp')
.controller('QuestionsShowCtrl', QuestionsShowCtrl);

QuestionsShowCtrl.$inject = ['Question', '$stateParams', 'Answer', 'CurrentUserService', '$http'];
function QuestionsShowCtrl(Question, $stateParams, Answer, CurrentUserService, $http){
  const vm = this;

// use factory to use get request


// use factory to use get request
//   vm.precolor = function(){
//     let color = '#';
//     let letters = ['000000','FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF','C0C0C0'];
//     color += letters[Math.floor(Math.random() * letters.length)];
//     document.getElementByClassName('pre').style.color = color; // Setting the random color on your div element.
// }

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

// Pass answer to selectBest function, it is saved in newAnswer(above). We validate the answer.

  vm.selectBest = function(answer, $event){
    $http({
      method: 'PUT',
      url: `http://localhost:7000/api/questions/${$stateParams.id}/answers/${answer._id}`,
      data: answer
    }).then(response => {
      for (var i = 0; i < vm.question.answers.length; i++) {
        vm.question.answers[i].chosen = false;
      }
      vm.question.answers[vm.question.answers.indexOf(answer)].chosen = true;
      angular.element($event.target).removeClass('glyphicon-edit').addClass('glyphicon-check');
    });
  };
}

// Answers are false by default until selected true here. If you choose one answer and then select another answer, the first chosen will revert back to false and second will render true.
