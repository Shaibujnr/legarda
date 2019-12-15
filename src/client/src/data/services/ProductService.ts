import axios from 'axios';
import Product from '../models/product';
import Cookie from 'js-cookie';
import Router from 'next/router';


export default class ProductService{
    apiUrl:string;

    constructor(public domain: string = 'http://localhost:5000'){
        this.domain = domain;
        this.apiUrl = `${this.domain}/api/v1`;
    }
 
    fetchAllProducts = async (): Promise<Product[]> => {
        let token = Cookie.get('token');
        let payload = {Authorization: `JWT ${token}`};
        let endpoint = this.getUrl('products');
        try{
            let response = await axios.get(endpoint, {headers: payload});
            let productListData: any[] = response.data.data;
            let result = [];
            for(let i = 0; i < productListData.length; i++){
                result.push(this.parseProductData(productListData[i]));
            }
            return result;
        }
        catch(e){
            console.log(e);
            return [];
        }
    }

    private parseProductData = (data: any) : Product => {
        return new Product(data.id, data.name, data.price);
    }

    private getUrl = (endpoint: string) => `${this.apiUrl}/${endpoint}`;

}