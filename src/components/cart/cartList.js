import React,{ useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';


const StyledTableRow = withStyles(theme => ({
  root: {
      backgroundColor: theme.palette.background.default,
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  total: {
    borderColor: 'white',
  }
});


export default function CartList() {
    const carts = useSelector(state => state.carts);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {    
      if (carts.length > -1) {
        dispatch({
          type: "SAVE_CART"
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carts]);
  function totalPrice(){
    // let val = carts.reduce(function(previousValue, currentValue) {
    //   return (previousValue.price + currentValue.price) * (previousValue.quantityCart + currentValue.quantityCart)
    // });
    // return val
    return carts.reduce((a, b) => +a + +b.price, 0) * carts.reduce((a, b) => +a + +b.quantityCart, 0);
  }
  function totalQty(){
    return carts.reduce((a, b) => +a + +b.quantityCart, 0);
  }
  return (
    <div>
      <h1>Shopping Cart</h1>
    <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
        <Grid item >
        { carts.length !== 0 ? (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
              {carts.map(item => {
                  return ( 
                      <TableRow key={item.pk}>
                      <TableCell component="th" scope="row">{item.name}</TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">{item.quantityCart}</TableCell>
                      <TableCell align="right">
                        <Button size="small"><AddCircleIcon fontSize="small" style={{ color: green[500] }}
                          onClick={() => dispatch({type: "ADD_CART", cart: item})}/></Button>
                        <Button size="small"><RemoveCircleIcon 
                          fontSize="small" color="secondary" 
                          onClick={() => dispatch({type: "REDUCE_CART", cart: item})}/></Button>
                        <Button size="small"><DeleteIcon fontSize="small" 
                          onClick={() => dispatch({type: "REMOVE_CART", cart: item})}/></Button>
                      
                      </TableCell>
                      </TableRow>
                  );
              })}
              <StyledTableRow className={classes.total}>
              <TableCell component="th" scope="row">Total</TableCell>
            <TableCell align="right">${totalPrice()}</TableCell>
              <TableCell align="right">{totalQty()}</TableCell>
              </StyledTableRow>
          </TableBody>
        </Table>
    </TableContainer>
    ): (<p>No items in the Shopping Cart</p>)}
        </Grid>
      </Grid>
      </div>
  );
}