import '../../assets/css/nav.css';
import {Component, Fragment} from 'react';
import Link from 'next/link';
import { Button } from 'reactstrap';
import AuthService from '../../data/services/AuthService';
import Cookie from 'js-cookie';


export default class NavBar extends Component{
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
            <header>
                <div className="container">
                    <div className="header d-lg-flex justify-content-between align-items-center py-2 px-sm-2 px-1">
                        <div id="logo">
                            <h1><a href="index.html">Legarda</a></h1>
                        </div>
                        <div className="nav_w3ls ml-lg-5">
                            <nav>
                                <label htmlFor="drop" className="toggle">Menu</label>
                                <input type="checkbox" id="drop" />
                                <ul className="menu">
                                    <Link href='/'><a>Overview</a></Link>
                                    <Link href='/purchases'><a>Purchases</a></Link>
                                    <Link href='/products'><a >Products</a></Link>
                                    <Link href='/activities'><a>Activities</a></Link>
                                    <Button color='info' onClick={this.logout}>Logout</Button>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}