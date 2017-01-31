angular
  .module('ourApp')
  .controller('QuestionsCreateCtrl', QuestionsCreateCtrl);

QuestionsCreateCtrl.$inject = ['$http', 'API', '$state', 'Language', 'TokenService', '$scope'];
function QuestionsCreateCtrl($http, API, $state, Language, TokenService, $scope){
  const vm = this;
  vm.languages = Language.query();

  vm.assignLanguage = function(language) {
    vm.question.language = language;
  };

  vm.questionsCreate = function questionsCreate(){
    return $http
      .post(`${API}/questions`, vm.question)
      .then(() => {
        $state.go('languages');
      });
  };
}
