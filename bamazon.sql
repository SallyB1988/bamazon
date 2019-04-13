DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(8,2) default 0,
  stock_quantity INT(8) default 0,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

UPDATE products SET stock_quantity = stock_quantity + 10  WHERE product_name="KitchenAid Mixer";

SELECT * FROM products WHERE stock_quantity <= 5;

SELECT product_name AS name, stock_quantity AS num FROM products;