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
            {name: 'View all employees',
             value: 'view_employees'},
            {name: 'View all departments',
             value: 'view_departments'},
            {name: 'View all roles',
            value: 'view_roles'},
            {name: 'Add a department',
            value: 'add_department'}
            
            //  add more choices
        ]

    }]).then(res => {
        switch(res.choice){
            case 'view_employees': viewEmployees();
            break;
            case 'view_departments': viewDepartments();
            break;
            case 'view_roles': viewRoles();
            break;
            case'add_department': addDepartment();
            break;
        };
    });

};

function viewEmployees(){
    dbQueries.findAllEmployees().then(([employees])=>{
        console.table(employees);
    }).then(()=>init())
};
function viewDepartments(){
    dbQueries.findAllDepartments().then(([departments])=>{
        console.table(departments);
    }).then(()=>init())
};
function viewRoles(){
    dbQueries.findAllRoles().then(([roles])=>{
        console.table(roles);
    }).then(()=>init())
};
function addDepartment(){

    // switch(res.add){
    //     case 'add_department': addDepartment();
    //     break;

    dbQueries.addDepartment().then(([newDept])=>{
        console.table(newDept);
    }).then(()=>init())
};
// function addRole(){
//     dbQueries.addRole().then(([newRole])=>{
//         console.table(newRole);
//     }).then(()=>init())
// };