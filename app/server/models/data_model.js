class DataModel {
    constructor(){
        this.data = [];
    }

    save(obj){
        this.data.push(obj);
    }

    update(id, obj){
        let index = this.getIndexOf(id);

        if( index > 1){
            row = this.data[index];
            for (const property in obj) {
                if (row.hasOwnProperty(property)){
                    row[property] = obj[property];
                }
            }
            this.data[index] = row;
            return this.data[index];
        }

        return false;
    }

    getById(id){
        this.data.forEach(function (obj) {
            if (obj.id === id){
                return obj;
            }
        });

        return false;
    }

    delete(id){
        let index = this.getIndexOf(id);
        if (index > -1){
            this.data.splice(index, 1);
            return true;
        }

        return false; 
    }

    getIndexOf(id){
        let index = -1;

        this.data.forEach(function (obj) {
            index++;
            if (obj.id === id){
                return index;
            }
        });

        return index;
    }

    getAll(){
        return this.data;
    }

}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;