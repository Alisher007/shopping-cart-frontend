import React from "react";
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Home, Apple } from '@material-ui/icons'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 3,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    navButtonStyle: {
      color: 'white',
      'text-decoration': 'none'
    },
  }));

function Nav() {
  const carts = useSelector(state => state.carts);
  const classes = useStyles();
  
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Button color="default">
            <NavLink activeClassName="active" exact to="/" className={classes.navButtonStyle}>  
                <Typography color="inherit" variant="subtitle1">
                    Products  <Home fontSize="small" />
                </Typography>
              </NavLink>
          </Button> <br />
            

          <Button color="default">
            <NavLink activeClassName="active" exact to="/login" className={classes.navButtonStyle}>
              <Typography color="inherit" variant="subtitle1">
                  Login  <Apple fontSize="small"/>
              </Typography>
            </NavLink>
          </Button><br />
          
              
              <Button color="default">
            <NavLink activeClassName="active" exact to="/cartlist" className={classes.navButtonStyle}>
              <Typography color="inherit" variant="subtitle1">
              <Badge badgeContent={carts.length} color="secondary" showZero >
              Cart<ShoppingCartIcon />
              </Badge>
              </Typography>
            </NavLink>
          </Button>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Nav;