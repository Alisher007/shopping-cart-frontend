import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import About from './common/about'
import Home from './common/home'
import Products from './products/productsList'
import CartList from './cart/cartList'
import SimpleTable from './cart/table'
import Login from './login/FormAuth'
import Nav from './router/nav'
import Notfound from './common/notFound'
import PrivateRoute from './common/privateRoute'

function Router1() { 
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  useEffect(() => {    
    if (token !== null){
      dispatch({
        type: "LOGIN-CHECK",
        token: JSON.parse(token)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.parse(token)]);
    return (
        <div>
          <Nav  />
          <div style={{marginTop:80}}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/cartlist" component={CartList} />
            <Route exact path="/table" component={SimpleTable} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/about" component={About}/>
            <Route component={Notfound} />
          </Switch>
          </div>
        </div>
    );
}
export default Router1;
