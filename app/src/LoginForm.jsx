import React from "react";
import { Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: "",
        password: ""
    };
  }

  handleValidSubmit = (event, values) => {
    this.setState({
      username: values.username,
      password: values.password
    });

    console.log(`Login Successful`);
    console.log(`Username: ${this.state.username}`);
  };

  handleInvalidSubmit = (event, errors, values) => {
    this.setState({ username: values.username, error: true });
    console.log(`Login failed`);
  };

  render() {
    return (
      <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit} >
        <AvField name="username" label="Username" type="text"
         validate={{
            required: true,
            username: true
          }}
        />
        <AvField name="password" label="Password" type="password" 
         validate={{
            required: {
              value: true,
              errorMessage: "Please enter your password"
            },
            pattern: {
              value: "^[A-Za-z0-9]+$",
              errorMessage:
                "Your password must be composed only with letter and numbers"
            },
            minLength: {
              value: 4,
              errorMessage: "Your password must be between 4 and 16 characters"
            },
            maxLength: {
              value: 16,
              errorMessage: "Your password must be between 4 and 16 characters"
            }
          }}
        />
        <Button id="submit">Sign In</Button>
      </AvForm>
    );
  }
}