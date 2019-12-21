import Layout from './Layout';
import Hero from './Hero';
import Feature from './Feature';
import Services from './Services';
import About from './About';
import {Component} from 'react';
import $ from 'jquery';

export default class HomePageComponent extends Component<{},{isLoginModalOpen:boolean}>{

    constructor(props: any){
        super(props);
        this.state = {isLoginModalOpen: false}
    }

    componentDidMount(){
        var scrollpos = window.scrollY;
        var header = document.querySelector("header");
        var nav = document.querySelector('nav');
        var navLinks = nav!.querySelectorAll('a');

        function add_class_on_scroll() {
            header!.classList.add("solid");
            navLinks.forEach((value) => {
                value.classList.add("solid-link-color");
            })
        }

        function remove_class_on_scroll() {
            header!.classList.remove("solid");
            navLinks.forEach((value) => {
                value.classList.remove("solid-link-color");
            })
        }

        window.addEventListener('scroll', function(){ 
            //Here you forgot to update the value
            scrollpos = window.scrollY;

            if(scrollpos > 50){
                add_class_on_scroll();
            }
            else {
                remove_class_on_scroll();
            }
        });
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
                <Hero/> 
                <Feature/>
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
                .feature-block h4{
                    text-transform: capitalize;
                }
                .feature-icon-block{
                    font-size: 40px;
                    width: 100px;
                    height: 100px;
                    background:#eee;
                    color: #007bff;
                    text-align: center;
                    margin: 0 auto;
                    border-radius: 100%;
                    padding-top: 15px;
                    -webkit-transition: all .3s ease 0s;
                    -o-transition: all .3s ease 0s;
                    transition:all .3s ease 0s ;
                    
                }
                
                .feature-block:hover .feature-icon-block{
                     background:#007bff;
                    color: #fff;
                }
                .top-padding{
                    padding-top: 70px;
                }
                `}
            </style>
            </Layout>
        );
    }
}