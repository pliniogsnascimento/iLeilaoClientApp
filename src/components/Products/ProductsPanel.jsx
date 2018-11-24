import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import ProductsCard from './ProductsCard';


const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  }
});

const productsPanel = props => {
  const { classes } = props;
  const { products } = props;

  const accountAccess = props.user ? props.user.conta.acessoConta : 0;

  return (
    <div className={classNames(classes.layout, classes.cardGrid)}>
      <Grid container spacing={40}>
        {products.map(product => (
          <Grid item key={product.id} sm={6} md={4} lg={3}>
            <ProductsCard product={product}
              bidOpenedHandler={props.bidOpenedHandler}
              closeBidOpenedHandler={props.closeBidOpenedHandler}
              accountAccess={accountAccess} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default withStyles(styles)(productsPanel);
