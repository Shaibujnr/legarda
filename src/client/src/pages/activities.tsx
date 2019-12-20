import '../assets/css/products.css';
import {NextPageContext} from 'next';
import {Component, Fragment, createElement} from 'react';
import {Row, Col, Spinner} from 'reactstrap';
import Layout from '../components/auth/Layout';
import ProductCard from '../components/auth/ProductCard';
import PurchaseModal from '../components/auth/Purchase';
import SearchBar from '../components/auth/ProductSearchBar';
import Activity from '../data/models/activity';
import ActivityService from '../data/services/ActivityService';
import AuthService from '../data/services/AuthService';
import Category from '../data/models/category';
import delay from '../utils/delay';
import cookies from 'next-cookies';
import User from '../data/models/user';


interface IActivitiesState{
    isLoading: boolean;
}

interface IActivitiesProps{
    activities: Activity[];
}

export default class ActivitiesPage extends Component<IActivitiesProps,IActivitiesState>{
    constructor(props:any){
        super(props);
        this.state = {
            isLoading: true
        };
    }


    static async getInitialProps(ctx: NextPageContext):Promise<IActivitiesProps>{
        let activityService =  new ActivityService();
        let activities = await activityService.userActivities(ctx);
        return {activities: activities}

    }

    render(){
        return(
            <Layout>
                <div style={{width:'100%', padding:'20px'}}>
                    <Row className='justify-content-start align-items-center'>
                        <Col md='4' xs='12'>
                            <h1>Activity</h1>
                            <p>Recent activities from your account</p>
                        </Col>
                    </Row>
                    <hr/>
                    {this.props.activities.map((value) => {
                        return (
                            <Fragment key={value.id}>
                            <Row>
                                <Col xs='12' md='5'>
                                    <Row>
                                        <Col xs='2'>
                                            <img src='/images/avatar.svg' style={{width:'60%', height:'60%', borderRadius:'50%'}}/>
                                        </Col>
                                        <Col xs='10' style={{display: 'flex'}} className='align-items-center'>
                                            <p>{value.display}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <hr/>
                            </Fragment>
                            );
                    })}
                </div>
            </Layout>
        );
    }
}
