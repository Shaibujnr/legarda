import {NextPageContext} from 'next';
import {Component, Fragment, createElement} from 'react';
import {Row, Col, Spinner} from 'reactstrap';
import Layout from '../components/auth/Layout';
import ProductCard from '../components/auth/ProductCard';
import PurchaseModal from '../components/auth/Purchase';
import SearchBar from '../components/auth/ProductSearchBar';
import Product from '../data/models/product';
import ProductService from '../data/services/ProductService';
import AuthService from '../data/services/AuthService';
import Category from '../data/models/category';
import delay from '../utils/delay';


interface IProductsState{
    products: Product[];
    selectedProduct: Product;
    isModalOpen: boolean;
    isLoading: boolean;
}

export default class ProductsPage extends Component<{},IProductsState>{
    authService: AuthService;
    productService: ProductService;

    constructor(props:any){
        super(props);
        this.authService = new AuthService();
        this.productService = new ProductService();
        this.state = {
            products: [], 
            selectedProduct:new Product(-1,'',0), 
            isModalOpen:false,
            isLoading: true
        };
    }

    async componentDidMount(){
        let products = await this.productService.fetchAllProducts();
        this.setState({products: products, isLoading:false});
    }

    toggle = () => {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    setSelectedProduct = (product: Product) => {
        this.setState({selectedProduct: product, isModalOpen:true});
    }

    search = async (query: string, minPrice: number, maxPrice: number, categoryId: number) => {
        this.setState({isLoading: true});
        await delay(3000);
        let products = await this.productService.fetchAllProducts(); // TODO change this to search
        this.setState({products:products, isLoading: false});
    }

    render(){
        let LoadingComponent =(
            <Row classNameName='align-items-center justify-content-center' style={{height: '50vh'}}>
                <Spinner type="grow" color="primary" />
                <Spinner type="grow" color="secondary" />
                <Spinner type="grow" color="success" />
                <Spinner type="grow" color="danger" />
                <Spinner type="grow" color="warning" />
                <Spinner type="grow" color="info" />
                <Spinner type="grow" color="light" />
                <Spinner type="grow" color="dark" />
            </Row>
        ); 

        let DataComponent = (
            <Fragment>
                <Row>
                        {this.state.products.map((value:Product, index:number) => {
                            return(
                                <Col lg='4' xl='3' xs='12' key={value.name}>
                                    <ProductCard product={value} style={{marginTop: '10px'}}
                                                onProductPurchaseClicked={() => {this.setSelectedProduct(value)}}/>
                                </Col>
                            ); 
                        })}
                    </Row>
                    <PurchaseModal isModalOpen={this.state.isModalOpen} toggleModal={this.toggle} product={this.state.selectedProduct!}/>
            </Fragment>
        );
        let DisplayedComponent = this.state.isLoading ? LoadingComponent : DataComponent;

        return(
            <Layout>
                <div style={{width:'100%', padding:'20px'}}>
                    <SearchBar categories={[]} search={this.search}/>
                    {DisplayedComponent}
                </div>
            </Layout>
            
        );
    }
}
