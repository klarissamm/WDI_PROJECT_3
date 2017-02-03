angular
  .module('ourApp')
  .factory('Language', languageFactory);

languageFactory.$inject = ['API', '$resource'];
function languageFactory(API, $resource){
  return $resource(`${API}/languages/:id`, { id: '@_id'}, {
    'query': { method: 'GET', isArray: true }
  });
}
