import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from 'react';
import Navbar from './Navbar';

export default class Layout extends Component{
    render(){
        return(
            <div>
                <Navbar/>
                {this.props.children}
            </div>
        );
    }
}