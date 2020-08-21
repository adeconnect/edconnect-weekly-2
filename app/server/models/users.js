class User {
    constructor(first_name, last_name, email, password){
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.id = generate_random_id();
    }

    getFullName(){
        return this.first_name + " " + this.last_name;
    }
}

class Users extends DataModel {
    validate(email, password){
        let success_message = {
            "status" : "success"
        };

        let error_message = {
            "status" : "error",
            "message" : "Invalid username and passsword"
        };

        this.data.forEach(function (obj) {
            if (obj.email == email && obj.password == password){
                return success_message;
            }
        }); 
        
        return error_message;
    }

    getByEmail(email){
        this.data.forEach(function (obj) {
            if (obj.email == email){
                return obj;
            }
        });

        return false;       
    }

    validPassword(password){
        if(!password.match(/^[0-9a-z]+$/)){
            return false;
        }
        if(password.length < 7){
            return false;
        }

        return true;
    }

    validate(obj){
        let errors = [];
        for (const property in obj) {
            if(obj[property] === ""){
                errors.push(`${property} should not be empty`)
            }
        }

        let user = this.getByEmail(obj.email);
        if (user !== false){
            errors.push(`A user with email address ${obj.email} already exists`);
        }

        if(!this.validPassword()){
            errors.push('Your password should be alphanumeric and have at least 7 characters');
        }

        return errors;
    }
}

class Student extends User {
    constructor(matric_number, program, year_of_graduation, user_id){
        this.matric_number = matric_number;
        this.program = program;
        this.year_of_graduation = year_of_graduation;
        this.user_id = user_id;
        this.id = generate_random_id();
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
    User : User,
    Users : Users,
    Student : Student, 
    Students : Students
};