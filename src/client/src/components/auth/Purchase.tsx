import {
    Button, 
    Input, 
    Form, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Row, 
    Col,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import Product from '../../data/models/product';
import User from '../../data/models/user';
import AutoSuggestInput from '../AutoSuggest';
import Cookie from 'js-cookie';
import {Component, ChangeEvent, FormEvent} from 'react';
import Link from 'next/link';
import UserService from '../../data/services/UserService';


interface IPurchaseProps{
    product: Product;
    isModalOpen: boolean;
    toggleModal():void;
}

interface IPurchaseState{
    users: User[];
    userSuggestions: User[];
    dirtyUser: User | null;
}

export default class Purcahse extends Component<IPurchaseProps, IPurchaseState>{
    userService: UserService;

    constructor(props:any){
        super(props);
        this.state = {users:[], dirtyUser:null, userSuggestions:[]};
        this.userService = new UserService();
    }

    getSuggestionValue = (user:User) => user.username;

    renderSuggestion = (user:User) => (
        <div>
            <p>{user.username}</p>
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.email}</p>
        </div>
    )

    onSuggestionsFetchRequested = async (query: string) => {
        let users = await this.userService.fetchAllUsers();
        this.setState({userSuggestions: users});
    };

    onSuggestionsClearRequested = () => {
        this.setState({
          userSuggestions: []
        });
    };

    suggestionClicked = (suggestion: User) => {
        this.setState({userSuggestions:[], dirtyUser:suggestion})
    }

    add = () => {
        this.setState({users: [...this.state.users, this.state.dirtyUser!], dirtyUser:null});
    }

    render(){
        return (
            <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
                <div style={{padding:'15px'}}>
                    <h4>{this.props.product!.name}</h4>
                    <p>Manufactured By: {this.props.product!.manufacturer}</p>
                    <p>#{this.props.product!.price}</p>
                    <hr/>
                    <Row style={{marginTop:'5px', marginBottom:'5px'}}>
                        <Col md='9'>
                            <AutoSuggestInput
                                suggestions={this.state.userSuggestions}
                                fetchSuggestions={this.onSuggestionsFetchRequested}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSuggestion}
                                placeholder='Enter username eg. Shaibujnr'
                                onSuggestionClicked={this.suggestionClicked}/>
                        </Col>
                        <Col md='3'>
                            <Button color='primary' onClick={this.add}>Add</Button>
                        </Col>
                    </Row>
                    <p>Share With:</p>
                    <ListGroup>
                        {this.state.users.map((value: User, index:number) => {
                            return <ListGroupItem disabled key={value.username} style={{margin:'2px'}}>{value.username}</ListGroupItem>
                        })}
                    </ListGroup>
                    <Button color='primary' style={{marginTop:'5px'}}>Make Payment</Button>
                </div>
            </Modal>
        );
    }

}