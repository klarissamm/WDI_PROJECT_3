angular
  .module('ourApp')
  .controller('QuestionsNewCtrl', QuestionsNewCtrl);

QuestionsNewCtrl.$inject = ['$http', 'API', '$state'];
function QuestionsNewCtrl($http, API, $state){
  const vm = this;

  vm.questionsCreate = function questionsCreate(){
    return $http
      .post(`${API}/questions`, vm.question)
      .then(() => {
        $state.go('questionsIndex');
      });
  };
}
