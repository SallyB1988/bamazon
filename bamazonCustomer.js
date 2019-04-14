var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require('columnify');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  getOrder();
});

function getOrder() {
  console.log('\n\n************************** BAMAZON INVENTORY ******************************\n');
  connection.query(
    "SELECT * FROM products", function(err, resp) {
      if (err) throw err;
      console.log(columnify(resp));
      console.log("\n");
      orderItem(resp);
    }
  )
}

// function which prompts the user for which item they would like to buy
function orderItem(data) {
  inquirer
  .prompt([
    {
      name: "purchaseId",
      type: "input",
      message: "Enter the ID of the item to purchase:",
    },
    {
      name: "quantity",
      type: "input",
      message: "Enter quantity:",
      filter: (v) => parseInt(v),
    }
  ])
  .then(function(ans) {
    checkInventory(data, ans);
    askOrderMore();
  });
}

// check if there are enough items in the inventory
const checkInventory = (inventory, buy) => {
  let selected = getItem(inventory, buy.purchaseId);
  if (selected === -1) {  // item_ID not found
    return;
  } else if (selected.stock_quantity < buy.quantity) {
    console.log('Sorry - Not enough of that item in stock');
    return;
  } else {
    let saleAmount = buy.quantity*selected.price;
    console.log(`\n${buy.quantity} ${selected.product_name}(s) have been purchased.   COST: $${saleAmount.toFixed(2)}\n`);
    let newQuantity = selected.stock_quantity - buy.quantity;
    updateQuantity(buy.purchaseId, newQuantity, saleAmount);
  }
}

// Ask user if they want to order any other items
function askOrderMore() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Order another item?",
      default: true
    },
  ])
  .then(function(resp) {
    if (resp.confirm) {
      getOrder();
    } else {
      connection.end();
    }
  });
}

// Return just the item information that matches the specified id value
const getItem = (arr, id) => {
  for (let i = 0; i < arr.length; i++) {
    if (parseInt(arr[i].item_id) === parseInt(id)) {
      return arr[i];
    }
  }
  console.log(`ERROR: ITEM_ID: ${id} not found`);
  return -1;    // item not found
}

// update the number of items for a given id
const updateQuantity = (id, quantity, saleAmount) => {
  let setDef = `stock_quantity = ${quantity}, product_sales = product_sales + ${saleAmount}`;
  let whereDef = `item_id = ${id}`;
  connection.query(`UPDATE products SET ${setDef} WHERE ${whereDef}`),function(error) {
      if (error) throw error;
      console.log("Item purchased successfully!");
      askOrderMore();
    }
  }