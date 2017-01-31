angular
  .module('ourApp')
  .factory('Question', questionFactory);

questionFactory.$inject = ['API', '$resource'];
function questionFactory(API, $resource){
  return $resource(`${API}/questions/:id`, { id: '@_id'}, {
    'query': { method: 'GET', url: `${API}/questions`, isArray: false }
  }
);
}
