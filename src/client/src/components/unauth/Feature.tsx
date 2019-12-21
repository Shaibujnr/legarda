import {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faMoneyBill, faShare, faClock} from '@fortawesome/free-solid-svg-icons';


export default class Feature extends Component{
    render(){
        return (
            <section className="section" id="feature">
            <div className="container">
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8 col-lg-6 text-center">
                        <h2 className="lg-title mb-2">
                            Features
                        </h2>

                        <p className="mb-5 ">
                            What you can do on Legarda
                        </p>

                    </div>
                </div>
                <div className="row justy-content-center">
                    <div className="col-lg-3 col-md-6">
                        <div className="text-center feature-block">
                            <div className="feature-icon-block mb-4">
                                <FontAwesomeIcon icon={faSearch}/>
                            </div>
                            <h4 className="mb-3 ">Search</h4>
                            <p>Search for a farm product you are interested in.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="text-center feature-block">
                            <div className="feature-icon-block mb-4">
                                <FontAwesomeIcon icon={faMoneyBill}/>
                            </div>
                            <h4 className="mb-3">Purchase</h4>
                            <p>Purchase your product and initiate payment.</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="text-center feature-block">
                            <div className="feature-icon-block mb-4">
                                <FontAwesomeIcon icon={faShare}/>
                            </div>
                            <h4 className="mb-3">Share</h4>
                            <p>Share product with friends and let them also contribute in paying for it.</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="text-center feature-block">
                            <div className="feature-icon-block mb-4">
                                <FontAwesomeIcon icon={faClock}/>
                            </div>
                            <h4 className="mb-3">Delivery</h4>
                            <p>Have your product delivered to you and your friends.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    }
}