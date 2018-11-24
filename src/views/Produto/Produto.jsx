import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProductForm from './ProductForm';

import { connect } from 'react-redux';

const style = theme => ({
  heroUnit: {
    backgroundColor: '#81D4FA'
    ,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  }
});

class Produto extends Component {
  componentWillMount() {
    if(this.props.user === null)
      this.props.history.push('/');
    else if(this.props.user.conta.acessoConta === 0)
      this.props.history.push('/leilao');
  }

  render() {

    const { classes } = this.props;

    return(
      <React.Fragment>
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography variant="h2" align="center" style={{color: 'white'}} gutterBottom>
              Criar Novo Leilão
            </Typography>

            <Typography variant="subtitle1" align="center" style={{color: 'white'}} paragraph>
              Criar um leilão nunca foi tão fácil.
              Tenha em mãos os dados do vendedor e do produto a ser leiloado!
            </Typography>

          </div>
        </div>

        <ProductForm />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(withStyles(style)(Produto));