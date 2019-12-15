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
import Cookie from 'js-cookie';
import {Component, ChangeEvent, FormEvent} from 'react';
import Link from 'next/link';


interface IPurchaseProps{
    product: Product;
    isModalOpen: boolean;
    toggleModal():void;
}

interface IPurchaseState{
    users: User[];
    username: string;
}

export default class Purcahse extends Component<IPurchaseProps, IPurchaseState>{

    constructor(props:any){
        super(props);
        this.state = {users:[], username:''};
    }
    
    setUsername = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({username: event.target.value});
    }

    render(){
        return (
            <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
                <div style={{padding:'15px'}}>
                    <h4>{this.props.product!.name}</h4>
                    <p>Manufactured By: {this.props.product!.manufacturer}</p>
                    <p>#{this.props.product!.price}</p>
                    <hr style={{width:'100%', margin:'2px;'}}/>
                    <Row>
                        <Col md='9'>
                            <Input type='text' onChange={this.setUsername} value={this.state.username}/>
                        </Col>
                        <Col md='3'>
                            <Button color='primary'>Add</Button>
                        </Col>
                    </Row>
                    <ListGroup>
                        {this.state.users.map((value: User, index:number) => {
                            return <ListGroupItem tag='button' key={value.username}>{value.username}</ListGroupItem>
                        })}
                    </ListGroup>
                    <Button color='primary' style={{marginTop:'5px'}}>Make Payment</Button>
                </div>
            </Modal>
        );
    }

}