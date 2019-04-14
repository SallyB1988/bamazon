DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

-- products ---------------------------------------------
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) default 0,
  stock_quantity INT(8) default 0,
  product_sales DECIMAL(10,2) default 0,
  PRIMARY KEY (item_id)
);

DROP TABLE products;

SELECT * FROM products;

UPDATE products SET stock_quantity = stock_quantity + 10  WHERE product_name="KitchenAid Mixer";

SELECT * FROM products WHERE stock_quantity <= 5;

SELECT product_name AS name, stock_quantity AS num FROM products;

-- departments -------------------------------------------
CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100),
  overhead_costs DECIMAL(10,2),
  PRIMARY KEY (department_id)
);

DROP TABLE departments;