import {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import {
    Navbar, 
    NavItem, 
    Nav, 
    Button, 
    Collapse, 
    Container, 
    NavLink, 
    DropdownToggle, 
    DropdownItem, 
    NavbarBrand,
    NavbarToggler,
    NavbarText
} from 'reactstrap';


// import {Component} from 'react';


// export default class NavBar extends Component{
//     render(){
//         return (
//             <header>
//                 <div className="container">
//                     <div className="header d-lg-flex justify-content-between align-items-center py-2 px-sm-2 px-1">
//                         <div id="logo">
//                             <h1><a href="index.html">Legarda</a></h1>
//                         </div>
//                         <div className="nav_w3ls ml-lg-5">
//                             <nav>
//                                 <label htmlFor="drop" className="toggle">Menu</label>
//                                 <input type="checkbox" id="drop" />
//                                 <ul className="menu">
//                                     <li><a href="index.html">Home</a></li>
//                                     <li><a href="#about">About</a></li>
//                                     <li><a href="#join">Purchases</a></li>
//                                     <li>
//                                         <label htmlFor="drop-2" className="toggle toogle-2">Pages <span className="fa fa-angle-down"
//                                             aria-hidden="true"></span>
//                                         </label>
//                                         <a href="#">Pages <span className="fa fa-angle-down" aria-hidden="true"></span></a>
//                                         <input type="checkbox" id="drop-2" />
//                                         <ul>
//                                             <li><a href="#events" className="drop-text">Events</a></li>
//                                             <li><a href="#what" className="drop-text">What We Do?</a></li>
//                                             <li><a href="#courses" className="drop-text">Popular Courses</a></li>
//                                             <li><a href="#stats" className="drop-text">Statistics</a></li>
//                                             <li><a href="#gallery" className="drop-text">Gallery</a></li>
//                                         </ul>
//                                     </li>
//                                     <li><a href="#contact">Contact</a></li>
//                                     <li><a href="login.html">Login</a></li>
//                                     <li><a href="register.html">Register</a></li>
//                                 </ul>
//                             </nav>
//                         </div>
//                     </div>
//                 </div>
//             </header>
//         );
//     }
// }

export default class MyNavBar extends Component<{},{isOpen: boolean}>{
    constructor(props:any){
        super(props);
        this.state = {isOpen: true};
    }

    toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render(){
        return(
            <Navbar className="bg-secondary text-uppercase" expand="lg" fixed="top" id="mainNav">
                <Container>
                    <NavbarBrand href="/" className="navbar">Legarda</NavbarBrand>
                    <NavbarToggler className="text-uppercase font-weight-bold bg-primary text-white rounded"
                                   type="button" onClick={this.toggle}>
                        <FontAwesomeIcon icon={faBars}/>
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="nav-item mx-0 mx-lg-1">
                                <NavLink className="nav-link py-3 px-0 px-lg-3 rounded " 
                                          href="#about">
                                    About
                                </NavLink>
                            </NavItem>
                            <NavItem className="nav-item mx-0 mx-lg-1">
                                <Link href='/register'>
                                    <Button className="py-3 px-0 px-lg-3 rounded" color="primary">
                                        Register
                                    </Button>
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>    
        );
    }
}