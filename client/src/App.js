import { BrowserRouter, Route , Routes } from 'react-router-dom';
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";



function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">amazona</a>
        </div>
        <div>
          <a href="/cart">Cart</a>
          <a href="/signin">Sign in</a>
        </div>
      </header>
      <main>
      <Routes> 
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
