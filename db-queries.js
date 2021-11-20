const connection = require('./connection');

class Db {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, CONCAT(manager.first_name, " ", manager.last_name) AS manager
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
    findAllRoles() {
        const sql = `
        SELECT role.title
        `;
        return this.connection.promise().query(sql)
    }
}

module.exports = new Db(connection);