const User = require('./users').User;
const Users = require('./users').Users;
const util = require('../utils');

class Student extends User {
    constructor(matric_number, program, year_of_graduation, user_id){
        this.matric_number = matric_number;
        this.program = program;
        this.year_of_graduation = year_of_graduation;
        this.user_id = user_id;
        this.id = util.generate_random_id();
    }
}

class Students extends Users {
    
    add(obj){
        let errors = this.validate(obj);

        student = this.getByMatricNumber(obj.matric_number);
        if (student !== false){
            errors.push(`A user with matric number ${obj.matric_number} already exists`);
        }

        if(errors.length == 0){
            let user = new User(obj.first_name, obj.last_name, obj.email, obj.password);
            return {
                "status" : "success",
                "data" : user
            };
        }

        return {
            "status" : "error",
            "errors" :errors
        };
    }
 
    getByMatricNumber(matric_number){
        this.data.forEach(function (obj) {
            if (obj.matric_number == matric_number){
                return obj;
            }
        });

        return false;       
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Student : Student, 
    Students : Students
};