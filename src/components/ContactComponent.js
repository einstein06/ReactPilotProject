import React, { Component } from 'react';
import {BreadcrumbItem, Breadcrumb,
        Form, Label, Input, FormGroup, Button, Col, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';

class Contact extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstname : '',
            lastname : '',
            telnum : '',
            email : '',
            agree : false,
            contactType : '',
            message : '',
            touched : {
                firstname:false,
                lastname:false,
                telnum:false,
                email:false
            }

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched : { ...this.state.touched,[field] : true}
        });
    }

    validate(firstname, lastname, telnum, email){
        const errors = {
            firstname : "",
            lastname : "",
            telnum : "",
            email : ""
        };

        if (this.state.touched.firstname && firstname.length <= 3)
            errors.firstname = 'First name should be >3 characters';
        else if (this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First name should be <10 characters';

        if (this.state.touched.lastname && lastname.length <= 3)
            errors.lastname = 'Last name should be >3 characters';
        else if (this.state.touched.lastname && lastname.length > 10)
            errors.lastname = 'Last name should be <10 characters';

        const reg = /^\d+$/;
        if (this.state.touched.telnum && !reg.test(telnum))
            errors.telnum = 'Tel. number should contain numbers only';

        if (this.state.touched.email && email.split('').filter((x) => x === '@').length !== 1)
            errors.email = 'EMail should contain a @';

        return errors;
    }

    handleInputChange( event ){

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });

    }

    handleSubmit(event){

        console.log('Current state is :' + JSON.stringify(this.state));
        alert('Current state is :' + JSON.stringify(this.state));
        event.preventDefault();

    }


    render() {
        const errors =  this.validate(this.state.firstname,
                                        this.state.lastname,
                                        this.state.telnum,
                                        this.state.email);
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={"/home"}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr/>
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br/>
                            Clear Water Bay, Kowloon<br/>
                            HONG KONG<br/>
                            <i className="fa fa-phone"></i>: +852 1234 5678<br/>
                            <i className="fa fa-fax"></i>: +852 8765 4321<br/>
                            <i className="fa fa-envelope"></i>: <a
                            href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i
                                className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i
                                className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>

                {/*Forms implemented*/}
                <div className="row row-content" >
                    <div className="col-12">
                        <h3>Send your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname"
                                           onChange={this.handleInputChange}
                                           onBlur={this.handleBlur('firstname')}
                                           valid={errors.firstname === ""}
                                           invalid = {errors.firstname !== ''}
                                           value={this.state.firstname}
                                           placeholder="First name"
                                    />
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname"
                                           onChange={this.handleInputChange}
                                           onBlur={this.handleBlur('lastname')}
                                           valid={errors.lastname === ""}
                                           invalid = {errors.lastname !== ''}
                                           value={this.state.lastname}
                                           placeholder="Last name"
                                    />
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telno" md={2}>Tel No.</Label>
                                <Col md={10}>
                                    <Input type="tel" id="telnum" name="telnum"
                                           onChange={this.handleInputChange}
                                           onBlur={this.handleBlur('telnum')}
                                           valid={errors.telnum === ""}
                                           invalid = {errors.telnum !== ''}
                                           value={this.state.telno}
                                           placeholder="Tel no."
                                    />
                                    <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>EMail</Label>
                                <Col md={10}>
                                    <Input type="text" id="email" name="email"
                                           onChange={this.handleInputChange}
                                           onBlur={this.handleBlur('email')}
                                           valid={errors.email === ""}
                                           invalid = {errors.email !== ''}
                                           value={this.state.email}
                                           placeholder="email"
                                    />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md={{size:6, offset:2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                   name="agree"
                                                   value={this.state.agree}
                                                   onChange={this.handleInputChange} />
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size : 3, offset: 1 }}>
                                    <Input type="select" id="contactType" name="contactType"
                                           onChange={this.handleInputChange}
                                           value={this.state.contactType}
                                           placeholder="Select">
                                        <option value="telno">Tel No.</option>
                                        <option value="email">EMail</option>
                                    </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="message" md={2}>message</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message"
                                           onChange={this.handleInputChange}
                                           value={this.state.message}
                                           placeholder="message"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size : 10, offset:2 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>

                    </div>
                </div>


            </div>
        )
    };
}

export default Contact;