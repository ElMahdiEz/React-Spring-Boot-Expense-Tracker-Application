import React, { Component } from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class AppNav extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.logout = this.logout.bind(this);
    }

    logout() {
        confirmAlert({
            title: 'Confirm to logout',
            message: 'Are you sure to logout ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.post(`/logout`)
                            .then(res => {
                                console.log(res);
                                console.log(res.data);
                                console.log("Logout succes");
                                window.location.href = "/login";
                            });
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    render() {
        return (<div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Expense Tracker Application</NavbarBrand>
                <NavbarToggler />
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/categories">Categories</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/expenses">Expenses</NavLink>
                    </NavItem>

                </Nav>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/login">Login</NavLink>
                    </NavItem>
                    <NavItem onClick={this.logout} >
                        <NavLink href="#" >Logout</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>);
    }
}

export default AppNav;