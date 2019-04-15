# bamazon

This is an Amazon-like storefront project created using MySQL. All interactions with the Bamazon store are made through the terminal. There are three parts to the Bamazon store: 
* Bamazon Customer
* Bamazon Manager
* Bamazon Supervisor

## Bamazon Customer
The **Bamazon Customer** program is accessed by running ``node bamazonCustomer.js`` in the terminal window. The customer is shown all of the available items in the Bamazon store. This table of data includes the id, name and price of the products for sale.  The customer is asked to enter the id and the quantity of the product they would like to purchase. If Bamazon has that quantity in stock, the customer is told the total cost of their purchase. They are then asked if they would like to purchase another item.

## Bamazon Manager
Bamazon has a very limited inventory at the moment. However, the Bamazon manager application allows the user to see which items are running low and to restock those items. The manager can also add new items to the wildly popular Bamazon store. To run Bamazon as the manager, enter ``node bamazonManager.js`` in the terminal window. The app opens by displaying the following choices:

* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product

**View Products for Sale** displays a table of the item ID, name, price and quantity for every available item.
**View Low Inventory** displays the same information as **Products for Sale** except it only includes items where the quantity in stock is <= 5.
**Add to Inventory** prompts the user to selet the product to restock and how many items to add to the inventory.
**Add New Product** allows the user to add a completely new item to the Bamazon store. It prompts the user for the product name, department name, product price and quantity.

## Bamazon Supervisor
