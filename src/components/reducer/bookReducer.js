// import axios from 'axios';
const cartsStorage = JSON.parse(localStorage.getItem('carts'))
const initial = {
  carts: cartsStorage ? cartsStorage : [],
  products: [],
  isAuthenticated: false,
  token: ''
}
const bookReducer = (state = initial, action) => {
    switch (action.type) {
      // case "LOGIN2":
      //   let token2 = ''
      //   axios.post('http://localhost:8000/products/api/token/',{
      //       'username': 'admin',
      //       'password':'admin'
      //     })
      //     .then(res => {      
      //       token2 = res.data.access
      //     })
      //     .catch(err => {
      //         console.log(' err in fetching ', err);
      //     })
      //   localStorage.setItem("token", JSON.stringify(token2));        
      //   return {
      //     ...state,
      //     isAuthenticated: true,
      //     token: token2
      //   };
      case "LOGIN":
        localStorage.setItem("token", JSON.stringify(action.token));        
        return {
          ...state,
          isAuthenticated: true,
          token: action.token
        };
      case "LOGIN-CHECK":     
        return {
          ...state,
          isAuthenticated: true,
          token: action.token
        };

      case "LOGOUT":
        localStorage.removeItem("token");
          return {
            ...state,
            isAuthenticated: false,
          };

      case 'ADD_CART':
        
        if (state.carts !== []){
          const ADD_CARTIndex = state.carts.findIndex(t => t.pk === action.cart.pk);
          if(ADD_CARTIndex !== -1){
            const ADD_CARTSCopy = Object.assign([], state.carts);
            const ADD_CARTItem = ADD_CARTSCopy.find(t => t.pk === action.cart.pk); 
            ADD_CARTItem.quantityCart++
            ADD_CARTSCopy.splice(ADD_CARTIndex, 1, ADD_CARTItem);
            return {...state, carts: ADD_CARTSCopy}
          }
        }
        const ADD_CART = Object.assign({}, action.cart, {'quantityCart':1})
        const ADD_CARTSCopy = Object.assign([], state.carts);
        ADD_CARTSCopy.push(ADD_CART)
        return {...state, carts: ADD_CARTSCopy}

      case 'REDUCE_CART':
        
        const addCartItem = state.carts.find(t => t.pk === action.cart.pk)
        if(addCartItem !== undefined && addCartItem.quantityCart > 1){
          const addCartItem = state.carts.find(t => t.pk === action.cart.pk)
          const addCartItemCopy = {...addCartItem};
          addCartItemCopy.quantityCart--
          const cartsCopy = [...state.carts]; 
          const cartsCopyIndex = cartsCopy.findIndex(t => t.pk === action.cart.pk); 
          cartsCopy.splice(cartsCopyIndex, 1, addCartItemCopy);
          return {...state, carts: cartsCopy}
        }else{
          let reduceCart = state.carts.filter(cart => cart.pk !== action.cart.pk);
          console.log(reduceCart, ' reduceCart');
          console.log(state.carts, ' state.carts');
          
          return {...state, carts: reduceCart}
        }

      case 'GET_PRODUCTS':        
        return {...state, products:action.products}

      case 'REMOVE_CART':
        let reduceCart = state.carts.filter(cart => cart.pk !== action.cart.pk);
        return {...state, carts: reduceCart}

      case 'SAVE_CART':
        localStorage.setItem("carts", JSON.stringify(state.carts)); 
        return state;

      default:
        return state;
    }
  } 
  
  export default bookReducer;