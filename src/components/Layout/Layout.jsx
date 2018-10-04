import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'components/Theme/Theme';


const layout = props => (
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
  </div>
);

export default layout;
