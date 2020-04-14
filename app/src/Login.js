import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/elmahdi-ezzahir/">
        El Mahdi EZZAHIR
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      roles: []
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleOnChangeUsername = this.handleOnChangeUsername.bind(this);
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();

    var querystring = require('querystring');

    axios.post(`/login`,
      querystring.stringify({
        username: this.state.username,
        password: this.state.password
      }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      console.log(res);
      console.log(res.data);
      console.log("Login succes");                                
      if (this.state.username === 'admin') {
        this.setState({
          ...this.state,
          roles: ['user', 'admin']
        });
      } else if (this.state.username === 'user') {
        this.setState({
          ...this.state,
          roles: ['user']
        });
      }
      this.props.history.push("/");
    });
  }

  handleOnChangeUsername(event) {
    const username = event.target.value;

    this.setState({
      ...this.state,
      username: username
    });

    console.log(username);
  }

  handleOnChangePassword(event) {
    const password = event.target.value;

    this.setState({
      ...this.state,
      password: password
    });

    console.log(password);
  }

  render() {
    return (<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >
        <div >
          <Avatar style={{ marginLeft: 'auto', marginRight: 'auto' }} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="text-center" >
            Sign in
          </Typography>
        </div>
        <form onSubmit={this.handleLogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={this.handleOnChangeUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handleOnChangePassword}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>);
  }
}

export default Login;