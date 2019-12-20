import axios from 'axios';
import Product from '../models/product';
import Activity from '../models/activity';
import User from '../models/user';
import Cookie from 'js-cookie';
import cookies from 'next-cookies';
import Router from 'next/router';
import redirect from '../../utils/redirect-to';
import { NextPageContext } from 'next';


export default class ActivityService{
    apiUrl:string;

    constructor(public domain: string = 'http://localhost:5000'){
        this.domain = domain;
        this.apiUrl = `${this.domain}/api/v1`;
    }

    userActivities = async (ctx?: NextPageContext) => {
        let token = ctx ? cookies(ctx).token : Cookie.get('token');
        let headers = {Authorization: `JWT ${token}`};
        let endpoint = this.getUrl('activities');
        try{
            let response = await axios.get(endpoint,{headers: headers});
            console.log('from user activities');
            let data_list: Array<{id:number, occured_at:string, activity_type: string}> = response.data.data;
            return data_list.map((value) => {
                let activity = new Activity(value.id, new Date(value.occured_at), value.activity_type);
                console.log(activity);
                return activity;
            })
        }
        catch(e){
            console.log('exception was raised');
            console.log(e.response.data);
            return [];
        }
    }

    private getUrl = (endpoint: string) => `${this.apiUrl}/${endpoint}`;

}