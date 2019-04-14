const inquirer = require('inquirer');
const mysql = require('mysql');
const columnify = require('columnify');
const cTable = require('console.table');


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
});

function makeSelection() {
  inquirer.prompt([
    { type: "list",
      name: "choice",
      choices: [
        "View sales by department",
        "Create new department",
        "Exit"
      ]
    }
  ])
  .then(function(resp) {
    switch (resp.choice) {
      case "View sales by department":
        salesByDept();
        break;
      case "Create new department":
        createNewDept();
        break;
      case "Exit":
        connection.end();
    }
  })
}

const salesByDept = () => {
  const query = `SELECT departments.department_id, 
    departments.department_name,
    departments.overhead_costs,
    SUM(IFNULL(products.product_sales, 0)) AS product_sales,
    (SUM(IFNULL(products.product_sales, 0)) - departments.overhead_costs) AS total_profit
  FROM products
  RIGHT JOIN departments
  ON products.department_name = departments.department_name
  GROUP BY products.department_name`;

  connection.query(query, function(err, resp) {
    if (err) throw err;
    console.log("\n\n");
    console.table(resp);
    makeSelection()
  })
}

const createNewDept = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter new department name:"
    },
    {
      type: "input",
      name: "overhead",
      message: "Enter department overhead costs:"
    }
  ])
  .then( (resp) => {
    let query = `INSERT INTO departments (department_name, overhead_costs)
    VALUES ('${resp.name}', ${resp.overhead})`;

    connection.query(query, (err) => {
      if (err) throw err;
      console.log('New department added...');
      makeSelection();
    })
  })
}