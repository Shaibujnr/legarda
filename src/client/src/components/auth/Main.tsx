import {Component, Fragment} from 'react';
import { Button } from 'reactstrap';
import AuthService from '../../data/services/AuthService';
import Cookie from 'js-cookie';
import Layout from './Layout';




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
            <Layout>
                <div className="main-w3pvt mian-content-wthree text-center">
                    <Button color='primary' onClick={this.logout}>Logout</Button>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" 
                            role="progressbar" 
                            style={{"width": "100%"}}></div>
                    </div>
                </div>
            </Layout>
            
        );
    }
}