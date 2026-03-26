import "./App.css";
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import NavBar from "./NavBar";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Product from "./Components/Product";
import ProductList from "./Components/ProductList";
import ProductDetails from "./Components/ProductDetails";
import NotFound from "./Components/NotFound";
import New_product from "./Components/New_product";
import UpdateProduct from "./Components/UpdateProduct";
import WishList from "./Components/WishList";

if( !localStorage.getItem("cart")){

  let webStore=localStorage.setItem("cart",JSON.stringify ([]))
}

function App() {
  return (
    <>
      <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home></Home>}/>
          <Route path="/Login" element={<Login></Login>}/>
          <Route path="/signup" element={<Signup></Signup>}/>
          <Route path="/newproduct" element={<New_product></New_product>}/>

          <Route path="/product" element={<Product></Product>}>
          <Route index element={<ProductList></ProductList>}/>
          <Route path="list" element={<ProductList></ProductList>}/>
          <Route path="details" element={<ProductDetails></ProductDetails>}/>
          </Route>
         <Route path="/update/:id" element={<UpdateProduct></UpdateProduct>}/>
         <Route path="wishList" element={<WishList></WishList>}/>
          {/* <Route path="*" element={<NotFound></NotFound>}/> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
