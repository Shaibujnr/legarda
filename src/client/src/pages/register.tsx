import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/auth.css';
import {Component, ChangeEvent,FormEvent} from 'react';
import {Form, Input, Button} from 'reactstrap';
import axios from 'axios';
import Router from 'next/router';
import Cookie from 'js-cookie';


interface IRegisterState{
    firstName:string;
    lastName:string;
    email:string;
    username:string;
    password:string;
    confirmPassword:string;
}

export default class Register extends Component<{},IRegisterState>{
    constructor(props:any){
        super(props);
        this.state = {firstName:'', lastName:'', email:'', username: '', password:'', confirmPassword:''};
    }

    register = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            let endpoint = "http://localhost:5000/api/v1/users";
            if(this.state.confirmPassword != this.state.password){
                return;
            } 
            let payload = {...this.state};
            delete payload.confirmPassword;
            let response = await axios.post(endpoint, payload);
            let token = response.data.token;
            Cookie.set('token', token);
            Router.push("/");
        }
        catch(e){
            console.log(e.response.data);
        }

    }

    setEmail = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({email: event.target.value});
    }

    setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value});
    }

    setFirstName = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({firstName: event.target.value});
    }

    setLastName = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({lastName: event.target.value});
    }

    setUsername = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({username: event.target.value});
    }

    setConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({confirmPassword: event.target.value});
    }

    render(){
        return (
            <div className="auth">
                <Form onSubmit={this.register}>
                    <img src='/images/logo.svg' style={{width: '150px', height:'150px'}}/>
                    <h4>Register</h4>
                    <Input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.setFirstName}/>
                    <Input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.setLastName}/>
                    <Input type="text" placeholder="Username" value={this.state.username} onChange={this.setUsername}/>
                    <Input type="email" placeholder="Email" value={this.state.email} onChange={this.setEmail}/>
                    <Input type="password" placeholder="Password" value={this.state.password} onChange={this.setPassword}/>
                    <Input type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.setConfirmPassword}/>
                    <Button type='submit' color='primary' style={{width: '100%'}}>Register</Button>
                </Form>
            </div>
            
        );
    }
}