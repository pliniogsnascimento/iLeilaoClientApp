import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    text: {
      primary: {
        main: '#f44336'
      }
    }
  }
});

export default theme;