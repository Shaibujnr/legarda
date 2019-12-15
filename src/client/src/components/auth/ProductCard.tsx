import {Card, CardBody, CardText, CardTitle, Button, Row, Col} from 'reactstrap';
import Product from '../../data/models/product';
import {Component} from 'react';


interface IPurchaseProps{
    product: Product;
    onProductPurchaseClicked(): void;
}

export default class ProductCard extends Component<IPurchaseProps,{}>{
    render(){
        return (
            <Card>
                <CardBody>
                    <CardTitle>{this.props.product.name}</CardTitle>
                    <CardText>Click on the purhcase button to purchase and share this product</CardText>
                    <Button color='primary' onClick={this.props.onProductPurchaseClicked}>Purchase</Button>
                </CardBody>
            </Card>
        );
    }
}