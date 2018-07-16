DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (

item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(40),
department_name VARCHAR (40),
price DECIMAL (10,2) NULL,
stock_quantity INTEGER NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("running shorts", "fitness", 23.5, 75), ("The Great Gatsby", "books", 10.95, 120), ("blender", "kitchen supplies", 120, 24),
("apple watch", "electronics", 450, 50), ("On the Road", "books", 19.95, 150), ("instant pot", "kitchen supplies", 44.99, 35),
("blanket", "home", 15.99, 150), ("running socks", "fitness", 10, 110), ("A Farewell to Arms", "books", 14.95, 100), ("coffee maker", "kitchen", 30, 50);

USE bamazon_db;

SELECT * FROM products