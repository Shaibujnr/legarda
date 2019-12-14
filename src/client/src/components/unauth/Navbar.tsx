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