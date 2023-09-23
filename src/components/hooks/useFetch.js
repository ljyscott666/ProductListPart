import { useEffect, useState } from "react"


export default function useFetch(url) {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
//用useState 来管理 state
    useEffect(()=>{ 
        const controller = new AbortController();
        //1 声明这个controller变量

        const fetchData = async ()=>  {
           
            setLoading(true)
            try { const response = await fetch(url,{signal:controller.signal});
            //2 {signal:controller.signal} 传入这个AbortController（）方法
                if(!response.ok) {
                    throw new Error(response.statusText);
                    //如果这边的response.ok 不是默认值 那么就把这个丢到 catch函数里面去
                }
                    const result = await response.json();
                    setLoading(false);
                    setData(result);
            }
                catch (error){
                console.log(error.message);
                setError(error.message)
                setLoading(false);
             }
           //try catch 是错误捕获机制  如果正确执行就显示try的结果 如果无法执行就显示catch 的结果 这里的catch 的结果是错误的信息
        }
        //用fetchData 函数来完成拿到data这个功能
        fetchData();
        //执行并拿到结果
        return    () => controller.abort(); //3 在挂载的阶段执行这个abort方法  这个三步就可以中止fetch过程了   之前用axios来做增删改查 其实是同理的
        
       
    },[url])
//当url改变的时候执行
// return {data} 当执行时返回这个data 这个data其实就是这个url
  return {data, loading, error}
}
