import {Component, ChangeEvent, FormEvent, CSSProperties} from 'react';
import {Form, Input, Button, Row, Col, Card} from 'reactstrap';
import Router from 'next/router';
import Link from 'next/link';
import cookies from 'next-cookies';
import {NextPageContext} from 'next';
import AuthService from '../data/services/AuthService';
import Layout from '../components/unauth/Layout';

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
        let marginStyle: CSSProperties = {marginTop: '5px'}
        return (
            <Layout>
                <section className="hero">
                <Row className='justify-content-center align-items-center' style={{paddingTop:'60px', width:'100%'}}>
                    <Col md='4' xs='10'>
                        <Card style={{padding: '15px'}}>
                    <Form onSubmit={this.login}>
                        <img src='/images/logo.svg' style={{width: '200px', height:'70px'}}/>
                        <h4 style={marginStyle}>Login</h4>
                        <Input style={marginStyle} type="text" placeholder="Email or Username" value={this.state.email} onChange={this.setEmail} />
                        <Input style={marginStyle} type="password" placeholder="Password" value={this.state.password} onChange={this.setPassword}/>
                        <a style={{...marginStyle, float:'right'}} href='#'>forgot password?</a>
                        <Button style={{...marginStyle, width: '100%'}} type='submit' color='primary'>login</Button> 
                        <p style={{...marginStyle, float:'right', color:'black'}}>Don't have an account? <Link href='/register'><a>register</a></Link></p>  
                    </Form>
                    </Card>
                    </Col>
                </Row>
            </section>
            </Layout>
        );
    }
}