import {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faSearch, faShare, faMoneyBill, faBus} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import { Container, Row, Col} from 'reactstrap';

export default class Services extends Component{
    render(){
        return(
            <section className="page-section portfolio" id="portfolio">
                <Container>
                    <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">What You Can Do</h2>
                    <div className="divider-custom">
                        <div className="divider-custom-line"></div>
                        <div className="divider-custom-icon">
                            <FontAwesomeIcon icon={faStar}/>
                        </div>
                        <div className="divider-custom-line"></div>
                    </div>
                    <Row>
                        <Col md='6' lg='3'>
                            <img className="img-fluid" src="/images/search.svg" alt="search"/>
                            <h6 className="text-center">Search For A Farm Product.</h6>
                        </Col>
                        <Col md='6' lg='3'>
                            <img className="img-fluid" src="/images/share.svg" alt="search"/>
                            <h6 className="text-center">Share product with your friends and family</h6>
                        </Col>
                        <Col md='6' lg='3'>
                            <img className="img-fluid" src="/images/pay.svg" alt="search"/>
                            <h6 className="text-center">Pay for your product.</h6>
                        </Col>
                        <Col md='6' lg='3'>
                            <img className="img-fluid" src="/images/delivery.svg" alt="search"/>
                            <h6 className="text-center">Have your Product delivered to your doorstep</h6>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}