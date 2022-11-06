import React from "react"
import { useEffect,useContext } from "react";
import * as api from "../../api";
import { ProductContext } from "../../context/ProductContext";

const Catg = () => {

  const {setShopItems} = useContext(ProductContext);
  const [data, setdata] = React.useState([]);


  const fetchcat = async () => {
    const { data } = await api.fetchCategories();
    console.log(data);
    setdata(data);
  };

  const fetchproduct= async(id)=>{
    const x = await api.fetchItemId(id)

    return x.data;
  }

  const changeProduct = async(index)=>{
    if(index==-1)
    {
      const products = await api.fetchItems(1);
      console.log(products.data);
      setShopItems(products.data.data);
      return;
    }
    const x =data[index]._id;
    const pro = await api.fetchCategoryId(x);
    const products = []
    pro.data.map(async(item)=>{
      try{
        products.push(await fetchproduct(item));
      }
      catch(error)
      {
        console.log(error);
      }
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
        <div className='box f_flex' onClick={()=>{changeProduct(-1)}}>
              <img src="./images/category/cat-1.png" alt='' />
              <span>All</span>
            </div>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index} onClick={()=>{changeProduct(index)}}>
              <img src="./images/category/cat-1.png" alt='' />
              <span>{value.name}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Catg
