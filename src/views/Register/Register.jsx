import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import axios from 'services/axiosLeilao';

const styles = theme => ({
  layout: {
    width: 'auto',
    // display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px`,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  }
});

class Register extends Component {

  state = {
    fields: {
      nome: {
        isValid: true,
        value: ''
      },
      sobrenome: {
        isValid: true,
        value: ''
      },
      telefone: {
        isValid: true,
        value: '',
        minLength: 10
      },
      email: {
        isValid: true,
        value: ''
      },
      senha: {
        isValid: true,
        value: '',
        minLength: 6
      },
      confirm: {
        isValid: true,
        value: '',
        minLength: 6
      }
    },
    hasErrorOnRegister: false,
    hasSuccessOnRegister: false,
    hasErrorWithFields: false,
    fieldsWithError: []
  }

  isValidEmail = email => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
  }

  isAboveMinLength = (text, length) => {
    return text.length >= length;
  }

  handleChange = name => event => {
    let fields = {...this.state.fields};
    fields[name].value = event.target.value;

    if(name === 'email')
      fields[name].isValid = this.isValidEmail(fields[name].value);
    
    if(fields[name].minLength)
      fields[name].isValid = this.isAboveMinLength(fields[name].value, fields[name].minLength);

    this.setState({fields: fields});
  }

  clearFields = () => {
    let newState = {...this.state.fields};

    for(let key in newState)
      newState[key] = '';

    this.setState({fields: newState});
  }

  registerUser = event => {
    event.preventDefault();
    let fields = {...this.state.fields};
    let errorFields = [];

    for(let key in this.state.fields) {
      if(!fields[key].isValid)
        errorFields.push(key);
    }

    if(errorFields.length > 0) {
      this.setState({hasErrorWithFields: true, fieldsWithError: errorFields});
    }
    else {
      let json = {
        nome: this.state.fields.nome.value + ' ' + this.state.fields.sobrenome.value,
        conta: {
          email: this.state.fields.email.value,
          senha: this.state.fields.senha.value
        },
        telefone: this.state.fields.telefone.value,
      }
  
      axios.post('api/v1/participantes', json)
        .then(response => {
          console.log(response.data);
          this.setState({hasSuccessOnRegister: true});
          this.setState({hasErrorOnRegister: false});
          setTimeout(() => {
            this.props.history.push('/');
          }, 3000);
        }).catch(err => {
          this.setState({hasSuccessOnRegister: false});
          this.setState({hasErrorOnRegister: true});
          this.clearFields();
          console.log(err);
          for(let key in err.response)
            console.log(key + ': ' + err[key]);
        });      
    }
  }

  render() {
    const { classes } = this.props;
    let errorMessage = null;
    let successMessage = null;

    if(this.state.hasErrorWithFields) {
      errorMessage = <Typography variant="subtitle1" style={{color: 'red'}} >
        Os campos {this.state.fieldsWithError.join(', ')} não foram preenchidos corretamente!
      </Typography>;
      successMessage = null;
    }

    if(this.state.hasErrorOnRegister) {
      errorMessage = <Typography variant="subtitle1" style={{color: 'red'}} >
        Ocorreu um erro ao registrar! Tente novamente mais tarde.
      </Typography>;
      successMessage = null;
    }

    if(this.state.hasSuccessOnRegister) {
      successMessage = <Typography variant="subtitle1" style={{color: 'green'}} >
        Registrado com sucesso! Você será redirecionado a página de login.
      </Typography>;
      errorMessage = null;
    }

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h3" gutterBottom>
            Criar conta no ILeilão
          </Typography>
          {successMessage}
          {errorMessage}
          <form>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="nome">Nome</InputLabel>
                  <Input id="nome"
                    autoFocus
                    value={this.state.fields.nome.value} 
                    onChange={this.handleChange('nome')} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="sobrenome">Sobrenome</InputLabel>
                  <Input id="sobrenome"
                    value={this.state.fields.sobrenome.value} 
                    onChange={this.handleChange('sobrenome')} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="telefone">Telefone</InputLabel>
                  <Input id="telefone"
                    error={!this.state.fields.telefone.isValid}
                    value={this.state.fields.telefone.value} 
                    onChange={this.handleChange('telefone')} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email"
                    autoComplete="email"
                    error={!this.state.fields.email.isValid}
                    value={this.state.fields.email.value} 
                    onChange={this.handleChange('email')} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="senha">Senha</InputLabel>
                  <Input id="senha"
                    type="password"
                    value={this.state.fields.senha.value} 
                    onChange={this.handleChange('senha')} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="confirm">Confirmar senha</InputLabel>
                  <Input id="confirm"
                    type="password"
                    value={this.state.fields.confirm.value} 
                    onChange={this.handleChange('confirm')} />
                </FormControl>
              </Grid>
              <Button type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(event) => this.registerUser(event)} 
                >
                Registrar
              </Button>
            </Grid>
          </form>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Register);
