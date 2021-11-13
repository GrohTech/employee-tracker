DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS employeeRole;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE employeeRole (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
CONSTRAINT fk_department_id 
FOREIGN KEY (department_id)
REFERENCES department(department_id) ON UPDATE CASCADE ON DELETE RESTRICT;
);

-- CREATE TABLE employee (
-- id; INTEGER AUTO_INCREMENT PRIMARY KEY,
-- first_name VARCHAR(30) NOT NULL,
-- last_name VARCHAR(30) NOT NULL,
-- CONSTRAINT fk_employeeRole_id
-- FOREIGN KEY (employeeRole_id)
-- REFERENCES employeeRole(employeeRole_id) ON UPDATE CASCADE,
-- manager_id
-- CONSTRAINT fk_manager_id
-- FOREIGN KEY (manager_id)
-- REFERENCES employee(manager_id) ON DELETE SET NULL;
-- );