(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ServerUrl', "https://davids-restaurant.herokuapp.com/")
.directive('foundItems', FoundItemsDirective)

function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller:  FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;

  ctrl.NarrowIt = function () {
    var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
    promise.then(getMatchedMenuItems);
  }

  function getMatchedMenuItems(response) {
    ctrl.found = response;
    ctrl.nothind
  }

  ctrl.nothing = function () {
    return (ctrl.found !== undefined) && ctrl.found.length == 0;
  }

  ctrl.removeItem = function (itemIndex) {
    ctrl.found.splice(itemIndex, 1);
  }
}

MenuSearchService.$inject = ['$http', 'ServerUrl'];
function MenuSearchService($http, ServerUrl) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      var response = $http({
        method: "GET",
        url: (ServerUrl + 'menu_items.json')
      });

      return response.then(function (result) {
        var foundItems = [];
        for (var i = 0; i < result.data.menu_items.length; i++) {
          if (result.data.menu_items[i].description.indexOf(searchTerm) !== -1) {
            foundItems.push(result.data.menu_items[i]);
          }
        }
        // console.log(foundItems.length + ' of ' + result.data.menu_items.length);
        return foundItems;
      });
    }

}

})();
