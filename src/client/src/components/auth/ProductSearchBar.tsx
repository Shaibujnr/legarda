import {Component, CSSProperties, KeyboardEvent, MouseEvent as MEvent, MouseEvent, ChangeEvent} from 'react';
import Category from '../../data/models/category';
import {Input, Dropdown, Container, Row, Col, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';


interface ISearchProps{
    categories: Category[];
    search(query: string, minPrice: number, maxPrice: number, categoryId:number):void;
}

interface ISearchState{
    isDropDownOpen: boolean;
    query: string;
    minPrice: string;
    maxPrice: string;
    selectedCategoryId: number;
    selectedCategoryText: string;
    dropDownToggleColor: string;
}

export default class ProductSearchBar extends Component<ISearchProps,ISearchState>{
    constructor(props:any){
        super(props);
        this.state = {
            isDropDownOpen:false, 
            minPrice:'', 
            maxPrice:'', 
            query:'', 
            selectedCategoryId:-1,
            selectedCategoryText: 'All',
            dropDownToggleColor: 'secondary'
        };
    }

    toggle = () => this.setState({isDropDownOpen: !this.state.isDropDownOpen});

    handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            let minPrice: number = this.state.minPrice.length > 0 ? parseFloat(this.state.minPrice) : 0;
            let maxPrice: number = this.state.maxPrice.length > 0 ? parseFloat(this.state.maxPrice) : 0;
            this.props.search(
                this.state.query, 
                minPrice, 
                maxPrice, 
                this.state.selectedCategoryId
            )
        }
        
    }

    selectCategory = (event:any) => {
        let category_id = parseInt(event.target.getAttribute('id'));
        if(category_id < 0){
            // all categories selected
            this.setState({
                dropDownToggleColor:'secondary', 
                selectedCategoryId:category_id, 
                selectedCategoryText: event.target.textContent,
            });
        }
        else{
            this.setState({
                dropDownToggleColor:'primary', 
                selectedCategoryId:category_id, 
                selectedCategoryText: event.target.textContent,
            });
        }
        console.log(event.target.textContent);
    }

    setQuery = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({query: event.target.value})
    }

    setMinPrice = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({minPrice: event.target.value});
    }

    setMaxPrice = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({maxPrice: event.target.value});
    }


    render(){
        let allCategories = [new Category(-1, 'All'), ...this.props.categories]
        return(
            <Row>
                <Col lg='7' md='7' xs='12' >
                    <Input placeholder='Search for a product' onKeyDown={this.handleKeyDown}
                           value={this.state.query} onChange={this.setQuery}/>
                </Col>
                <Col lg='2' md='2' xs='6' className='pt-1 pt-lg-0 pt-md-0'>
                    <Dropdown isOpen={this.state.isDropDownOpen} toggle={this.toggle}>
                        <DropdownToggle caret color={this.state.dropDownToggleColor} className='btn-block'>
                            {this.state.selectedCategoryText}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Product Categories</DropdownItem>
                            {allCategories.map((value:Category) => {
                                return (<DropdownItem id={value.id.toString()} key={value.id} onClick={this.selectCategory}>{value.name}</DropdownItem>);
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <Col lg='3' md='3' xs='6' className='pt-1 pt-lg-0 pt-md-0 pl-n2'>
                    <Row>
                        <Col xs='6' className='pl-n2 mr-n1'>
                            <Row>
                                <Col xs='4' style={{fontSize: '13px'}}>
                                    From &#8358;   
                                </Col>
                                <Col xs='8' className='pl-n2 pr-2'>
                                    <Input placeholder='0.00' value={this.state.minPrice} onChange={this.setMinPrice}
                                           type='number' min='0.00'/>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs='6' className='pl-n2 mr-n1'>
                            <Row>
                                <Col xs='4' style={{fontSize: '13px'}}>
                                    To
                                    &#8358;
                                </Col>
                                <Col xs='8' className='pl-n2 pr-2'>
                                    <Input placeholder='0.00' value={this.state.maxPrice} onChange={this.setMaxPrice}
                                           type='number' min='0.00'/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}