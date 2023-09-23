import {  useState } from "react"
import useFetch from "../components/hooks/useFetch";

const ProductList = () => {
    

  
    const [url,setUrl] = useState("http://localhost:8000/products");
   //const [counter, setCounter] = useEffect(0)
     const {data : products, loading,error} = useFetch(url)


 
/**方法一 直接用fetch  。then这种结构来输出这个url
   其实可以直接将fetch这个过程变成一个函数 或者说是方法
 *  useEffect(()=>{
    fetch(url)
    .then(Response=>Response.json())
    .then(data=>setProdcuts(data))
   },[url]) 
      方法二：这里的话 具有通用性  将这个过程封装成方法 可以其他地方也存在二次使用的可能性
   async await  这是异步的函数   就是async来声明异步函数  await的意义就是一个发生了另一个才发生 所以
   这里的逻辑是首先调用 fetch（）函数 函数执行后  将 response对象里面的json方法的结果 传给data对象
   最后将data里面的新数据用set方法传过去
    useEffect(()=>{
    const fetchProducts = async () => {
       const response = await fetch(url);
       const data = await response.json();
       setProdcuts(data);
          }
         fetchProducts(); 
   },[url])

   方法三: 这里是利用 useCallback函数 缓存的是整个函数 相当于是从useCallback里面出来的东西是一个唯一的东西 虽然两个都是异步函数但是缺按顺序发生
 const fetchProducts = useCallback( async () => {
  const response = await fetch(url);
  const data = await response.json();
  setProdcuts(data)},[url])
     

 useEffect(()=>{
    
         fetchProducts(); 
   },[fetchProducts])


  方法四：将这个功能封装成一个hook function 

export default function useFetch(url) {
    const [data,setData] = useState(null);
//用useState 来管理 state
    useEffect(()=>{
        const fetchData = async ()=>  {
            const response = await fetch(url);
           const result = await response.json();
             setData(result);
        }
        //用fetchData 函数来完成拿到data这个功能
        fetchData();
        //执行并拿到结果
    },[url])
//当url改变的时候执行
// return {data} 当执行时返回这个data 这个data其实就是这个url
  return {data}
}



*/
   // },[url])  因为依赖的存在 如果依赖关系不对 就只执行一次 那么就不会执行第二个 setUrl

  /**useEffect(()=>{
    console.log(counter)
   },[counter]) 
   *  
   <button onClick={()=>setCounter(counter+1)}>{counter}</button>
   */ 

/**
 *   useEffect(()=>{
    console.log(counter)
   },[counter]) 
   这里用useEffect是因为 如果我把counter 加到依赖里面 就会再多渲染一次 用不同的useEffect来管理不同的依赖 来避免重复 

 */
  return (
    <section>
      <div className="filter">
        {loading && <p>is loading</p> }
        { error && <p> {error}</p> }
      
      <button onClick={()=>setUrl("http://localhost:8000/products")}>All</button>
      <button onClick={()=>setUrl("http://localhost:8000/products?in_stock=true")}>In Stock</button></div>
      {products && products.map((product)=>(
        <div className="card" key={product.id}>
          <p className="id">{product.id}</p>
          <p className="name"> 
              {product.name}
            </p>
          <p  className="info"> 
            <span > ${product.price} </span>
            <span className={product.in_stock ? 'instock' : 'unavailable'}> {product.in_stock? 'yes' : 'no'}</span></p>
        </div>
      ))}
    </section>
    
  )
}

export default ProductList