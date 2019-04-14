SELECT * FROM departments;

-- Get total sale for a specific department
SELECT departments.department_id,
 departments.department_name,
 departments.overhead_costs,
 SUM(products.product_sales) AS product_sales,
 (SUM(products.product_sales) - departments.overhead_costs) AS total_profit FROM products
RIGHT JOIN departments
ON products.department_name = departments.department_name
WHERE products.department_name = "appliances";