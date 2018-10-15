import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Wallet from '@material-ui/icons/AccountBalanceWallet';

const styles = {
  fullList: {
    width: 'auto',
  },
};

const menu = props => {
  const { classes } = props;

  return (
    <Drawer open={props.menuOpen} onClose={props.menuStatusChanged}>
      <div className={classes.fullList}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <Wallet />
            </ListItemIcon>
            <ListItemText primary="Seus lances" />
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem button>
            <ListItemIcon>
              {/* <InboxIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Produtos comprados" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
};

export default withStyles(styles)(menu);
