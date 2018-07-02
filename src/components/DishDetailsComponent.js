import React from 'react';
import {Card, CardImg, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

    function RenderDish({dish}) {
        return(
            <Card>
                    <CardImg src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardBody>{dish.description}</CardBody>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({comments}) {
        return (
            comments.map((comment) => {
                return(
                    <ListGroupItem key={comment.id}>
                        <ListGroupItemHeading>{comment.comment}</ListGroupItemHeading>
                        <ListGroupItemText>{comment.author},
                            {new Intl.DateTimeFormat('en-IN',
                                {year : 'numeric', month:'short', day : '2-digit'})
                                .format(new Date(Date.parse(comment.date)))} </ListGroupItemText>
                    </ListGroupItem>
                )
            })
        );
    }

    const DishDetails = (props) => {

        const dish = props.dish;
        console.log('Dish details component render method is invkoed');

        if (dish != null){

            return(

                <div className="container">

                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={"/menu"}>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>

                    <div className="row">
                        <div className={"col-12 col-md-5 m-1"}>
                            <RenderDish dish={dish} />
                        </div>
                        <ListGroup className={"col-12 col-md-5 m-1"}>
                            <h3>Comments</h3>
                            <RenderComments comments={props.comments}/>
                        </ListGroup>
                    </div>
                </div>

            )

        }else{
            return(
                <div></div>
            )
        }


    }


export default DishDetails;