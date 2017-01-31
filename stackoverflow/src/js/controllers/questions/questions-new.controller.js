angular
  .module('ourApp')
  .controller('QuestionsCreateCtrl', QuestionsCreateCtrl);

QuestionsCreateCtrl.$inject = ['$http', 'API', '$state'];
function QuestionsCreateCtrl($http, API, $state){
  const vm = this;

  vm.questionsCreate = function questionsCreate(){
    return $http
      .post(`${API}/questions`, vm.question)
      .then(() => {
        $state.go('questionsIndex');
      });
  };
}
