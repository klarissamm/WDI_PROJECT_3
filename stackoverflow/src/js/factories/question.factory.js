angular
  .module('ourApp')
  .factory('Language', languageFactory);

languageFactory.$inject = ['API', '$resource'];
function languageFactory(API, $resource){
  return $resource(`${API}/question/:id`, { id: '@_id'});
}
