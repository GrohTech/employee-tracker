DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS employeeRole;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
dept_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
role_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
dept_id INTEGER,
INDEX idx_dept(dept_id),
CONSTRAINT fk_dept_id 
FOREIGN KEY (dept_id)
REFERENCES department(dept_id) ON DELETE SET NULL
);

CREATE TABLE employee (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER,
INDEX idx_role(role_id),
CONSTRAINT fk_role_id
FOREIGN KEY (role_id)
REFERENCES role(role_id) ON DELETE SET NULL,
manager_id INTEGER,
INDEX idx_manager(manager_id),
CONSTRAINT fk_manager_id
FOREIGN KEY (manager_id)
REFERENCES employee(id) ON DELETE SET NULL
);