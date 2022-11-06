import React, { useEffect, useState ,useMemo} from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Login from "./pages/Login"
import Cart from "./common/Cart/Cart"
import { ProductContext } from "./context/ProductContext";

import Footer from "./common/footer/Footer"
import * as api from "./api";

function App() {

  const [shopItems, setShopItems] = useState([]);
  const [CartItem, setCartItem] = useState([]);
  const [user,setUser] = useState(null);
  const productValue = useMemo(() => ({shopItems, setShopItems}), [shopItems, setShopItems]);

  const getProducts = async (page) => {
    const products = await api.fetchItems(page);
   // console.log(products.data);
    setShopItems(products.data.data);
  }


  async function getProductId(id){
    console.log(id)
    const x = await api.fetchItemId(id)
    return x.data
  }


  const getUser = async () => {
    await api
    .fetchUser()
    .then(({ data }) => {
      setUser({name:data.name,email:data.email});
      const cartData =[];
      cartData.push(data.cart.map((item) => {
        const product = getProductId(item.Id);
        return product;
      }));
      setCartItem(cartData);

    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem("profile");
      setUser(null);
    });
  }

  useEffect(() => {
    getUser();
    getProducts(1);
  }, []);

  function changeData(cart){
      const x = [];
      const pro = {
        id: "",
        qty: ""
      }
      cart.map(async(val)=>{
        pro.id = val.id;
        pro.qty = val.qty;
        await x.push(pro);
      })
      return x;
  }

  const addToCart = async(product) => {
    console.log(product);
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
    const cart = changeData(CartItem);
    await api.saveCart(cart);

  }


  const decreaseQty = async(product) => {
    const productExit = CartItem.find((item) => item.id === product.id)

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
    const cart = changeData(CartItem);
    await api.saveCart(cart);
  }

  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <ProductContext.Provider value={productValue}>
        <Switch>
          <Route path='/' exact>
            <Pages  addToCart={addToCart} shopItems={shopItems} /> 
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/cart' exact>
            <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
          </Route>
        </Switch>
        </ProductContext.Provider>
        <Footer />
      </Router>
    </>
  )
}

export default App
