(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var showToBuyList = this;

  showToBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  showToBuyList.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };

  showToBuyList.isEmpty = function () {
    return ShoppingListCheckOffService.isToBuyListEmpty();
  }
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var showBoughtList = this;

  showBoughtList.items = ShoppingListCheckOffService.getBoughtItems();

  showBoughtList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };

  showBoughtList.isEmpty = function () {
    return ShoppingListCheckOffService.isBoughtListEmpty();
  }
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    }
  ];

  var boughtItems = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.buyItem = function (itemIndex) {
    var boughtItem = toBuyItems.splice(itemIndex, 1);
    boughtItems.push(boughtItem[0]);
  };

  service.removeItem = function (itemIndex) {
    var removeItem = boughtItems.splice(itemIndex, 1);
    toBuyItems.push(removeItem[0]);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.isToBuyListEmpty = function () {
    return toBuyItems.length == 0;
  }

  service.isBoughtListEmpty = function () {
    return boughtItems.length == 0;
  }
}

})();
