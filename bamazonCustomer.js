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
  // run the start function after the connection is made to prompt the user
  getOrder();
});

function getOrder() {
  console.log('\n\n************************** BAMAZON INVENTORY ******************************\n');
  connection.query(
    "SELECT * FROM products", function(err, resp) {
      if (err) throw err;
      console.log(columnify(resp));   // NICE! Displays data in columns
      console.log("\n");
      orderItem(resp);
    }
  )
}

// function which prompts the user for what action they should take
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

const checkInventory = (inventory, buy) => {
  let selected = getItem(inventory, buy.purchaseId);
  if (selected === -1) {  // item_ID not found
    return;
  } else if (selected.stock_quantity < buy.quantity) {
    console.log('Sorry - Not enough of that item in stock');
    return;
  } else {
    let cost = buy.quantity*selected.price;
    console.log(`\n${buy.quantity} ${selected.product_name}(s) have been purchased.   COST: $${cost.toFixed(2)}\n`);
    let newQuantity = selected.stock_quantity - buy.quantity;
    updateQuantity(buy.purchaseId, newQuantity);
  }
}

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

const getItem = (arr, id) => {
  for (let i = 0; i < arr.length; i++) {
    if (parseInt(arr[i].item_id) === parseInt(id)) {
      return arr[i];
    }
  }
  console.log(`ERROR: ITEM_ID: ${id} not found`);
  return -1;    // item not found
}


const updateQuantity = (id, quantity) => {
  connection.query("UPDATE products SET ? WHERE ?",
  [
    {
      stock_quantity: quantity
    },
    {
        item_id : id
    },
  ]),function(error) {
      if (error) throw error;
      console.log("Item purchased successfully!");
      askOrderMore();
    }
  }