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
    }
    findAllDepartments() {
        const sql = `
        SELECT department.dept_name AS department, department.dept_id as id
        FROM department
        `;
        return this.connection.promise().query(sql)
    }
    findAllRoles() {
        const sql = `
        SELECT role.title, role.role_id as id, department.dept_name AS department, role.salary 
        FROM role
        INNER JOIN department ON role.dept_id = department.dept_id;
        `;
        return this.connection.promise().query(sql)
    }
    addDepartment() {
        const sql = `
        INSERT INTO department (name)
        VALUES (?);
        `;
        return this.connection.promise().query(sql)
    }

}

module.exports = new Db(connection);