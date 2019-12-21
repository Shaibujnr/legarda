import {Component, ChangeEvent,FormEvent, CSSProperties} from 'react';
import {Form, Input, Button, Row, Col, Card} from 'reactstrap';
import axios from 'axios';
import Router from 'next/router';
import Cookie from 'js-cookie';
import {NextPageContext} from 'next';
import cookies from 'next-cookies';
import AuthService from '../data/services/AuthService';
import Layout from '../components/unauth/Layout';
import Link from 'next/link';

interface IRegisterState{
    firstName:string;
    lastName:string;
    email:string;
    username:string;
    password:string;
    confirmPassword:string;
}

export default class Register extends Component<{},IRegisterState>{
    authService: AuthService;

    constructor(props:any){
        super(props);
        this.state = {firstName:'', lastName:'', email:'', username: '', password:'', confirmPassword:''};
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

    register = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let payload = {...this.state};
        return await this.authService.signUp(payload);
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
        let marginTopStyle: CSSProperties = {marginTop: '5px'};
        return (
            <Layout>
                <section className='hero'>
                <Row className='justify-content-center align-items-center' style={{paddingTop:'60px', width:'100%'}}>
                    <Col md='4' xs='10'>
                        <Card style={{padding: '15px'}}>
                    <Form onSubmit={this.register}>
                        <img src='/images/logo.svg' style={{width: '200px', height:'70px'}}/>
                        <h4 style={marginTopStyle}>Register</h4>
                        <Input style={marginTopStyle} type="text" placeholder="First Name" value={this.state.firstName} onChange={this.setFirstName}/>
                        <Input style={marginTopStyle} type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.setLastName}/>
                        <Input style={marginTopStyle} type="text" placeholder="Username" value={this.state.username} onChange={this.setUsername}/>
                        <Input style={marginTopStyle} type="email" placeholder="Email" value={this.state.email} onChange={this.setEmail}/>
                        <Input style={marginTopStyle} type="password" placeholder="Password" value={this.state.password} onChange={this.setPassword}/>
                        <Input style={marginTopStyle} type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.setConfirmPassword}/>
                        <Button style={{...marginTopStyle, width:'100%'}} type='submit' color='primary'>Register</Button>
                        <p style={{...marginTopStyle, float:'right', color:'black'}}>Already have an account? <Link href='/login'><a>Log in</a></Link></p>
                    </Form>
                    </Card>
                    </Col>
                </Row>
                </section>
            </Layout> 
        );
    }
}