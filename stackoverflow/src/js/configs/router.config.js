angular
  .module('ourApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/js/views/users/index.html',
    controller: 'UsersIndexCtrl',
    controllerAs: 'usersIndex'
  })
  .state('languages', {
    url: '/languages',
    templateUrl: '/js/views/languages/index.html',
    controller: 'LanguagesIndexCtrl',
    controllerAs: 'languageIndex'
  })
  .state('userShow', {
    url: '/user/:id',
    templateUrl: '/js/views/users/show.html',
    controller: 'UsersShowCtrl',
    controllerAs: 'usersShow'
  })
  .state('questions', {
    url: '/questions',
    templateUrl: '/js/views/questions/index.html',
    controller: 'QuestionsIndexCtrl',
    controllerAs: 'questionsIndex'
  })
  .state('questionsNew', {
    url: '/questions/new',
    templateUrl: '/js/view/questions/new.html',
    controller: 'QuestionsNewCtrl',
    controllerAs: 'questionsNew'
  });

  $urlRouterProvider.otherwise('/');
}
