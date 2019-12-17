import axios from 'axios';
import Product from '../models/product';
import Purchase from '../models/purchase';
import User from '../models/user';
import Cookie from 'js-cookie';
import Router from 'next/router';
import redirect from '../../utils/redirect-to';


export default class PurchaseService{
    apiUrl:string;

    constructor(public domain: string = 'http://localhost:5000'){
        this.domain = domain;
        this.apiUrl = `${this.domain}/api/v1`;
    }

    newPurchase = async (toPay: number, count: number, product: Product, sharedUsers: User[]) => {
        let token = Cookie.get('token');
        let headers = {Authorization: `JWT ${token}`};
        let payload = {
            productId: product.id,
            count: count,
            sharedUserIds: sharedUsers.map((value:User) => value.id),
            toPay: toPay
        }
        console.log(payload);
        let endpoint = this.getUrl('purchases');
        try{
            let response = await axios.post(endpoint,payload,{headers: headers});
            let auth_url = response.data.data.auth_url;
            redirect(auth_url);
        }
        catch(e){
            console.log(e.response.data);
            return;
        }
    }

    private getUrl = (endpoint: string) => `${this.apiUrl}/${endpoint}`;

}