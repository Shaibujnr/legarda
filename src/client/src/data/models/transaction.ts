export default class Transaction{
    constructor(public id:number, public user_id:number, public txcode: string,
        public amount:number, public status:string, public purchase_id: number){
            this.id = id;
            this.user_id = user_id;
            this.txcode = txcode;
            this.amount = amount;
            this.status  = status;
            this.purchase_id = purchase_id;
    }
}