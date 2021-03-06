import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetails from "./DishDetailsComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {postFeedback, postComment, fetchComments, fetchDishes, fetchPromos, fetchLeaders} from "../redux/ActionCreator";
import {actions} from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//fetchDishes : () => {dispatch(fetchDishes())};

const mapStateToProps = state => {
    return {
        dishes:state.dishes,
        comments:state.comments,
        leaders:state.leaders,
        promotions:state.promotions
    }
}

const mapDispatchToProps = (dispatch) => ({
    // addComment : (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: ()=>{dispatch(fetchPromos())},
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchLeaders: () => {dispatch(fetchLeaders())},
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) =>
        dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
});



class Main extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {

        const HomePage = () => {
            return(
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMes}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMes}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMes}
                />
            );
        }

        const DishWithId = ({match}) => {
            return(
                <DishDetails
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMes}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    commentsErrMess={this.props.comments.errMes}
                    // addComment = {this.props.addComment}
                    postComment = {this.props.postComment}
                />
            )
        }

        return (
            <div>
                <Header/>
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Switch>
                                <Route path="/home" component={HomePage}/>
                                <Route exact path="/menu" component={ () => (<Menu dishes={this.props.dishes} />)} />
                                <Route path="/menu/:dishId" component={ DishWithId } />
                                <Route exact path="/aboutus" component={() => (<About leaders={this.props.leaders}/>)}/>
                                <Route exact path="/contactus"
                                       component={() => <Contact
                                           resetFeedbackForm={this.props.resetFeedbackForm()}
                                           postFeedback={this.props.postFeedback}
                                       />} />
                                <Redirect to="/home" />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
