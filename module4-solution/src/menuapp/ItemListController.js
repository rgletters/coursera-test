(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemListController', ItemListController);

ItemListController.$inject = ['MenuDataService', 'items'];
function ItemListController(MenuDataService, items) {
  var itemList = this;
  itemList.category = items.category.name;
  itemList.items = items.menu_items;
}

})();
