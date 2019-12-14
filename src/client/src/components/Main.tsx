import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from 'react';
import { Button } from 'reactstrap';
import AuthService from '../data/services/AuthService';
import Cookie from 'js-cookie';

export default class Main extends Component{
    authService: AuthService;

    constructor(props:any){
        super(props);
        this.authService = new AuthService();
    }

    logout = async () =>  {
        let token = Cookie.get('token');
        return await this.authService.logout(token!);
    }

    render(){
        return (
            <div>
                <h1>Main Here after login</h1>
                <Button color='primary' onClick={this.logout}>Logout</Button>
            </div>
        );
    }
}