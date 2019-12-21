import {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGlobe, faMobile, faLocationArrow} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import { Container, Row, Col} from 'reactstrap';

export default class About extends Component{
    render(){
        return(
            <footer className="top-padding bg-dark">
        <div className="container">
            <div className="row align-self-center">
                <div className="col-lg-4 col-md-6">
                    <div className="footer-widget">
                        <a href="#" className="footer-brand text-white">
                            Legarda
                        </a>
                        <p>Purchase and Share farm products with friends and family</p>
                    </div>
                </div>

                <div className="col-lg-2 ml-lg-auto col-md-2">
                    <ul className="footer-link list-unstyled ml-0 justify-content-end">
                        <li>
                            <a href="#feature" className="text-white">
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-white">
                                Portfolio
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-white">
                                Benefits
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-4">
                    <ul className="footer-link list-unstyled ml-0 justify-content-end">
                        <li>
                            <FontAwesomeIcon icon={faMobile}/> +2348067818198
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faLocationArrow}/> Abuja , Nigeria
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faGlobe}/> 
                        </li>
                    </ul>
                </div>
            </div>

            <div className="row justify-content-md-center footer-copy">
                <div className="col-lg-8 col-md-6 col-sm-6 text-center">
                    <p className="lead text-white-50">&copy; Copyright Reserved to Shaibu </p>
                </div>
            </div>
        </div>
        <style jsx global>
            {`
            .section {
                position: relative;
                padding: 8.125rem 0;
            }
            @media (min-width:768px) {
                .section {
                    padding: 7.5rem 0
                }
            }
            
            .section-top {
                padding-top: 8.125rem;
            }
            
            .section-bottom{
                padding-bottom: 8.125rem;
            }
            
            @media (min-width:768px) {
                .section-top {
                    padding-top: 10.3125rem
                }
            }

            .top-padding{
                padding-top: 70px;
            }
            
             .footer-widget{
                margin-bottom: 50px;
            }
            
            
            .footer-widget a{
                font-size: 30px;
            }
            
            .footer-widget p{
                color: #eee;
            }
            .footer-link{
                padding-left: 0;
                list-style-type: none
            }
            
            .footer-link li{
                color: #fff;
            }
            .footer-link > li + li {
                margin: .5rem 0 0
            }
            .footer-link i{
                margin-right: 10px;
            }
            
            .footer-copy{
                padding: 40px 0px;
                border-top: 1px solid#444;
            }
            `}
        </style>
    </footer>
        );
    }
}