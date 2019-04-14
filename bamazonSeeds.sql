INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('KitchenAid Mixer', 'appliances', 259.99, 50),
       ('Stroopwafels', 'food', 17.40, 50),
       ('Comfort Sheets', 'linens', 35.75, 25),
       ('Bath Towels', 'linens', 9.68, 4),
       ('Toaster Oven', 'appliances', 63.45, 30),
       ('Krups Coffeemaker', 'appliances', 55.00, 50),
       ('Tuna Fish (6 pack)', 'food', 7.57, 50),
       ('Goldfish Crackers multi-pack', 'food', 9.98, 50),
       ('Iron Man 2', 'dvd', 9.67, 5),
       ('Mary Poppins Returns', 'dvd', 19.99, 50),
       ('Ralph Breaks the Internet', 'dvd', 19.94, 50);

INSERT INTO departments (department_name, overhead_costs)   
VALUES ('appliances', 80),
       ('food', 50),
       ('linens', 10),
       ('dvd', 10);
