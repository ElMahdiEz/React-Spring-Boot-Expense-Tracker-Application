import React, { Component } from 'react';
import AppNav from './AppNav';
import { Container, Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './App.css';
import axios from 'axios';
import { Spinner } from 'reactstrap';

class Expenses extends Component {
    constructor(props){
        super(props);

        this.state = { 
            isLoading : true,
            categories : [],
            expenses : []
        };
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

        axios.get(`/api/expenses`)
          .then(res => {
            const expenses = res.data;
            this.setState({ 
                ...this.state,
                isLoading: false,
                expenses: expenses });
        })
    }

    editExpense(id){
        console.log(`Send id : ${id}`);

        this.props.history.push({ 
            pathname: '/addExpense',
            id: id
        });
    }

    removeExpense(id){
        axios.delete(`/api/deleteExpense/${id}`)
            .then( () => {
                this.componentDidMount();
            }
        );
    }

    render() { 
        const {expenses, isLoading} = this.state;

        if(isLoading){
            return (
                <div>
                    <AppNav />
                    <Spinner style={{ width: '6rem', height: '6rem' }} />
                </div>
            );
        }

        return ( <div>
                <AppNav />                
                <Container>
                    <h3>Expense list</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                expenses.map(expense => (
                                    <tr key={expense.id}>
                                        <th scope="row">{expense.id}</th>
                                        <td>{expense.description}</td>
                                        <td><Moment date={expense.expenseDate} format="YYYY-MM-DD" /></td>
                                        <td>{expense.location}</td>
                                        <td>{expense.category.name}</td>
                                        <td><Button size="sm" color="warning" onClick={ () => this.editExpense(expense.id) } >Edit</Button></td>
                                        <td><Button size="sm" color="danger" onClick={ () => this.removeExpense(expense.id) } >Delete</Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>                    
                    <Button type="button" size="lg" className="btn btn-success" tag={Link} to="/addExpense">Add Expense</Button>
                </Container>
            </div> );
    }
}
 
export default Expenses;