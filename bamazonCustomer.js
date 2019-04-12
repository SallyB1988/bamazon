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
  showInventory();
});

function showInventory() {
  console.log('\n\n************************** BAMAZON INVENTORY ******************************\n');
  connection.query(
    "SELECT * FROM products", function(err, resp) {
      if (err) throw err;
      console.log(columnify(resp));   // NICE! Displays data in columns
      start(resp);
    }
  )
}

// function which prompts the user for what action they should take
function start(data) {
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
  });
}

const checkInventory = (inventory, buy) => {
  let selected = getItem(inventory, buy.purchaseId);
  if (selected.stock_quantity < buy.quantity) {
    console.log('Sorry - Not enough of that item in stock');
  } else {
    console.log(`${buy.quantity} ${selected.product_name}(s) have been purchased.`);
    let newQuantity = selected.stock_quantity - buy.quantity;
    updateQuantity(buy.purchaseId, newQuantity);
  }
  connection.end();
}


const getItem = (arr, id) => {
  for (let i = 0; i < arr.length; i++) {
    if (parseInt(arr[i].item_id) === parseInt(id)) {
      return arr[i];
    }
  }
  console.log('ERROR');
  return null;
}


const updateQuantity = (id, quantity) => {
  console.log('quantity: ', quantity);
  console.log('id: ', id);

  connection.query("UPDATE products SET ? WHERE ?",
  [
    {
      stock_quantity: quantity
    },
    {
        item_id : id
    },
  ]),function(error) {
    if (error) throw err;
    console.log("Item purchased successfully!");
    // start();
  }
  }