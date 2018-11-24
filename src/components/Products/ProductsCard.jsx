import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
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
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
});

const productCard = props => {

  const { product } = props;
  const { classes } = props;

  let closeButton = null;
  let bidButton = null;
  let bidPrice = null;

  const status = product.status === 0 ? false : true;

  if(props.accountAccess === 1) {
    closeButton = <Button size="small" disabled={status} color="secondary" onClick={() => props.closeBidOpenedHandler(product)}>
      Fechar Leilao
    </Button>
  }

  if(props.accountAccess === 0) {
    closeButton = <Button size="small" disabled={status} color="primary" onClick={() => props.bidOpenedHandler(product)} >
    Dar lance
  </Button>
  }

  if(status) 
    bidPrice = 'Leilão encerrado!';
  else
    bidPrice = 'Lance R$ ' + product.lanceMinimo;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={product.imagem}
        title={product.descricao} />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h6">
          {bidPrice}
        </Typography>
        <Typography>
          {product.descricao}
        </Typography>
      </CardContent>
      <CardActions>
        {bidButton}
        {closeButton}
        
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(productCard);
