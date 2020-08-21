class Project {
    constructor(title, abstract, authors, tags, user_id){
        this.title = title; 
        this.abstract = abstract; 
        this.authors = authors;
        this.tags = tags;
        this.user_id = user_id;
        this.is = generate_random_id();
    }
}

class Projects extends DataModel {

    add(obj){
        let errors = this.validate();

        if(errors.length == 0){
            let project = new Project(obj.title, obj.abstract, obj.authors, obj.tags, obj.user_id);
            this.data.push(project);
            return {
                "status" : "success",
                "data" : project
            };
        }

        return {
            "status" : "error",
            "errors" :errors
        };
    }

    validate(obj){
        let errors = [];
        for (const property in obj) {
            if(obj[property] === ""){
                errors.push(`${property} should not be empty`)
            }
        }

        return errors;
    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project : Project,
    Projects : Projects
};