import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from 'react';
import { Button } from 'reactstrap';
import ProductCard from '../components/auth/ProductCard';
import PurchaseModal from '../components/auth/Purchase';
import AuthService from '../data/services/AuthService';
import ProductService from '../data/services/ProductService';
import Cookie from 'js-cookie';
import Product from '../data/models/product';


interface IMainState{
    products: Product[];
    selectedProduct: Product;
    isModalOpen: boolean;
}

export default class Main extends Component<{}, IMainState>{
    authService: AuthService;
    productService: ProductService;

    constructor(props:any){
        super(props);
        this.authService = new AuthService();
        this.productService = new ProductService();
        this.state = {products: [], selectedProduct:new Product(-1,'',0), isModalOpen:false};
    }

    async componentDidMount(){
        console.log("about to fetch all products");
        let products = await this.productService.fetchAllProducts();
        this.setState({products: products});
    }

    logout = async () =>  {
        let token = Cookie.get('token');
        return await this.authService.logout(token!);
    }

    toggle = () => {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    setSelectedProduct = (product: Product) => {
        this.setState({selectedProduct: product, isModalOpen:true});
    }

    render(){
        return (
            <div style={{width:'50%', padding:'20px', margin:'auto'}}>
                <h1>Main Here after login</h1>
                <Button color='primary' onClick={this.logout}>Logout</Button>
                {this.state.products.map((value:Product, index:number) => {
                    return <ProductCard product={value} key={value.name} 
                                        onProductPurchaseClicked={() => {this.setSelectedProduct(value)}}/>;
                })}
                <PurchaseModal isModalOpen={this.state.isModalOpen} toggleModal={this.toggle} product={this.state.selectedProduct!}/>
            </div>
        );
    }
}