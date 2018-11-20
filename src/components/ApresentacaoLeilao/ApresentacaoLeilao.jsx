import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const style = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
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

const apresentacaoLeilao = props => {
  const { classes } = props;

  let addProductButton = null;

  if(props.user !== null && props.user.conta.acessoConta === 1)
    addProductButton = <Button variant="outlined" size="large" color="primary" className={classes.button} onClick={props.addProductClickedHandler}>
      Adicionar produto
    </Button>

  return (
    <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
          ILeilão
        </Typography>

        <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
          O melhor lugar para leiloar seus pertences.
          Basta adicionar o seu produto com um preço mínimo e começar!
        </Typography>

        {addProductButton}

      </div>
    </div>
  );
}

export default withStyles(style)(apresentacaoLeilao);
