import Home from '../components/unauth/Home';
import Main from '../components/Main';
import {Component, createElement} from 'react';
import axios from 'axios';
import {NextPageContext} from 'next';
import cookies from 'next-cookies';


interface IIndexProps{
    user: any;
    isAuth: boolean;
}

export default class IndexPage extends Component<IIndexProps,{}>{

    static async getInitialProps(ctx: NextPageContext): Promise<IIndexProps>{
        let token = cookies(ctx)!.token;
        console.log(`token is ${token}`);
        if(!token){
            return {user:null, isAuth:false};
        }
        try{
            let url = "http://localhost:5000/api/v1/auth/validate";
            let data = {'token': token};
            let response = await axios.post(url, data);
            let result: IIndexProps = {user: response.data, isAuth: true};
            return result;
        }
        catch(e){
            console.log(e);
            let error_data = e.reponse.data;
            console.log(error_data);
            let result: IIndexProps = {user:null, isAuth: false};
            return result;
            
        }
    }

    render(){
        console.log(this.props.user);
        console.log(this.props.children);
        return this.props.isAuth ? createElement(Main): createElement(Home);
    }
}