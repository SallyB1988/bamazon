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
});

function makeSelection() {
  inquirer.prompt([
    {
      type: "input",
      name: "sales",
      message: "View sales by department"
    },
    {
      type: "input",
      name: "newDept",
      message: "Create new department"
    }
  ])
  .then(function(resp) {
    switch (resp.name) {
      case "sales":
        salesByDept();
        break;
      case "newDept":
        createNewDept();
        break;
    }
  })
}

const salesByDept() => {
  const query = "SELECT "
}