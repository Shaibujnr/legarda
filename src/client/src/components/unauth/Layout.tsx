import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/nav.css';
import '../../assets/css/style.css';
import Footer from '../Footer';
import {Component, Fragment} from 'react';
import NavBar from './Navbar';

export default class Layout extends Component{
    render(){
        return(
            <Fragment>
                <NavBar/>
                {this.props.children}
                <Footer/>
            </Fragment>
        );
    }
}