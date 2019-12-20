export default class Activity{
    public display: string;
    constructor(public id: number, public date: Date, public type: string){
        this.id = id;
        this.date = date;
        this.type = type;
        this.display = this.getDisplay();
    }

    getDisplay():string{
        let result = '';
        if(this.type == 'sign_up'){
            result = 'You signed up at '+ ` ${this.date.toDateString()}`
        }
        if(this.type == 'sign_in'){
            result = 'You signed in.'+ ` ${this.date.toDateString()}`
        }
        if(this.type == 'purchase_initiated'){
            result = 'You initiated a purchase'+ ` ${this.date.toDateString()}`
        }
        if(this.type == 'transaction'){
            result = 'You made a transaction.'+ ` ${this.date.toDateString()}`
        }
        return result;
    }
}