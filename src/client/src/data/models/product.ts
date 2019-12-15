export default class Product{
    constructor(public id:number, public name:string, public price:number, 
        public manufacturer:string='', public location:string = ''){
            this.id = id;
            this.name = name;
            this.location = location;
            this.price = price;
            this.manufacturer = manufacturer;
    }
}