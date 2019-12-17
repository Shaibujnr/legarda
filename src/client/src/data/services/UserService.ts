import axios from 'axios';
import User from '../models/user';
import Cookie from 'js-cookie';
import Router from 'next/router';


export default class UserService{
    apiUrl:string;

    constructor(public domain: string = 'http://localhost:5000'){
        this.domain = domain;
        this.apiUrl = `${this.domain}/api/v1`;
    }
 
    fetchAllUsers = async (): Promise<User[]> => {
        let token = Cookie.get('token');
        let payload = {Authorization: `JWT ${token}`};
        let endpoint = this.getUrl('users');
        try{
            let response = await axios.get(endpoint, {headers: payload});
            let userListData: any[] = response.data.data;
            let result = [];
            for(let i = 0; i < userListData.length; i++){
                result.push(this.parseUserData(userListData[i]));
            }
            return result;
        }
        catch(e){
            console.log(e);
            return [];
        }
    }

    private parseUserData = (data: any) : User => {
        return new User(data.id, data.firstName, data.lastName, data.email, data.username)
    }

    private getUrl = (endpoint: string) => `${this.apiUrl}/${endpoint}`;

}