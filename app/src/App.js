import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Categories from './Categories';
import Expenses from './Expenses';
import AddExpense from './AddExpense';

class App extends Component {
    state = {  }
    render() { 
        return ( <Router>
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/categories" exact={true} component={Categories} />
                <Route path="/expenses" exact={true} component={Expenses} />
                <Route path="/addExpense" exact={true} component={AddExpense} />
            </Switch>
        </Router> );
    }
}
 
export default App;