import React from 'react';
import {Card,  CardImg, CardImgOverlay, CardTitle} from 'reactstrap';

    function RenderMenuItem({dish, onClick}){
        return(
                <Card onClick={() => onClick(dish.id)}>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardImgOverlay className="ml-5">
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
        )
    }

    // getDerivedStateFromProps(){
    //     console.log('Menu componet getDerivedStateFromProps() method is invoked');
    // }


    const Menu = (props) => {

        const menu = props.dishes.map((dish) =>{
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish={dish} onClick={props.onClick}/>
                </div>
            )
        });

        console.log('Menu componet render() method is invoked');

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }

export default Menu;
