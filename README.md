# bamazon

This is an Amazon-like storefront project created using MySQL. All interactions with the Bamazon store are made through the terminal. There are three parts to the Bamazon store: 
* Bamazon Customer
* Bamazon Manager
* Bamazon Supervisor

##Bamazon Customer
The **Bamazon Customer** program is accessed by running ``node bamazonCustomer.js`` in the terminal window. The customer is shown all of the available items in the Bamazon store. This table of data includes the id, name and price of the products for sale.  The customer is asked to enter the id and the quantity of the product they would like to purchase. If Bamazon has that quantity in stock, the customer is told the total cost of their purchase. They are then asked if they would like to purchase another item.

##Bamazon Manager
Unfortunately, Bamazon has a very limited inventory at the moment. However, the Bamazon manager can see which items are running low and can restock those items. The manager can also add new items to the wildly popular Bamazon store. To run Bamazon as the manager, enter ``node bamazonManager.js`` in the terminal window.
