import Layout from './Layout';
import Header from './Header';
import Services from './Services';
import About from './About';
import Footer from '../Footer';
import {Component} from 'react';

export default class HomePageComponent extends Component<{},{isLoginModalOpen:boolean}>{

    constructor(props: any){
        super(props);
        this.state = {isLoginModalOpen: false}
    }

    changeModalState = () => {
        this.setState({isLoginModalOpen: !this.state.isLoginModalOpen})
    }

    registerClicked = () => {
        this.setState({isLoginModalOpen: true});
    }

    render(){
        let imageurl: string = '/images/header.jpeg';
        return (
            <Layout> 
            </Layout>
        );
    }
}