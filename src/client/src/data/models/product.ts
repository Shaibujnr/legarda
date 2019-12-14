export default class Product{
    constructor(public id:number, public name:string, public location:string = ''){
            this.id = id;
            this.name = name;
            this.location = location;
    }
}