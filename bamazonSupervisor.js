var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("easy-table");

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

inquirer.prompt({
    name: "choice",
    type: "list",
    choices: ["View Product Sales by Department", "Create New Department"],
    message: "What would you like to do?"
}).then(function (supervisor) {
    if (supervisor.choice === "View Product Sales by Department") {
        viewSales();
    }
    else if (supervisor.choice === "Create New Department") {
        createDepartment();
    }
})

var viewSales = function () {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        var t = new table
        for (j = 0; j < res.length; j++) {
            t.cell("department_id", res[j].department_id)
            t.cell("department_name", res[j].department_name)
            t.cell("over_head_costs", res[j].over_head_costs)
            t.newRow()
        }
        console.log(t.toString());
    })

}

var createDepartment = function () {
    connection.query("SELECT department_name FROM departments", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("Department: " + res[i].department_name);
            console.log("-------------------")
        }
        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is the name of the department you wish to create?",
                    name: "department"
                },
                {
                    type: "input",
                    message: "What is the overhead cost of the department?",
                    name: "overhead",
                },
            ])
            .then(function (supervisorOrder) {
                connection.query(
                    "INSERT INTO departments SET ?",

                    {
                        department_name: supervisorOrder.department,
                        over_head_costs: supervisorOrder.overhead
                    },
                    function (err, res) {
                        console.log(res.affectedRows + " department created!\n");
                    }
                );

            })

    })

}