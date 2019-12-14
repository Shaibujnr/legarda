import Home from '../components/unauth/Home';
import Main from '../components/Main';
import User from '../data/models/user';
import {Component, createElement} from 'react';
import axios from 'axios';
import {NextPageContext} from 'next';
import cookies from 'next-cookies';


interface IIndexProps{
    user?: User;
}

export default class IndexPage extends Component<IIndexProps,{}>{

    static async getInitialProps(ctx: NextPageContext): Promise<IIndexProps>{
        let token = cookies(ctx)!.token;
        if(!token){
            return {user: undefined};
        }
        try{
            let url = "http://localhost:5000/api/v1/auth/validate";
            let payload = {'token': token};
            let response = await axios.post(url, payload);
            let result: IIndexProps = {user: User.getUserFromData(response.data.data)};
            return result;
        }
        catch(e){
            console.log(e);
            let error_data = e.reponse.data;
            console.log(error_data);
            let result: IIndexProps = {user:undefined};
            return result;
            
        }
    }

    render(){
        return this.props.user ? createElement(Main): createElement(Home);
    }
}