import React, { Component } from 'react';
import ApresentacaoLeilao from 'components/ApresentacaoLeilao/ApresentacaoLeilao';
// import Modal from '@material-ui/core/Modal';
import ProductsPanel from 'components/Products/ProductsPanel';

import { connect } from 'react-redux';

import * as actionCreators from 'store/actions';

class Leilao extends Component {

  state = {
    bidStatus: {
      isOpen: false,
      product: null
    }
  }

  componentWillMount() {
    if(this.props.user === null)
      this.props.history.push('/');
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  bidOpenedHandler = (product) => {
    let bidState = {...this.state.bidStatus};
    bidState.product = product;
    bidState.isOpen = true;
    this.setState({bidStatus: bidState});
  }

  bidClosedHandler = () => {
    let bidState = {...this.state.bidStatus};
    bidState.product = null;
    bidState.isOpen = false;
    this.setState({bidStatus: bidState});
  }

  render() {
    return (
        <main>
          {/* <Modal></Modal> */}
          <ApresentacaoLeilao />
          <ProductsPanel products={this.props.products}
            shouldBidOpen={this.state.bidStatus.isOpen}
            bidOpenedHandler={this.bidOpenedHandler}
            bidClosedHandler={this.bidClosedHandler} />
        </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(actionCreators.fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leilao);