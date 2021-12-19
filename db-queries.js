const connection = require('./connection');

class Db {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name as department, CONCAT(manager.first_name, " ", manager.last_name) AS manager
        FROM employee
        LEFT JOIN role
        ON employee.role_id = role.role_id
        LEFT JOIN department
        ON role.dept_id = department.dept_id
        LEFT JOIN employee manager
        ON manager.id = employee.manager_id
        `;
        return this.connection.promise().query(sql)
    };
    findAllDepartments() {
        const sql = `
        SELECT department.dept_name AS department, department.dept_id as id
        FROM department
        `;
        return this.connection.promise().query(sql)
    };
    findAllRoles() {
        const sql = `
        SELECT role.title, role.role_id as id, department.dept_name AS department, role.salary 
        FROM role
        INNER JOIN department ON role.dept_id = department.dept_id;
        `;
        return this.connection.promise().query(sql)
    };
    addDepartment(deptName) {
        const sql = `
        INSERT INTO department (dept_name)
        VALUES (?)
        `;

        return this.connection.promise().query(sql, deptName)
    };
    addRole(roleName, roleSalary, roleDept) {
        const params = [roleName, roleSalary, roleDept];
        const sql = `
        INSERT INTO role (title, salary, dept_id)
        VALUES (?, ?, ?)
        `;
        return this.connection.promise().query(sql, params)
    };
    addEmployee(firstName, lastName, employeeRole, manager) {
        const params = [firstName, lastName, employeeRole, manager]
        const sql = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)
        `;
        console.log("----------Lucy Lemon's manager is", manager);
        return this.connection.promise().query(sql, params)
    };
    findAllManagers() {
        const sql = `
        SELECT employee.first_name, employee.last_name, employee.manager_id AS id
        FROM employee
        WHERE manager_id IS NULL
        `;
        return this.connection.promise().query(sql)
    };
    updateRole(employee, newRole) {
        const params = [newRole, employee]
        console.log('db update role', employee, newRole);
        const sql = `
        UPDATE employee SET role_id = ?
        WHERE id = ?
        `;
        return this.connection.promise().query(sql, params)
    };
}

module.exports = new Db(connection);