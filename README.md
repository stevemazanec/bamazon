This is a CLI app that uses node.js and MySQL to create an Amazon-like frontpage, where customers can place orders and be given a total, managers can view and update the products on sale, and supervisors can review the stores budget. 

The first view is that of the customer, where all the products on sale are listed and the customer can place an order and receive the total cost of the order:

![product list](/images/customer.png)

If the customer tries to order a greater quantity than is in stock, they will receive an error message:

![insufficient quantity](/images/customer2.png)

The second view is for a manager. The manager can choose from a dropdown list of 4 options:

![dropdown menu](/images/manager1.png)

The first option the manager has is to view the store's complete stock, with each item and its quantity:

![store stock](/images/manager2.png)

The second option the manager has is to view only those items that have fewer than 5 left in stock:

![low stock](/images/manager3.png)

The third option the manager has is to add to an item's inventory (in this case item 3):

![add inventory](/images/manager4.png)

Item 3 now has 2 more in stock:

![item added](/images/manager5.png)

The fourth and final option for a manager is to add an entirely new item to the store:

![new item](/images/manager6.png)

As you can see, the list of items for sale now includes the running shorts just added:

![running shorts](/images/manager7.png)

The third view is that of the supervisor, who can either view the store's finances, or add a department:

![supervisor view](/images/supervisor1.png)

The supervisor can view a breakdown by department:
![departments](/images/supervisor2.png)

Finally, the supervisor can create a brand new department:

![new department](/images/supervisor3.png)