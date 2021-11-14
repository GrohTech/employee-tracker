const db = require('./connection');
const consoleTable = require('console.table');
const dbQueries = require('./db-queries');
const inquirer = require('inquirer');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();


function prompt() {
    inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            {name: 'View all employees',
             value: 'view_employees'}
            //  add more choices
        ]

    }]).then(res => {
        switch(res.choice){
            case 'view_employees':
                viewEmployees()
            break
            // add more cases
        }
    })

}

function viewEmployees(){
    dbQueries.findAllEmployees().then(([roles])=>{
        console.log(roles);
        console.table(roles);
    }).then(()=>prompt())
};

prompt();

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });