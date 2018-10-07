import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'components/Theme/Theme';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    marginTop: theme.spacing.unit * 6,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  }
});

const layout = props => {
  const { classes } = props;

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static" color="primary" >
          <Toolbar>
            <Typography variant="title">
              iLeilão
        </Typography>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
      {props.children}

      <footer className={classes.footer} >
        <Typography variant="title" align="center" gutterBottom>
          Undermarket enterprise
        </Typography>
        <Typography variant="subheading" align="center" color="textSecondary" component="p">
          Leilões ltda.
        </Typography>
      </footer>
    </div>
  )
};

export default withStyles(styles)(layout);
