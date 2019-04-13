const inquirer = require('inquirer');
const mysql = require('mysql');
const columnify = require('columnify');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  makeSelection();
})

function makeSelection() {

  inquirer.prompt([
    {
      type: "list",
      name: "choice",
      choices: [
        "View products for sale",
        "View low inventory",
        "Add to inventory",
      "Add new product",
      "Exit"
    ]
  }
])
.then(function(resp) {
  switch (resp.choice) {
    case "View products for sale":
      showInventory();
      break;
    case "View low inventory":
      showLowInventory();
      break;
    case "Add to inventory":
      createMenuList();
      break;
    case "Add new product":
      break;
    case "Exit":
      connection.end();
      break;
  }
})

}

function showInventory() {
  let query = "SELECT * FROM products";
  connection.query(query, 
    function(err, resp) {
      if (err) throw err;
      console.log(columnify(resp));
      makeSelection();
  })
}

function showLowInventory() {
  let query = "SELECT * FROM products WHERE stock_quantity <= 5";
  connection.query(query,
    function(err,resp) {
      if (err) throw err;
      console.log(columnify(resp));
      makeSelection();
    })
}

function restockInventory(items) {
  console.log(items);
  inquirer.prompt([
    {
      type: "list",
      name: "update",
      choices: items
    }
  ])
  .then(function(resp) {
    const name = resp.update.slice(0,resp.update.indexOf('('));
    console.log(name);
    makeSelection();
  })
}

function createMenuList() {
  let items = [];
  const query = "SELECT product_name AS name, stock_quantity AS num FROM products";
  connection.query(query,
    function(err, resp) {
      if (err) throw err;
      for (let i = 0; i < resp.length; i++) {
        items.push(`${resp[i].name} (${resp[i].num})`)
      }
      restockInventory(items);
    }
  )
}