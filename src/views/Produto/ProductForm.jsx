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

class ProductForm extends Component {

  state = {
    fields: {
      descricao: {
        isValid: true,
        value: ''
      },
      imagem: {
        isValid: true,
        value: ''
      },
      lanceMinimo: {
        isValid: true,
        value: ''
      },
      nome: {
        isValid: true,
        value: ''
      },
      email: {
        isValid: true,
        value: ''
      },
      contato: {
        isValid: true,
        value: '',
        minLength: 10
      },
      senhaEncerramento: {
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
      newState[key].value = '';

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
        descricao: this.state.fields.descricao.value,
        lanceMinimo: this.state.fields.lanceMinimo.value,
        vendedor: {
          nome: this.state.fields.nome.value,
          email: this.state.fields.email.value,
          contato: this.state.fields.contato.value
        },
        imagem: this.state.fields.imagem.value,
        senhaEncerramento: this.state.fields.senhaEncerramento.value
      }
  
      axios.post('api/v1/produtos', json)
        .then(response => {
          console.log(response.data);
          this.setState({hasSuccessOnRegister: true});
          this.setState({hasErrorOnRegister: false});
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
        Leilão registrado com sucesso!
      </Typography>;
      errorMessage = null;
    }

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h3" gutterBottom>
            Criar novo leilão
          </Typography>
          {successMessage}
          {errorMessage}
          <form>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="descricao">Nome do produto</InputLabel>
                  <Input id="descricao"
                    autoFocus
                    value={this.state.fields.descricao.value} 
                    onChange={this.handleChange('descricao')} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="lance">Lance mínimo</InputLabel>
                  <Input id="lance"
                    type="number"
                    value={this.state.fields.lanceMinimo.value} 
                    onChange={this.handleChange('lanceMinimo')} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="imagem">Link da imagem</InputLabel>
                  <Input id="imagem"
                    autoFocus
                    value={this.state.fields.imagem.value} 
                    onChange={this.handleChange('imagem')} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="vendedor">Nome do vendedor</InputLabel>
                  <Input id="vendedor"
                    value={this.state.fields.nome.value} 
                    onChange={this.handleChange('nome')} />
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
              <Grid item xs={12} sm={12}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="contato">Contato</InputLabel>
                  <Input id="contato"
                    value={this.state.fields.contato.value} 
                    onChange={this.handleChange('contato')} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="senhaEncerramento">Senha de encerramento</InputLabel>
                  <Input id="senhaEncerramento"
                    type="password"
                    error={!this.state.fields.senhaEncerramento.isValid}
                    value={this.state.fields.senhaEncerramento.value} 
                    onChange={this.handleChange('senhaEncerramento')} />
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

export default withStyles(styles)(ProductForm);
