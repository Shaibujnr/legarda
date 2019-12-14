import {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import { Container, Row, Col} from 'reactstrap';

export default class About extends Component{
    render(){
        return(
            <section className="page-section bg-primary text-white mb-0" id="about">
                <Container>
                    <h2 className="page-section-heading text-center text-uppercase text-white">About</h2>
                    <div className="divider-custom divider-light">
                        <div className="divider-custom-line" style={{backgroundColor: '#fff'}}></div>
                        <div className="divider-custom-icon" style={{color: '#fff'}}>
                            <FontAwesomeIcon icon={faStar}/>
                        </div>
                        <div className="divider-custom-line" style={{backgroundColor: '#fff'}}></div>
                    </div>
                    <Row>
                        <Col lg='4' ml='auto'>
                            <p className="lead">Freelancer is a free bootstrap theme created by Start Bootstrap. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.</p>
                        </Col>
                        <Col lg='4' mr='auto'>
                            <p className="lead">You can create your own custom avatar for the masthead, change the icon in the dividers, and add your email address to the contact form to make it fully functional!</p>
                        </Col>
                    </Row>
                    <div className="text-center mt-4">
                        <a className="btn btn-xl btn-outline-light" href="https://startbootstrap.com/themes/freelancer/">
                            Register
                        </a>
                    </div>
                </Container>
          </section>
        );
    }
}