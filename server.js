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
            }
            //  add more choices
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
      console.log(departments[1]);
      const deptChoices = departments.map(({ id, department }) => ({
        name: department,
        value: id
      }));
    // dbQueries.findAllDepartments().then(([roles]) => {
    //     var deptList = roles;
    //     deptChoices = deptList.map(({
    //         deptName, deptId
    //     }) => ({
    //         name: deptName,
    //         value: deptId
    //     }));
    // })
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
        console.log(res);
        dbQueries.addDepartment(res.roleName, res.roleDept, res.roleSalary).then(([newDept]) => {
            console.table(newDept);
        }).then(() => init())
    })
})};
// function addRole(){
//     dbQueries.addRole().then(([newRole])=>{
//         console.table(newRole);
//     }).then(()=>init())
// };