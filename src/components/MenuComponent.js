import DishDetails from './DishDetailsComponent';
import React, { Component } from 'react';
import {Card,  CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class Menu extends Component{

    constructor(props){

        super(props);

        this.state = {
            selectedDish : null
        };

        console.log('Menu component constructor() method is invoked');

    }

    onDishSelect(dish){
        this.setState({ selectedDish : dish });
    }

    renderDish(dish){

        if (dish != null){

            return(
                <DishDetails dish={this.state.selectedDish}>
                    {/*<CardImg width={"100%"} src={dish.image} alt={dish.title}/>*/}
                    {/*<CardBody>*/}
                        {/*<CardTitle>{dish.title}</CardTitle>*/}
                        {/*<CardText>{dish.description}</CardText>*/}
                    {/*</CardBody>*/}
                </DishDetails>
            )

        }else{
            return(
                <div></div>
            )
        }

    }

    // getDerivedStateFromProps(){
    //     console.log('Menu componet getDerivedStateFromProps() method is invoked');
    // }

    componentDidMount(){
        console.log('Menu componet componentDidMount() method is invoked');
    }

    render(){

        const menu = this.props.dishes.map((dish) =>{
           return (
               <div key={dish.id} className="col-12 col-md-5 m-1">
                   <Card onClick={() => this.onDishSelect(dish)}>
                       <CardImg width="100%" src={dish.image} alt={dish.name}/>
                       <CardImgOverlay className="ml-5">
                           <CardTitle>{dish.name}</CardTitle>
                       </CardImgOverlay>
                   </Card>
               </div>
           )
        });

        console.log('Menu componet render() method is invoked');

        return (
            <div className="container">
                <div className="row">
                    {menu}
                    {this.renderDish(this.state.selectedDish)}
                 </div>
            </div>
        );
    }

}

export default Menu;
