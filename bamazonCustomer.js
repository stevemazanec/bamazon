var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
})

function buyProducts() {
    console.log("Displaying all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("Item: " + res[i].product_name);
            console.log("ID: " + res[i].item_id);
            console.log("Price $" + res[i].price);
            console.log("-------------------")
        }
        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is the ID of the product you wish to buy?",
                    name: "product"
                },
                {
                    type: "input",
                    message: "How many would you like to buy?",
                    name: "quantity",
                },
            ])
            .then(function (userOrder) {
                connection.query("SELECT stock_quantity, price, product_sales FROM products WHERE item_id =" + userOrder.product, function (err, res) {
                    if (err) throw err;
                    var inStock = (res[0].stock_quantity);
                    var price = (res[0].price);
                    var totalSales = (res[0].product_sales);
                    var totalCost = 0;
                    if (inStock >= userOrder.quantity) {
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: inStock - userOrder.quantity
                                },
                                {
                                    item_id: userOrder.product
                                }
                            ],
                        );
                        totalCost = price * userOrder.quantity;
                        totalSales += totalCost
                        console.log("Total cost: $" + totalCost);
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    product_sales: totalSales
                                },
                                {
                                    item_id: userOrder.product
                                }
                            ],
                        );
                    }
                    else {
                        console.log("Insufficient quantity!")
                    }
                })

            })

    });
}

buyProducts();