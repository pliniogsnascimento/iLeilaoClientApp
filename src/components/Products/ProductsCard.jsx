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

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={product.imagem} // eslint-disable-line max-len
        title={product.descricao} />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h6">
          R$ {product.lanceMinimo},00
                </Typography>
        <Typography>
          {product.descricao}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => props.bidOpenedHandler(product)} >
          Dar lance
        </Button>
        <Button size="small" color="secondary">
          Fechar Leilao
        </Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(productCard);
