import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import { Container, Form, FormGroup, Button, Label, Input, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

class AddExpense extends Component {
    emptyItem = {
        description: "",
        expenseDate: new Date(),
        location: "",
        category: {
            id: 1,
            name: "Travel"
        }
    }

    constructor(props){
        super(props);

        this.state = { 
            categories : [],
            item: this.emptyItem
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleLocChange = this.handleLocChange.bind(this);
        this.handleCatChange = this.handleCatChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/categories`)
          .then(res => {
            const categories = res.data;
            this.setState({ 
                ...this.state,
                isLoading: false,
                categories: categories });
        })

        console.log(`Recieve id : ${this.props.location.id}`);
    }

    handleDescChange(event){
        const value = event.target.value;

        const item = {...this.state.item};
        item.description = value;
        this.setState({item});

        console.log(item);
    }

    handleLocChange(event){
        const value = event.target.value;

        const item = {...this.state.item};
        item.location = value;
        this.setState({item});

        console.log(item);
    }

    handleCatChange(event){
        const name = event.target.value;

        const item = {...this.state.item};

        axios.get(`/api/category/name/${name}`)
          .then(res => {
            const category = res.data;
            item.category = category;
            this.setState({item});
            console.log(item);
        })
    }

    handleDateChange(date){
        const item = {...this.state.item};
        item.expenseDate = date;
        this.setState({item});

        console.log(item);
    }

    handleSubmit(event){
        event.preventDefault();
        let item = {...this.state.item};

        if(this.props.location.id){
            item = {
                ...item,
                id: this.props.location.id
            };
        }

        axios.post(`/api/createExpense`, item)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.props.history.push("/expenses");
            });
    }

    render() { 
        const {categories} = this.state;
        
        return ( <div>
            <AppNav />
            <Container className="themed-container" fluid="xl">
                <h3>Add New Expense</h3>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label for="expenseTitle" sm={2}>Expense Title</Label>
                        <Col sm={4}>
                            <Input type="text" id="expenseTitle" name="expenseTitle" onChange={this.handleDescChange} sm={10}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="category" sm={2}>Category</Label>
                        <Col sm={4}>
                            <Input type="select" name="select" id="exampleSelect" onChange={this.handleCatChange} >
                                {
                                    categories.map(category => (
                                        <option key={category.id} >{category.name}</option>
                                    ))
                                }
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="expenseDate" sm={2}>Expense Date</Label>
                        <Col sm={4}>
                            <DatePicker selected={this.state.item.expenseDate} onChange={this.handleDateChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="location" sm={2}>Location</Label>
                        <Col sm={4}>
                            <Input type="text" id="location" name="location" onChange={this.handleLocChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button type="submit" color="primary" >Save</Button>
                            {' '}
                            <Button color="secondary" tag={Link} to="/expenses" >Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Container>
        </div> );
    }
}
 
export default AddExpense;