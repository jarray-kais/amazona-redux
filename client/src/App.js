import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route , Routes } from 'react-router-dom';
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from './screens/CartScreen';




function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">amazona</Link>
        </div>
        <div>
          <Link to="/cart">Cart
          {
            cartItems.length >0 && (
              <span className='badge'>{cartItems.length}</span>
            )
          }
          </Link>
          <Link to="/signin">Sign in</Link>
        </div>
      </header>
      <main>
      <Routes> 
      <Route path='/cart/:id' element={<CartScreen />} />
      <Route path="/product/:id" element={<ProductScreen/>}></Route>
       <Route path="/" element={<HomeScreen/>} exact></Route> 
      </Routes>
      </main>
      <footer className="row center">ALL RIGHT RESERVED</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
