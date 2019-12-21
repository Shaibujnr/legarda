import {Component} from 'react';
import Link from 'next/link'
import { Button } from 'reactstrap';

export default class Header extends Component{
    render(){
        return(
            <section className="hero">
                <div className="hero-inner">
                    <h1>Legarda</h1>
                    <h2>Purchase and share products with your friends.</h2>
                    <Link href='/register'><Button id='hero-register'>Register</Button></Link>
                </div>
            </section>
        );
    }
}