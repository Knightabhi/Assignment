import React from "react"
import { useEffect,useContext } from "react";
import * as api from "../../api";
import { ProductContext } from "../../context/ProductContext";

const Catg = () => {

  const {setShopItems} = useContext(ProductContext);
  const [data, setdata] = React.useState([]);

  console.log(setShopItems);

  const fetchcat = async () => {
    const { data } = await api.fetchCategories();
    console.log(data);
    setdata(data);
  };

  async function fetchproduct(id){
    const products = await api.fetchItemId(id);
    console.log(products.data)
    return products.data
  }

  const changeProduct = async(index)=>{
    const x =data[index]._id;
    const pro = await api.fetchCategoryId(x);
    const products = []
    pro.data.map((item)=>{
      const x =fetchproduct(item);
      products.push(x);
      return 0;
    })

    console.log(products);

    setShopItems(products);
  }
  useEffect(() => {
    fetchcat();
  }, []);
  
  return (
    <>
      <div className='category'>
        <div className='chead d_flex'>
          <h1>Category </h1>
        </div>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index} onClick={()=>{changeProduct(index)}}>
              <img src="./images/category/cat-1.png" alt='' />
              <span>{value.name}</span>
            </div>
          )
        })}
        <div className='box box2'>
          <button>View All Brands</button>
        </div>
      </div>
    </>
  )
}

export default Catg
