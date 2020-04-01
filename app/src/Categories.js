import React, { Component } from 'react';
import axios from 'axios';
import AppNav from './AppNav';
import { Container, Table, Form, Button, Input } from 'reactstrap';
import { Spinner } from 'reactstrap';

class Categories extends Component {
    emptyItem = {
        name: ""
    }

    constructor(props){
        super(props);

        this.state = { 
            isLoading : true,
            categoryToEdit : -1,
            categories : [],
            item: this.emptyItem
        }

        this.removeCategory = this.removeCategory.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameChangeEdit = this.handleNameChangeEdit.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/categories`)
            .then(res => {
            const categories = res.data;
            console.log(categories);
            this.setState({ 
                isLoading: false,
                categories: categories });
            })
    }

    editCategory(id){
        this.setState({
            ...this.state,
            categoryToEdit : id
        });
    }

    removeCategory(id){
        axios.delete(`/api/deleteCategory/${id}`)
        .then(res => {
            this.componentDidMount();
        })
    }

    handleNameChange(event){
        const name = event.target.value;
        const item = {
            name: name
        };

        this.setState({item});

        console.log(this.state.item);
    }

    handleNameChangeEdit(event, id){
        const name = event.target.value;
        const item = {
            id: id,
            name: name
        };

        this.setState({item});

        console.log(this.state.item);
    }

    handleSubmitAdd(event){
        const item = this.state.item;

        axios.post(`/api/createCategory`, item)
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
    }

    render() { 
        const {categories, isLoading, categoryToEdit} = this.state;

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
                <h3>Category list</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(category => (
                                <tr key={category.id}>
                                    <th scope="row">{category.id}</th>
                                    {(categoryToEdit !== category.id) && 
                                        [<td key='0'>{category.name}</td>,
                                        <td key='1'><Button size="sm" color="warning" onClick={ () => this.editCategory(category.id) } >Edit</Button></td>,
                                        <td key='2'><Button size="sm" color="danger" onClick={ () => this.removeCategory(category.id) } >Delete</Button></td>]
                                    }
                                    <td>{(categoryToEdit === category.id) && 
                                        <Form onSubmit={this.handleSubmitAdd} inline>
                                            <Input type="text" id="categoryNameEdit" name="categoryNameEdit" defaultValue={category.name} className="mb-2 mr-sm-2 mb-sm-0" onChange={ (event) => this.handleNameChangeEdit(event, category.id) } />
                                            <Button type="submit" className="btn btn-primary" size="sm" >Edit Category</Button>
                                        </Form>
                                    }</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td></td>
                            <td>
                                <Form onSubmit={this.handleSubmitAdd} inline>
                                    <Input type="text" id="categoryName" name="categoryName" placeholder="Name" className="mb-2 mr-sm-2 mb-sm-0" onChange={this.handleNameChange} />
                                    <Button type="submit" className="btn btn-success" size="sm" >Add Category</Button>
                                </Form>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div> );
    }
}
 
export default Categories;