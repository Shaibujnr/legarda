import axios from 'axios';
import User from '../models/user';
import Cookie from 'js-cookie';
import Router from 'next/router';


export default class AuthService{
    apiUrl:string;

    constructor(public domain: string = 'http://localhost:5000'){
        this.domain = domain;
        this.apiUrl = `${this.domain}/api/v1/`;
    }

    login = async (login: string, password: string) => {
        let endpoint = `${this.apiUrl}auth/login`;
        let payload = {name: login, password: password};
        try{
            let response = await axios.post(endpoint, payload);
            let token = response.data.token;
            Cookie.set('token', token);
            return Router.push('/');
        }
        catch(e){
            console.log(e.response.data);
            return e.response.data;
        }
    }

    logout = async (token: string) => {
        let endpoint = `${this.apiUrl}auth/logout`;
        let payload = {Authorization: `JWT ${token}`};
        try{
            await axios.post(endpoint, {}, {headers: payload});
            Cookie.remove('token');
            return Router.push('/');
        }
        catch(e){
            console.log(e);
            return e.response.data;
        }
    }

    validateToken = async (token: string) => {
        let endpoint = `${this.apiUrl}auth/validate`;
        let payload = {token: token};
        try{
            let response = await axios.post(endpoint, payload);
            let user_data = response.data.data;
            return User.getUserFromData(user_data);
        }
        catch(e){
            return undefined;
        }
    }

    signUp = async (data:any) => {
        let url = this.getUrl('/users');
        if(data.password != data.confirmPassword) return {'status':'fail', 'message': "passwords don't match"};
        let payload = {...data};
        delete payload.confirmPassword;
        try{
            let response = await axios.post(url, payload);
            let token = response.data.token;
            Cookie.set('token', token);
            return Router.push("/");
        }
        catch(e){
            console.log(e.response.data);
            return e.response.data;
        }

    }

    private getUrl = (endpoint: string) => `${this.apiUrl}/${endpoint}`;

}