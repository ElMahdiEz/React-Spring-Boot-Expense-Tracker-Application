import React, { Component } from 'react';
import AppNav from './AppNav';
import { Jumbotron } from 'reactstrap';

class Home extends Component {
    state = {  }
    render() { 
        return ( <div>
            <AppNav />
            <div>
                <Jumbotron>
                    <h1 className="display-3">Welcome to easy expense app !</h1>
                </Jumbotron>
            </div>
        </div> )
    }
}
 
export default Home;