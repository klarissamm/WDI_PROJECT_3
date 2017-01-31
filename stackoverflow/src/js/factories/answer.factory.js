angular
  .module('ourApp')
  .factory('Answer', answerFactory);

answerFactory.$inject = ['API', '$resource'];
function answerFactory(API, $resource){
  return $resource(`${API}/answers/:id`, { id: '@_id'}, {
    'query': { method: 'GET', isArray: true }
  });
}
