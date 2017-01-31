angular
  .module('ourApp')
  .factory('Language', languageFactory);

languageFactory.$inject = ['API', '$resource'];
function languageFactory(API, $resource){
  return $resource(`${API}/languages/:id`, { id: '@_id'}, {
  });
}


// { 'get':    {method:'GET'},
//   'save':   {method:'POST'},
//   'query':  {method:'GET', isArray:true},
//   'remove': {method:'DELETE'},
//   'delete': {method:'DELETE'} };
