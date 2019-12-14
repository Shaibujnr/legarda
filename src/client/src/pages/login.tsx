import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/auth.css';
import {Component, ChangeEvent, FormEvent} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';
import Router from 'next/router';
import Cookie from 'js-cookie';


export default class Login extends Component<{}, {email:string, password:string}>{
    constructor(props:any){
        super(props);
        this.state = {email:"", password:""};
    }

    setEmail = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({email: event.target.value});
    }

    setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value});
    }

    login = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            let endpoint = "http://localhost:5000/api/v1/auth/login"; 
            let payload = {name: this.state.email, password: this.state.password};
            let response = await axios.post(endpoint, payload);
            let token = response.data.token;
            Cookie.set('token', token);
            Router.push("/");
        }
        catch(e){
            console.log(e.response.data);
        }
            
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