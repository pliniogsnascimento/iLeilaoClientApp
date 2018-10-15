import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import * as actionCreators from 'store/actions';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {

  state = {
    user: {
      email: '',
      senha: ''
    },
    isShowingError: false
  }

  componentWillMount() {
    if(this.props.user !== null)
      this.redirectToMainPage();
  }

  handleChange = name => event => {
    let user = {...this.state.user};
    user[name] = event.target.value
    this.setState({user: user});
  }

  clearState = () => {
    this.setState({user:{email: '', senha: ''}});
  }

  handleLogin = event => {
    event.preventDefault();
    this.setState({isShowingError: false});
    this.props.login(this.state.user);
  }

  redirectToMainPage = () => {
    this.props.history.push('/leilao');
  }

  render() {
    const { classes } = this.props;
    let errorMessage = null;

    if(this.props.successOnRequest)
      this.redirectToMainPage();

    if(this.props.hasError && !this.state.isShowingError) {
      this.setState({isShowingError: true});
      this.clearState();
    }

    if(this.props.hasError)
      errorMessage = <Typography variant="subtitle1" style={{color: 'red'}} >* Usuário ou senha incorretos!</Typography>;

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Entrar</Typography>
            <form className={classes.form}>
              {errorMessage}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email"
                  autoComplete="email"
                  autoFocus
                  error={this.props.hasError}
                  value={this.state.user.email} 
                  onChange={this.handleChange('email')} />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="senha">Senha</InputLabel>
                <Input
                  autoComplete="current-password"
                  type="password"
                  value={this.state.user.senha}
                  onChange={this.handleChange('senha')} />
              </FormControl>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Continuar conectado"
              />

              <Button type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(event) => this.handleLogin(event)} >
                Entrar
              </Button>
              
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    userRole: state.user.userRole,
    hasError: state.user.hasError,
    successOnRequest: state.user.successOnRequest
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(actionCreators.login(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));