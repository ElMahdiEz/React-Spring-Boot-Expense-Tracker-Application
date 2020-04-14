import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Categories from './Categories';
import Expenses from './Expenses';
import AddExpense from './AddExpense';
import Login from './Login';
// import Logout from './Logout';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        document.title = 'Expense Tracker';
    }

    render() {
        return (<Router>
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/categories" exact={true} component={Categories} />
                <Route path="/expenses" exact={true} component={Expenses} />
                <Route path="/addExpense" exact={true} component={AddExpense} />
                <Route path="/login" exact={true} component={Login} />
                {/* <Route path="/logout" exact={true} component={Logout} /> */}
            </Switch>
        </Router>);
    }
}

export default App;