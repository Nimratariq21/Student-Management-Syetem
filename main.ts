#! /usr/bin/env node

import inquirer from "inquirer";

class student{
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance  = 100;
    }

    enroll_course(course: string){
        this.courses.push(course);
    }

    view_balance(){
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }

    pay_fees(amount: number) {
        this.balance -= amount;
        console.log(`$${amount} fees paid sucessfully for $${this.name}`);
    }

    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}

class student_manager {
    Students: student [];

    constructor (){
        this.Students = [];
    }

    add_student (name: string){
        let stud = new student(name);
        this.Students.push(stud);
        console.log(`Student: ${name} added successfully. Student ID: ${stud.id}`);
    }

    enroll_student (student_id: number, course: string) {
        let student_found = this.find_student(student_id);
        if(student_found){
            student_found.enroll_course(course);
            console.log(`${student_found.name} enrolled in ${course} successfully.`);
        }
    }

    view_student_balance (student_id: number){
        let student_found = this.find_student(student_id);
        if(student_found){
            student_found.view_balance();
        } else {
            console.log("Student not found. Please add a correct student id!");
        }
    }

    pay_student_fees(student_id: number , amount: number){
        let student_found = this.find_student(student_id);
        if(student_found){
            student_found.pay_fees(amount);
        } else {
            console.log("Student not found. Please add a correct student id!");
        }
    }

    show_student_status (student_id: number){
        let student_found = this.find_student(student_id);
        if(student_found){
            student_found.show_status();
        } else {
            console.log("Student not found. Please add a correct student id!");
        }
    }

    find_student (student_id: number) {
        return this.Students.find(std => std.id === student_id);
    }
}

async function main(){
    console.log("This is a student management system cli based project!");
    console.log("-" .repeat(50))

    let studenManager = new student_manager ()

    while(true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                message: "Select an options!",
                type: "list",
                choices: ["Add student","Enroll student","View student balance","Pay fees","Show status","Exit"],
            },

        ]);
        switch(choice.choice ) {
            case "Add student":
            let name_input = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter a student name!",
                },
            ]);
            studenManager.add_student (name_input.name);
            break;


            case "Enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID!",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "enter a course name!"
                    },
                ]);
                studenManager.enroll_student (course_input.student_id, course_input.course);
                break;

                case "View student balance":
                    let balance_input = await inquirer.prompt([
                        {
                            name: "student_id",
                            type: "number",
                            message: "Enter a Student ID!",
                        }
                    ]);
                    studenManager.  view_student_balance (balance_input.student_id);
                    break;


                    case "Pay fees":
                        let fees_input = await inquirer.prompt([
                            {
                                name: "student_id",
                                type: "number",
                                message: "Enter a Student ID!",
                            },
                            {
                                name: "amount",
                                type: "number",
                                message: "Enter the amount to pay!",
                            }
                        ]);
                        studenManager.pay_student_fees (fees_input.student_id, fees_input.amount );
                        break;

                    case "Show status":
                        let status_input = await inquirer.prompt([
                        {
                          name: "student_id",
                          type: "number",
                          message: "Enter a Student ID!",
                       }
                       ]);
                    studenManager.show_student_status(status_input.student_id);
                    break;


                    case "Exit":
                        console.log("Exiting...!");
                        process.exit();
        }
    }
}
main();
    
