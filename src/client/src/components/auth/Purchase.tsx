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
import PurchaseService from '../../data/services/PurchaseService';


interface IPurchaseProps{
    product: Product;
    isModalOpen: boolean;
    toggleModal():void;
}

interface IPurchaseState{
    users: User[];
    userSuggestions: User[];
    dirtyUser: User | null;
    toPay: number;
}

export default class Purcahse extends Component<IPurchaseProps, IPurchaseState>{
    userService: UserService;
    purchaseService: PurchaseService;

    constructor(props:any){
        super(props);
        this.state = {users:[], dirtyUser:null, userSuggestions:[], toPay:0};
        this.userService = new UserService();
        this.purchaseService = new PurchaseService();
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
        if(this.state.dirtyUser != null){
            this.setState({users: [...this.state.users, this.state.dirtyUser!], dirtyUser:null});
        }
        
    }

    setToPay = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({toPay: parseFloat(event.target.value)});
    }

    makePayment = async () => {
        await this.purchaseService.newPurchase(this.state.toPay, 1, this.props.product, this.state.users);
    }

    render(){
        return (
            <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
                <div style={{padding:'15px', backgroundColor:'#719cfe', color:'black'}}>
                    <h4>{this.props.product!.name}</h4>
                    <p><strong>Manufactured By:</strong> {this.props.product!.manufacturer}</p>
                    <strong>&#8358;{this.props.product!.price}</strong>
                    <hr/>
                    <strong>Initial Payment</strong>
                    <p style={{color:'white'}}>The initial payment is required to verify interest in this product and reserve it until payment is complete</p>
                    &#8358;
                    <span>
                        <Input value={this.state.toPay} onChange={this.setToPay} placeholder='amount' type='number'
                           style={{width:'30%', display:'inline'}} min='1' max={this.props.product.price}/>
                    </span>
                    <hr/>
                    <strong>Share With Other Users</strong>
                    <p style={{color:'white'}}>
                        Search by username, full name or email address
                        These are users you'd like to share this product with and also split the 
                        payment of this product with.
                    </p>
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
                            <Button color='dark' onClick={this.add}>Add User</Button>
                        </Col>
                    </Row>
                    <ListGroup>
                        {this.state.users.map((value: User, index:number) => {
                            return <ListGroupItem disabled key={value.username} style={{margin:'2px'}}>{value.username}</ListGroupItem>
                        })}
                    </ListGroup>
                    <Button color='dark' style={{marginTop:'5px'}} onClick={this.makePayment}>Make Payment</Button>
                </div>
            </Modal>
        );
    }

}