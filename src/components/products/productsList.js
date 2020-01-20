import React,{ useEffect } from 'react'
import axios from 'axios';
// import ProductDetails from './productDetails';
import MediaCard from '../cart/cartDetail';
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Badge from '@material-ui/core/Badge';
function Products() {

  const products = useSelector(state => state.products);
  
  const carts = useSelector(state => state.carts);
  const dispatch = useDispatch();
  
  useEffect(() => {    
    if (carts.length > -1) {
      dispatch({
        type: "SAVE_CART"
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carts]);

  useEffect(() => {
    login()
    getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  function login() {
    axios.post('http://localhost:8000/products/api/token/',{
      'username': 'admin',
      'password':'admin'
    })
    .then(res => {      
      dispatch({
        type: "LOGIN",
        token: res.data.access
      })
    })
    
    .catch(err => {
        console.log(' err in fetching ', err);
        
    })
  }

    function getProducts() {
        axios.get('http://localhost:8000/products/')
        .then(res => {                  
            dispatch({
            type: "GET_PRODUCTS",
            products: res.data
          })
        })
        .catch(err => {
            console.log(' err in fetching ', err);
            
        })
      }
      function discount(itemDiscount) {
        let number2 = ''
        number2 = '-' + Math.floor(itemDiscount.discount) + '%'
        return number2
      }
    return (
    <div>
        <h1>Products</h1>
        <Container maxWidth="md" style={{marginTop:'10px'}}>
        {products.length !== 0 ? (
          <Grid container spacing={1}>
              {products.map(item => {
                return ( 
                  
                  <Grid item xs={3} key={item.pk} align='right'>
                    <Badge badgeContent={discount(item)}color="primary"></Badge>
                    <MediaCard product={item} 
                    add={() => dispatch({type: "ADD_CART", cart: item})}
                    />
                  </Grid>
                 );
              })}
                 </Grid>

        ) : (
          <Grid container spacing={1}>
          <Grid item xs>
          <h3 className="empty">You need to login to see the product list</h3>
          </Grid>
          </Grid>
        )}
        </Container>
    </div>
    );
}
export default Products;