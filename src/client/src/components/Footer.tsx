import {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import { Container, Row, Col} from 'reactstrap';

export default class About extends Component{
    render(){
        return(
            <div>
                <footer className="footer text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 mb-5 mb-lg-0">
                                <h4 className="text-uppercase mb-4">Location</h4>
                                <p className="lead mb-0">2215 John Daniel Drive
                                    <br/>Clark, MO 65243
                                </p>
                            </div>
                            <div className="col-lg-4 mb-5 mb-lg-0">
                                <h4 className="text-uppercase mb-4">Around the Web</h4>
                                <a className="btn btn-outline-light btn-social mx-1" href="#">
                                    <i className="fab fa-fw fa-facebook-f"></i>
                                </a>
                                <a className="btn btn-outline-light btn-social mx-1" href="#">
                                    <i className="fab fa-fw fa-twitter"></i>
                                </a>
                                <a className="btn btn-outline-light btn-social mx-1" href="#">
                                    <i className="fab fa-fw fa-linkedin-in"></i>
                                </a>
                                <a className="btn btn-outline-light btn-social mx-1" href="#">
                                    <i className="fab fa-fw fa-dribbble"></i>
                                </a>
                            </div>
                            <div className="col-lg-4">
                                <h4 className="text-uppercase mb-4">About Legarda</h4>
                                <p className="lead mb-0">Legarda is a platform that allows you purchase and share farm products with friends.
                                <a href="#">Register</a>.</p>
                            </div>
                        </div>
                    </div>
                </footer>
                <section className="copyright py-4 text-center text-white">
                    <div className="container">
                        <small>Copyright &copy; Legarda 2019</small>
                    </div>
                </section>
            </div>
            
            
        );
    }
}