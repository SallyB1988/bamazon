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
      addNewProduct();
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

function restockInventory(items, idsObj) {

  inquirer.prompt([
    {
      type: "list",
      name: "update",
      choices: items,
      message: "Select product to restock:"
    },
    {
      type: "input",
      name: "number",
      message: "Enter number of items to add to inventory:"
    }
  ])
  .then(function(resp) {
    const name = resp.update.slice(0,resp.update.indexOf('(')).trim();
    updateRecord(idsObj[name], resp.number);
  })
}

function createMenuList() {
  let items = [];
  let idsObj = {};
  const query = "SELECT product_name AS name, stock_quantity AS num, item_id AS id FROM products";
  connection.query(query,
    function(err, resp) {
      if (err) throw err;
      for (let i = 0; i < resp.length; i++) {
        items.push(`${resp[i].name} (${resp[i].num})`)
        idsObj[resp[i].name] = resp[i].id;
      }
      restockInventory(items, idsObj);
    }
  )
}

const updateRecord = (id, num) => {
  console.log(`....Update id ${id} by ${num}`);
  const query =
   `UPDATE products SET stock_quantity = (stock_quantity+${num}) WHERE item_id = ${id}`;
  connection.query(query), function(err) {
    if (err) throw err;
    console.log('Record updated...');
  }
  makeSelection();
}

function addNewProduct() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter product name:"
    },
    {
      type: "input",
      name: "department",
      message: "Enter department name:"
    },
    {
      type: "input",
      name: "price",
      message: "Enter product price:"
    },
    {
      type: "input",
      name: "quantity",
      message: "Enter quantity in stock:"
    }
  ])
  .then(function(ans) {
    let fieldsStr = '( product_name, department_name, price, stock_quantity )';
    let productStr = `( '${ans.name}', '${ans.department}', ${ans.price}, ${ans.quantity})`;


    // let query = `INSERT INTO products ? VALUES ?`;
    let query = `INSERT INTO products ${fieldsStr} VALUES ${productStr}`;
    console.log(query);
    connection.query(query,
      function(err) {
        if (err) throw err;
        console.log("New product added...");
        makeSelection();
    })

  })

  // makeSelection();

}