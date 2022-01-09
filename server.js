const db = require('./connection');
const consoleTable = require('console.table');
const dbQueries = require('./db-queries');
const inquirer = require('inquirer');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        init();
    });
});

function init() {
    inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            {
                name: 'View all employees',
                value: 'view_employees'
            },
            {
                name: 'View all departments',
                value: 'view_departments'
            },
            {
                name: 'View all roles',
                value: 'view_roles'
            },
            {
                name: 'Add a department',
                value: 'add_department'
            },
            {
                name: 'Add a role',
                value: 'add_role'
            },
            {
                name: 'Add an employee',
                value: 'add_employee'
            },
            {
                name: "Update an employee's role",
                value: 'update_role'
            }
        ]

    }]).then(res => {
        switch (res.choice) {
            case 'view_employees': viewEmployees();
                break;
            case 'view_departments': viewDepartments();
                break;
            case 'view_roles': viewRoles();
                break;
            case 'add_department': addDepartment();
                break;
            case 'add_role': addRole();
                break;
            case 'add_employee': addEmployee();
                break;
            case 'update_role': updateRole();
                break;
        };
    });

};

function viewEmployees() {
    dbQueries.findAllEmployees().then(([employees]) => {
        console.table(employees);
    }).then(() => init())
};
function viewDepartments() {
    dbQueries.findAllDepartments().then(([departments]) => {
        console.table(departments);
    }).then(() => init())
};
function viewRoles() {
    dbQueries.findAllRoles().then(([roles]) => {
        console.table(roles);
    }).then(() => init())
};
function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'deptName',
        message: 'What department would you like to add?',
        validate: deptInput => {
            if (deptInput) {
                return true;
            } else {
                console.log('Please enter the department name.');
                return false;
            }
        }
    }]).then(res => {
        dbQueries.addDepartment(res.deptName).then(([newDept]) => {
            console.table(newDept);
        }).then(() => init())
    })
};
function addRole() {
    dbQueries.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const deptChoices = departments.map(({ id, department }) => ({
                name: department,
                value: id
            }));
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'What role would you like to add?',
                    validate: roleNameInput => {
                        if (roleNameInput) {
                            return true;
                        } else {
                            console.log('Please enter the name of the role.');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: 'What is the salary of this role?',
                    validate: salaryInput => {
                        if (salaryInput) {
                            return true;
                        } else {
                            console.log('Please enter the salary for this role.');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'roleDept',
                    message: 'What department does this role belong to?',
                    choices: deptChoices,
                    validate: roleDeptInput => {
                        if (roleDeptInput) {
                            return true;
                        } else {
                            console.log('Please enter the department this new role belongs to.');
                            return false;
                        }
                    }
                }
            ]).then(res => {
                dbQueries.addRole(res.roleName, res.roleSalary, res.roleDept).then(([newRole]) => {
                    console.table(newRole);
                }).then(() => init())
            })
        })
};
function addEmployee() {
    dbQueries.findAllRoles()
        .then(([rows]) => {
            let employeeRoles = rows;
            const roleChoices = employeeRoles.map(({ id, title }) => ({
                name: title,
                value: id
            }));
            dbQueries.findAllManagers()
                .then(([rows]) => {
                    let managers = rows;
                    const managerChoices = managers.map(({ role_id, first_name, last_name }) => ({
                        name: first_name + " " + last_name,
                        value: role_id
                    }));
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: "Enter the employee's first name.",
                            validate: firstNameInput => {
                                if (firstNameInput) {
                                    return true;
                                } else {
                                    console.log('Please enter a first name.');
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: "Enter the employee's last name",
                            validate: lastNameInput => {
                                if (lastNameInput) {
                                    return true;
                                } else {
                                    console.log('Please enter a last name.');
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'employeeRole',
                            message: "What is the employee's role?",
                            choices: roleChoices,
                            validate: roleSelect => {
                                if (roleSelect) {
                                    return true;
                                } else {
                                    console.log('Please select a role.');
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Who is the employee's manager?",
                            choices: managerChoices,
                            validate: managerSelect => {
                                if (managerSelect) {
                                    return true;
                                } else {
                                    console.log('Please select a manager.');
                                    return false;
                                }
                            }
                        }
                    ]).then(res => {
                        dbQueries.addEmployee(res.firstName, res.lastName, res.employeeRole, res.manager).then(([newEmployee]) => {
                            console.table(newEmployee);
                        }).then(() => init())
                    })
                })
        })
};
function updateRole() {
    dbQueries.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id
            }));
            dbQueries.findAllRoles()
                .then(([rows]) => {
                    let employeeRoles = rows;
                    const roleChoices = employeeRoles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'employee',
                            message: "Which employee would you like to update?",
                            choices: employeeChoices,
                            validate: employeeSelect => {
                                if (employeeSelect) {
                                    return true;
                                } else {
                                    console.log('Please select an employee.');
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'newRole',
                            message: "What is the employee's new role?",
                            choices: roleChoices,
                            validate: roleSelect => {
                                if (roleSelect) {
                                    return true;
                                } else {
                                    console.log('Please select a role.');
                                    return false;
                                }
                            }
                        }
                    ]).then(res => {
                        dbQueries.updateRole(res.employee, res.newRole).then(([updateRole]) => {
                            console.table(updateRole);
                        }).then(() => init())
                    })
                })
        })
};