import React,{ useEffect } from 'react'
import axios from 'axios';
// import ProductDetails from './productDetails';
import MediaCard from '../cart/cartDetail';
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

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
    getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
    function getProducts() {
        axios.get('http://localhost:8000/products/')
        .then(res => {                  
            dispatch({
            type: "GET_PRODUCTS",
            products: res.data
          })
        //   props.history.push('/');
        })
        .catch(err => {
            console.log(' err in fetching ', err);
            
        })
      }      
    return (
    <div>
        <h1>Products</h1>
        <Container maxWidth="md" style={{marginTop:'10px'}}>
        {typeof products !== 'undefined' ? (
          <Grid container spacing={1}>
              {products.map(item => {
                return ( 
                  
                  <Grid item xs={3} key={item.pk}>
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
          <div className="empty">No books to read. Hello free time :).</div>
          </Grid>
          </Grid>
        )}
        </Container>
    </div>
    );
}
export default Products;