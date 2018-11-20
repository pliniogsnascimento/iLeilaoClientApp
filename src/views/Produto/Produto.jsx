import React, {Component} from 'react';

import { connect } from 'react-redux';


class Produto extends Component {
  // componentWillMount() {
  //   if(this.props.user === null)
  //     this.props.history.push('/');
  //   else if(this.props.user.conta.acessoConta === 0)
  //     this.props.history.push('/leilao');
  // }

  render() {
    return(
      <div>
        Produtos
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(Produto);