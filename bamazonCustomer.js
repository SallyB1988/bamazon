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
    "SELECT item_id, product_name, price FROM products", function(err, resp) {
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
    checkInventory(ans);
  });
}

// check if there are enough items in the inventory
const checkInventory = (item) => {
  connection.query(
    `SELECT * FROM products WHERE item_id = ${parseInt(item.purchaseId)}`,
     function(err, resp) {
      if (err) throw err;

      let selected = resp[0];
      if (selected === undefined) {
        console.log('Invalid ID \n');
        askOrderMore();
      } else if (selected.stock_quantity < item.quantity) {
        console.log('Sorry - Not enough of that item in stock\n');
        askOrderMore();
      } else {
        let saleAmount = item.quantity*selected.price;
        console.log(`\n${item.quantity} ${selected.product_name}(s) have been purchased.   COST: $${saleAmount.toFixed(2)}\n`);
        let newQuantity = selected.stock_quantity - item.quantity;
        updateQuantity(item.purchaseId, newQuantity, saleAmount);
      }
    }
  )
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

// update the number of items for a given id
const updateQuantity = (id, quantity, saleAmount) => {
  let setDef = `stock_quantity = ${quantity}, product_sales = product_sales + ${saleAmount}`;
  let whereDef = `item_id = ${id}`;
  connection.query(`UPDATE products SET ${setDef} WHERE ${whereDef}`, function(error) {
    if (error) throw error;
    console.log("Item purchased successfully!");
    askOrderMore();
  })
}