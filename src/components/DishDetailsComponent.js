import React, {Component} from 'react';
import {
    Card, CardImg, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
    Modal, Button, Label, ModalHeader, ModalBody, Row, Col
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Control, Errors} from "react-redux-form";

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length > len);

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
                <CommentForm/>
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

        handleSubmit(event){
            alert(this.name.value);
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
                                    <Label htmlFor="name" md={12}>Your name</Label>
                                    <Col md={12}>
                                    <Control.text model=".name"
                                        className="form-control"
                                                  type="text"
                                                  id="name"
                                                  name="name"
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

        const dish = props.dish;

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