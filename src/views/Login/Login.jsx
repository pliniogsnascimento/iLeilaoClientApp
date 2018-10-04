import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component {
  render() {
    return(
      <form noValidate autoComplete="off">
        <TextField
          id="login"
          label="Login"
          // className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          id="senha"
          label="Senha"
          // className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin="normal"
        />
        <Button variant="contained" >
          Entrar
        </Button>
      </form>
    );
  }
}

export default Login;
