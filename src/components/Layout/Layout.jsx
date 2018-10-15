import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountIcon from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from './Menu';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  appBar: {
    color: '#F5F5F5',
    backgroundColor: '#039BE5'
  },
  footer: {
    marginTop: theme.spacing.unit * 6,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
    color: '#263238'
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
});

const layout = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} >
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={props.menuStatusChanged}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            ILeilão
          </Typography>
          <IconButton color="inherit">
            <AccountIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu menuOpen={props.menuOpen} 
        menuStatusChanged={props.menuStatusChanged} />
      
      {props.children}

      <footer className={classes.footer} >
        <Typography variant="h6" align="center" gutterBottom>
          Undermarket enterprise
        </Typography>
        <Typography variant="caption" align="center" color="textSecondary" component="p">
          Leilões ltda.
        </Typography>
      </footer>
    </div>
  )
};

const SimpleModalWrapped = withStyles(styles)(layout);

export default SimpleModalWrapped;
