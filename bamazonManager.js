var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon_db"
});


inquirer.prompt({
    name: "choice",
    type: "list",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    message: "What would you like to do?"
}).then(function (manager) {
    if (manager.choice === "View Products for Sale") {
        viewInventory();
    }
    else if (manager.choice === "View Low Inventory") {
        lowInventory();
    }
    else if (manager.choice === "Add to Inventory") {
        addInventory();
    }
    else if (manager.choice === "Add New Product") {
        newProduct();
    }
})

var viewInventory = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        for (i = 0; i < res.length; i++) {
            console.log("Item: " + res[i].product_name);
            console.log("ID: " + res[i].item_id);
            console.log("Price $" + res[i].price);
            console.log("Quantity Remaining: " + res[i].stock_quantity);
            console.log("-------------------")
        }
    }
    )
}

var lowInventory = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        for (j = 0; j < res.length; j++) {
            if (res[j].stock_quantity < 5) {
                console.log("Item: " + res[j].product_name);
                console.log("ID: " + res[j].item_id);
                console.log("Price $" + res[j].price);
                console.log("Quantity Remaining: " + res[j].stock_quantity);
                console.log("-------------------")
            }
        }
    })
}

var addInventory = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("Item: " + res[i].product_name);
            console.log("ID: " + res[i].item_id);
            console.log("Price $" + res[i].price);
            console.log("Quantity Remaining: " + res[i].stock_quantity);
            console.log("-------------------")
        }
        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is the ID of the product you wish to add more of?",
                    name: "product"
                },
                {
                    type: "input",
                    message: "How many would you like to add?",
                    name: "quantity",
                },
            ])
            .then(function (managerOrder) {
                connection.query("SELECT stock_quantity FROM products WHERE item_id =" + managerOrder.product, function (err, res) {
                    if (err) throw err;
                    var inStock = (res[0].stock_quantity);

                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: parseFloat(inStock) + parseFloat(managerOrder.quantity)
                            },
                            {
                                item_id: managerOrder.product
                            }
                        ],
                        function (err, res) {
                            console.log(res.affectedRows + " product updated!\n");


                        }
                    );

                })

            })

    });
}

var newProduct = function () {
    inquirer
        .prompt([

            {
                type: "input",
                message: "What is the product you wish to add?",
                name: "product"
            },
            {
                type: "input",
                message: "What is the department it belongs to?",
                name: "department"
            },
            {
                type: "input",
                message: "What is the selling price?",
                name: "price"
            },
            {
                type: "input",
                message: "How many do you want to put in stock?",
                name: "quantity"
            }
        ])
        .then(function (answers) {
            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answers.product,
                    department_name: answers.department,
                    price: answers.price,
                    stock_quantity: answers.quantity
                },
                function (err, res) {
                    console.log(res.affectedRows + " item added!\n");
                }
            );

        })
}