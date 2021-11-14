INSERT INTO department(dept_name)
VALUES
('Prepared Foods'),
('Grocery'), 
('Meat'),
('Produce'),
('Front End');

INSERT INTO role(title, salary, dept_id)
VALUES
('Deli Clerk', 30000, 1),
('Stocker', 30000, 2),
('Apprentice', 35000, 3),
('Produce Manager', 50000, 4),
('Cashier', 30000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Anthony', 'Schicker', 1, NULL),
('Jerett', 'Gibson', 2, NULL),
('Adam', 'Romanak', 3, NULL),
('Andrea', 'Groh', 4, 1),
('Rhesia', 'Baron', 5, NULL);