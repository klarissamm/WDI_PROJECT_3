angular
.module('ourApp')
.controller('QuestionsCreateCtrl', QuestionsCreateCtrl);

QuestionsCreateCtrl.$inject = ['$http', 'API', '$state', 'Language'];
function QuestionsCreateCtrl($http, API, $state, Language){
  const vm = this;
  vm.languages = Language.query();

  vm.assignLanguage = function(language) {
    vm.question.language = language;
  };

  vm.questionsCreate = function questionsCreate(){
    if(vm.question.language){
      return $http
      .post(`${API}/questions`, vm.question)
      .then((response) => {
        $state.go('questionsShow', { id: response.data._id });
      });
    }
  };

}
