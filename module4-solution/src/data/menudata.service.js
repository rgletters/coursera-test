(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

 MenuDataService.$inject = ['$http', 'ServerUrl'];
function MenuDataService($http, ServerUrl) {
  var service = this;

  service.getAllCategories = function () {
    var response = $http({
            method: "GET",
            url: (ServerUrl + 'categories.json')
          });
    return response.then(function (result) {
        return result.data;
      })
  };

  service.getItemsForCategory = function(categoryShortName) {
    var response = $http({
            method: "GET",
            url: (ServerUrl + 'menu_items.json?category=' + categoryShortName)
          });
    return response.then(function (result) {
        return result.data;
      })
  };
}

})();
