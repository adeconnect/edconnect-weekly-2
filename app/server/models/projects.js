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

class Projects {

}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project : Project,
    Projects : Projects
};