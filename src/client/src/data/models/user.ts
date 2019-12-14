export default class User{
    constructor(public id:number, public firstName:string, 
        public lastName:string, public email:string, public username: string,
        public address:string ='', public isAdmin: boolean = false){
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.username = username;
            this.address = address;
            this.isAdmin = isAdmin;
    }

    static getUserFromData(data: any): User | undefined{
        if(!data.id){
            return undefined;
        }
        let user_id = data.id;
        let firstName = data.firstName;
        let lastName = data.lastName;
        let username = data.username;
        let email = data.email;
        let isAdmin = data.isAdmin;
        return new User(user_id, firstName, lastName, email, username, isAdmin=isAdmin);
    }
}

