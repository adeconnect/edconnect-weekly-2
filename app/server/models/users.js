const DataModel = require('./data_model');
const util = require('../utils');

class User {
    constructor(first_name, last_name, email, password){
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.id = util.generate_random_id();
    }

    getFullName(){
        return this.first_name + " " + this.last_name;
    }
}

class Users extends DataModel {
    validate(email, password){
        this.data.forEach(function (obj) {
            if (obj.email == email && obj.password == password){
                return {
                    "status" : "success"
                };
            }
        }); 
        
        return {
            "status" : "error",
            "message" : "Invalid username and passsword"
        };
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

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User : User,
    Users : Users
};