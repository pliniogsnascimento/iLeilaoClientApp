import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import {connect} from 'react-redux';
import * as actionCreators from 'store/actions';
import axios from 'services/axiosLeilao';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '25%',
    left: '37%'
  },
  button: {
    color: '#F5F5F5',
    backgroundColor: '#039BE5',
    '&:hover': {
      backgroundColor: '#03A9F4'
    }
  }
});

class CloseBid extends Component {

  state = {
    form: {
      closePass: ''
    },
    isValid: true,
    errorMessage: '',
    successOnBid: false,
    buyer: null
  }

  componentWillMount() {
    if(this.props.userId === null)
      this.props.history.push('/');
  }

  handleChange = name => event => {
    let form = {...this.state.form};
    form[name] = event.target.value;
    // this.validateNumber(form[name]);
    this.setState({form: form});
  }

  close() {
    this.props.clearSelectedProduct();
    this.props.fetchProducts();
    this.props.history.push('/leilao');
  }

  componentDidMount() {
    this.props.fetchProductById(this.props.match.params.id);
  }

  bidClickedHandler(event) {
    event.preventDefault();

    console.log(this.props.selectedProduct);

    const produto = this.props.selectedProduct;

    produto.status = 1;

    if(!this.state.isValid)
      this.setState({errorMessage: 'O valor digitado é inválido!'});
    else {
      axios.patch('api/v1/produtos/' + this.props.match.params.id, produto)
      .then(response => {
        this.setState({buyer: response.data});
        this.setState({successOnBid: true});
      }).catch(err => {
        console.log(err);
        this.setState({errorMessage: 'Ocorreu um erro!\nTente novamente mais tarde.'})
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { selectedProduct } = this.props;

    let component = null;

    let errorMessage = null;
    let successMessage = null;

    if(this.state.errorMessage !== '') {
      errorMessage = <Typography variant="subtitle1" align="center" style={{color: 'red'}} >
        {this.state.errorMessage}
      </Typography>;
      successMessage = null;
    }

    if(this.state.successOnBid && this.state.buyer !== null) {
      successMessage = <Typography variant="subtitle1" align="center" style={{color: 'green'}} >
        Leilao encerrado! Vendido para {this.state.buyer.nome}.<br/>Email: {this.state.buyer.conta.email}
      </Typography>;
      errorMessage = null;
    }

    if(this.props.selectedProduct !== null)
      component = <Modal aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={true}
      onClose={() => this.close()} >
      <div className={classes.paper}>
        <Typography variant="h6" id="modal-title">
          Fechar leilao
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          Digite a senha de encerramento de {selectedProduct.descricao}
        </Typography>

        {errorMessage}
        {successMessage}

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="close">Senha de Encerramento</InputLabel>
          <Input id="close"
            autoFocus
            type="password"
            error={!this.state.isValid}
            value={this.state.form.closePass} 
            onChange={this.handleChange('closePass')} />
        </FormControl>
        <Button type="submit"
          fullWidth
          variant="contained"
          className={classes.button}
          disabled={this.state.successOnBid}
          onClick={(event) => this.bidClickedHandler(event)} 
          >
          Encerrar
        </Button>
      </div>
    </Modal>

    return (
      <div>
        {component}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.products.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearSelectedProduct: () => dispatch(actionCreators.clearSelectedProduct()),
    fetchProducts: () => dispatch(actionCreators.fetchProducts()),
    fetchProductById: id => dispatch(actionCreators.fetchProductById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CloseBid));
