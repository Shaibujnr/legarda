import {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import { Container} from 'reactstrap';

export default class Header extends Component{
    render(){
        return(
            <header className="masthead text-black text-center">
                <Container className="d-flex align-items-center flex-column">
                    <img className="masthead-avatar mb-5" src="images/logo.svg" alt=""/>
                    <h1 className="masthead-heading text-uppercase mb-0">Legarda</h1>
                    <div className="divider-custom divider-light">
                        <div className="divider-custom-line"></div>
                        <div className="divider-custom-icon">
                            <FontAwesomeIcon icon={faStar}/>
                        </div>
                        <div className="divider-custom-line"></div>
                    </div>
                    <p className="masthead-subheading font-weight-light mb-0">Share Farm Products With Friends and Family.</p>
                 </Container>
            </header>    
        );
    }
}