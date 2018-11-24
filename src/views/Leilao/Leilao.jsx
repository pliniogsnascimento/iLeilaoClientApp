import React, { Component } from 'react';
import ApresentacaoLeilao from 'components/ApresentacaoLeilao/ApresentacaoLeilao';
import ProductsPanel from 'components/Products/ProductsPanel';

import { Route } from 'react-router-dom';
import Bid from 'views/Leilao/Bid';
import CloseBid from './CloseBid';

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

  addProductClickedHandler(event) {
    event.preventDefault();
    this.props.history.push('/leilao/produto');
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  bidOpenedHandler = product => {
    this.props.history.push('/leilao/' + product.id);
  }

  closeBidOpenedHandler = product => {
    this.props.history.push('/leilao/' + product.id + '/close');
  }

render() {
    return (
        <main>
          <ApresentacaoLeilao user={this.props.user}
            addProductClickedHandler={event => this.addProductClickedHandler(event)}
            />
          <ProductsPanel user={this.props.user}
            products={this.props.products}
            selectedProduct={this.props.selectedProduct}
            shouldBidOpen={this.state.bidStatus.isOpen}
            bidOpenedHandler={this.bidOpenedHandler}
            closeBidOpenedHandler={this.closeBidOpenedHandler} />

          <Route path={this.props.match.url + '/:id'} exact component={Bid} />
          <Route path={this.props.match.url + '/:id/close'} exact component={CloseBid} />

        </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products,
    selectedProduto: state.products.selectedProduct,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(actionCreators.fetchProducts()),
    fetchProductById: id => dispatch(actionCreators.fetchProductById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leilao);