import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/nav.css';
import {Component, Fragment} from 'react';
import NavBar from './Navbar';

export default class Layout extends Component{
    render(){
        return(
            <Fragment>
                <NavBar/>
                <div style={{paddingTop:'60px'}}>
                    {this.props.children}
                </div>
                
            </Fragment>
        );
    }
}