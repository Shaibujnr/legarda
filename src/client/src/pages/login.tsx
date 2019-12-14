import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/auth.css';
import {Component, ChangeEvent, FormEvent} from 'react';
import {Form, Input, Button} from 'reactstrap';
import Router from 'next/router';
import cookies from 'next-cookies';
import {NextPageContext} from 'next';
import AuthService from '../data/services/AuthService';


export default class Login extends Component<{}, {email:string, password:string}>{
    authService: AuthService;

    constructor(props:any){
        super(props);
        this.state = {email:"", password:""};
        this.authService = new AuthService();
    }

    static async getInitialProps(ctx:NextPageContext){
        let token = cookies(ctx)!.token;
        if(!token){return {}}
        if(ctx.res) {
            ctx.res.writeHead(302, {
              Location: '/'
            })
            ctx.res.end()
        } else {
            Router.push('/')
        }
        return {}
    }

    setEmail = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({email: event.target.value});
    }

    setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value});
    }

    login = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        return await this.authService.login(this.state.email, this.state.password);  
    }

    render(){
        return (
            <div className="auth">
                <Form onSubmit={this.login}>
                <img src='/images/logo.svg' style={{width: '150px', height:'150px'}}/>
                    <h4>Login</h4>
                    <Input type="email" placeholder="Email or Username" value={this.state.email} onChange={this.setEmail} />
                    <Input type="password" placeholder="Password" value={this.state.password} onChange={this.setPassword}/>
                    <Button type='submit' color='primary' style={{width: '100%'}}>login</Button>
                </Form>
            </div>
            
        );
    }
}