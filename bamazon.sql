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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('KitchenAid Mixer', 'appliances', 259.99, 50),
       ('Stroopwafels', 'food', 17.40, 50),
       ('Comfort Sheets', 'linens', 35.75, 25),
       ('Bath Towels', 'linens', 9.68, 40),
       ('Toaster Oven', 'appliances', 63.45, 30),
       ('Krups Coffeemaker', 'appliances', 55.00, 50),
       ('Tuna Fish (6 pack)', 'food', 7.57, 50),
       ('Goldfish Crackers multi-pack', 'food', 9.98, 50),
       ('Iron Man 2', 'DVD', 9.67, 50),
       ('Mary Poppins Returns', 'DVD', 19.99, 50),
       ('Ralph Breaks the Internet', 'DVD', 19.94, 50);
