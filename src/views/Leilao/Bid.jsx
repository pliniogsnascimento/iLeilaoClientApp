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

class Bid extends Component {

  state = {
    form: {
      lance: ''
    },
    isValid: false,
    errorMessage: '',
    successOnBid: false
  }

  handleChange = name => event => {
    let form = {...this.state.form};
    form[name] = event.target.value;
    this.validateNumber(form[name]);
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

  validateNumber(number) {
    if(number <= this.props.selectedProduct.lanceMinimo)
      this.setState({isValid: false});
    else
      this.setState({isValid: true});
  }

  bidClickedHandler(event) {
    event.preventDefault();

    const bid = {
      valor: this.state.form.lance,
      participante: {
        id: this.props.userId
      }
    }

    if(!this.state.isValid)
      this.setState({errorMessage: 'O valor digitado é inválido!'});
    else {
      axios.post('api/v1/produtos/' + this.props.match.params.id + '/lances', bid)
      .then(response => {
        console.log(response.data);
        this.setState({successOnBid: true});
        this.props.fetchProductById(this.props.match.params.id);
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

    if(this.state.successOnBid) {
      successMessage = <Typography variant="subtitle1" align="center" style={{color: 'green'}} >
        Lance aceito
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
          {selectedProduct.descricao}
        </Typography>
        <img src={selectedProduct.imagem} alt={selectedProduct.descricao} style={{width: '330px', height: '200px'}} />
        <Typography variant="subtitle1" id="simple-modal-description">
          Lance mínimo em R$ {selectedProduct.lanceMinimo}
        </Typography>

        {errorMessage}
        {successMessage}

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="lance">Lance</InputLabel>
          <Input id="lance"
            autoFocus
            type="number"
            error={!this.state.isValid}
            value={this.state.form.lance} 
            onChange={this.handleChange('lance')} />
        </FormControl>
        <Button type="submit"
          fullWidth
          variant="contained"
          className={classes.button}
          onClick={(event) => this.bidClickedHandler(event)} 
          disabled={!this.state.isValid}
          >
          Efetuar Lance
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
    selectedProduct: state.products.selectedProduct,
    userId: state.user.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProductById: id => dispatch(actionCreators.fetchProductById(id)),
    clearSelectedProduct: () => dispatch(actionCreators.clearSelectedProduct()),
    createBid: (productId, bid) => dispatch(actionCreators.createBid(productId, bid)),
    fetchProducts: () => dispatch(actionCreators.fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Bid));
