export default class Category{
    products:number[];

    constructor(public id: number, public name: string){
        this.id = id;
        this.name = name;
        this.products = [];
    }
}