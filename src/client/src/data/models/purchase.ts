export default class Purchase{
    shared_users: number[];

    constructor(public id: number, public paid:number, public user_id: number,
        public staus:string, public date_started:string, public date_completed:string=''){
            this.id = id;
            this.paid = paid;
            this.user_id = user_id;
            this.staus = staus;
            this.date_started = date_started;
            this.date_completed = date_completed;
            this.shared_users = [];
        }
}