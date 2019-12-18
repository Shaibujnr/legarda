import {Card, CardBody, CardText, CardTitle, Button, Row, Col} from 'reactstrap';
import Product from '../../data/models/product';
import {Component, CSSProperties} from 'react';


interface IPurchaseProps{
    product: Product;
    style:CSSProperties;
    onProductPurchaseClicked(): void;
}

export default class ProductCard extends Component<IPurchaseProps,{}>{
    render(){
        return (
            <Card style={this.props.style}>
                <CardBody>
                    <CardTitle><strong>{this.props.product.name}</strong></CardTitle>
                    <CardText>Click on the purhcase button to purchase and share this product</CardText>
                    <Button color='primary' onClick={this.props.onProductPurchaseClicked}>Purchase</Button>
                </CardBody>
            </Card>
        );
    }
}