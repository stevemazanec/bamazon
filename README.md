This is a CLI app that uses node.js and MySQL to create an Amazon-like frontpage, where customers can place orders and be given a total, managers can view and update the products on sale, and supervisors can review the stores budget. 

The first view is that of the customer, where all the products on sale are listed and the customer can place an order and receive the total cost of the order:

![product list](/images/customer.png)

If the customer tries to order a greater quantity than is in stock, they will receive an error message:

![insufficient quantity](/images/customer2.png)

The second view is for a manager. The manager can choose from a dropdown list of 4 options:

![dropdown menu](/images/manager1.png)

The first option the manager has is to view the store's complete stock, with each item and its quantity:

![store stock](/images/manager2.png)