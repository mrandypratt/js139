/*
      
I) ItemsManager: Create, Update, Delete, Query
  1. create
    - SKU Code
      - Unique ID:
        - First 3 Letters of item (spaces excluded)
        - First 2 letters of Category
    - Item Name: 
      - Minimum 5 Characters (spaces excluded)
    - Category:
      - Minimum 5 Characters (spaces excluded)
      - One Word Max
    - Quantity:
      - Must not be blank
    - returns false if not successful
  2. update
    - parameters:
      - SKU
      - Object
    - Updates information
  3. delete
    - parameters:
      - SKU
    - Deletes Item
  4. items
    - Returns all Items
  5. inStock
    - Returns all items with quantity greater than 0
  6. itemsInCategory 
    - parameters: category
    - returns all item in category
  
II) ReportManager (Uses Report Object)
  1. init
    - parameters: ItemsManager object
    - Assigns object to itemst property
  2. createReporter
    - parameters: SKU Doce
    - returns object
      - itemInfo method: log all properties as key:value pairs
  3. reportInStock
    - log to console item names of all items in stock as CSV
- All Item Report

*/

let { log } = require("./log");

let ItemCreator = (() => {
  function fiveCharNoSpaces(string) {
    let matches = string.match(/[a-z]/ig);
    return matches.length >= 5;
  }
  
  function validName(name) {
    return fiveCharNoSpaces(name);
  }
  
  function validCategory(category) {
    return (fiveCharNoSpaces(category) && 
      (category.match(/[\s]/) === null));
  }
  
  function validQuantity(quantity) {
    return (!isNaN(quantity) && quantity >= 0);
  }
  
  function getSKULetters(string, numChars) {
    let SKULetters = "";
    
    for (let letter = 0; letter < string.length; letter++) {
      if (string[letter] !== " ") {
        SKULetters += string[letter].toUpperCase();
      }
      if (SKULetters.length >= numChars) break;
    }
    
    return SKULetters;
  }
  
  return function(name, category, quantity) {
    if (validName(name) && validCategory(category) && validQuantity(quantity)) {
      this.SKU = getSKULetters(name, 3) + getSKULetters(category, 2);
      this.name = name;
      this.category = category;
      this.quantity = quantity;
    } else {
      return { notValid: true };
    }
  };
})();

let ItemManager = (() => {
  
  return {
    items: [],
    
    create(name, category, quantity) {
      let item = new ItemCreator(name, category, quantity);
      if (item.notValid) {
        return false;
      }
      
      this.items.push(item);
    },
    
    update(SKU, obj) {
      let matches = [];
      this.items.forEach(item => {
        if (item.SKU === SKU) {
          Object.assign(item, obj);
          matches.push(item);
        }
      });
      return matches;
    },
    
    delete(SKU) {
      let removalIndices = [];
      this.items.forEach((item, index) => {
        if (item.SKU === SKU) {
          removalIndices.unshift(index);
        }
      });
      removalIndices.forEach(index => {
        this.items.splice(index, 1);
      });
    },
    
    inStock() {
      return this.items.filter(item => {
        return item.quantity > 0;
      });
    },
    
    itemsInCategory(category) {
      return this.items.filter(item => {
        return item.category === category;
      });
    },
  };
})();

let ReportManager = (() => {
  let list;
  return {
    init(managerObj) {
      list = managerObj.items;
    },
    
    createReporter(SKU) {
      return {
        itemInfo() {
          let filtered = list.filter(item => {
            return item.SKU === SKU;
          });
          
          filtered.forEach(item => {
            for (let key in item) {
              console.log(`${key}: ${item[key]}`);
            }
          });
        }
      };
    },
    
    reportInStock() {
      let stockedItems = [];
      list.forEach(item => {
        if (item.quantity > 0) {
          stockedItems.push(item.name);
        }
      });
      return stockedItems.join(",");
    }
  };
})();

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item
// returns list with the 4 valid items
log(ItemManager.items);

ReportManager.init(ItemManager);
// logs soccer ball,football,kitchen pot
log(ReportManager.reportInStock());

ItemManager.update('SOCSP', { quantity: 0 });
// returns list with the item objects for football and kitchen pot
log(ItemManager.inStock());
// football,kitchen pot
log(ReportManager.reportInStock());

// returns list with the item objects for basket ball, soccer ball, and football
log(ItemManager.itemsInCategory('sports'));

ItemManager.delete('SOCSP');
// returns list the remaining 3 valid items (soccer ball is removed from the list)
log(ItemManager.items);

let kitchenPotReporter = ReportManager.createReporter('KITCO');
log(kitchenPotReporter);
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10

let footballSportsReporter = ReportManager.createReporter('FOOSP');
log(footballSportsReporter);
footballSportsReporter.itemInfo();

kitchenPotReporter.itemInfo();