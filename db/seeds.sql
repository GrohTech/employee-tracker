INSERT INTO department(dept_name)
VALUES
('Prepared Foods'),
('Grocery'), 
('Meat'),
('Produce');


INSERT INTO role(title, salary, dept_id)
VALUES
('Deli Manager', 50000, 1),
('Deli Clerk', 30000, 1),
('Grocery Manager', 50000, 2),
('Grocery Stocker', 30000, 2),
('Meat Manager', 55000, 3),
('Meat Apprentice', 35000, 3),
('Produce Manager', 50000, 4),
('Produce Clerk', 30000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Chuck', 'Cheese', 1, NULL),
('Sally', 'Sandwich', 2, 1),
('Betty', 'Box', 3, NULL),
('Patty', 'Pallet', 4, 3),
('Pete', 'Pepperoni', 5, NULL),
('Stevie', 'Steak', 6, 5),
('Ava', 'Apple', 7, NULL),
('Gaby', 'Grapefruit', 8, 7);
