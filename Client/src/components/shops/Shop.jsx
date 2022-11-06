import React,{useContext,useState,useEffect} from "react"
import Catg from "./Catg"
import ShopCart from "./ShopCart"
import "./style.css"
import { ProductContext } from "../../context/ProductContext";

const Shop = ({ addToCart}) => {
  // const {shopItems} = useContext(ProductContext);

  // const [data,setData] = useState([]);

  // useEffect(()=>{
  //   setData(shopItems)
  // })
  // console.log(shopItems);
  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          <Catg />

          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>Eatables</h2>
              </div>
            </div>
            <div className='product-content  grid1'>
              <ShopCart addToCart={addToCart} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Shop
