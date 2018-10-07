import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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

  return (
    <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
          Comece a leiloar no iLeilão
      </Typography>
        <Typography variant="title" align="center" color="textSecondary" paragraph>
          O melhor lugar para leiloar seus pertences.
          Basta adicionar o seu produto com um preço mínimo e começar!
      </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={16} justify="center">
            <Grid item>
              <Button variant="contained" color="primary">
                Publicar
            </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">
                Buscar seus itens
            </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default withStyles(style)(apresentacaoLeilao);
