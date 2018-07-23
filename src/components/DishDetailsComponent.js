import React, {Component} from 'react';
import {
    Card, CardImg, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
    Modal, Button, Label, ModalHeader, ModalBody, Row, Col
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Control, Errors} from "react-redux-form";
import {Loading} from './LoadingComponent';
import {baseUrl} from "../shared/baseUrl";

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length > len);

    function RenderDish({dish}) {
        return(
            <Card>
                <CardImg src={baseUrl+ dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardBody>{dish.description}</CardBody>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({comments, postComment, dishId}) {

        const Comment = (commentslist) => comments.map((comment) => {
            return(
                <ListGroupItem key={comment.id}>
                    <ListGroupItemHeading>{comment.comment}</ListGroupItemHeading>
                    <ListGroupItemText>{comment.author},
                        {new Intl.DateTimeFormat('en-IN',
                            {year : 'numeric', month:'short', day : '2-digit'})
                            .format(new Date(Date.parse(comment.date)))} </ListGroupItemText>
                </ListGroupItem>
            )
        });

        return (
            <div>
                <Comment commentslist={comments}/>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        );
    }

    class CommentForm extends Component{

        constructor(props){
            super(props);

            this.state = {
                isModalOpen : false
            }

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

        }

        toggleModal(){
            this.setState({
                isModalOpen : !(this.state.isModalOpen)
            });
        }

        handleSubmit(values){
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render(){
            return(

                <div>
                    <Button onClick={this.toggleModal} className="btn-primary">
                            <span className="fa fa-pencil fa-lg"></span>
                            Submit Feedback
                    </Button>
                    <Modal key="CommentForm" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>

                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" className="form-control" type="select" id="rating" name="rating">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your name</Label>
                                    <Col md={12}>
                                    <Control.text model=".author"
                                        className="form-control"
                                                  type="text"
                                                  id="author"
                                                  name="author"
                                                  placeholder="Your name"
                                                  autoComplete="off"
                                                  validators = {{
                                                      maxLength : maxLength(15),
                                                      minLength : minLength(2)
                                                  }}
                                        />
                                        <Errors className="text-danger" model=".name" show="touched"
                                            messages = {{
                                                minLength : 'Must be greater than 2 characters',
                                                maxLength : 'Must be 15 characters or less'
                                            }} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={12}>
                                    <Control.textarea model=".comment" className="form-control"
                                        type="textarea"
                                        rows={6}
                                        id="comment"
                                        name="comment"
                                        placeholder="Comments"/>
                                    </Col>
                                </Row>
                                <Button type="submit" value="submit" className="bg-primary">Submit</Button>
                            </LocalForm>

                        </ModalBody>
                    </Modal>
                </div>
            )
        }

    }

    const DishDetails = (props) => {

        if (props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMes){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMes}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null){

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
                            <RenderDish dish={props.dish} />
                        </div>
                        <ListGroup className={"col-12 col-md-5 m-1"}>
                            <h3>Comments</h3>
                            <RenderComments
                                comments={props.comments}
                                postComment={props.postComment}
                                dishId={props.dish.id} />
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