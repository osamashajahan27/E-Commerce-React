import { useEffect, useState } from "react";
import axios from 'axios'

function useFetch(url){
    let [products, setProducts] = useState([]);
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(true);

    useEffect(()=>{
       async function fetchingData(){
                try{

                    let response= await axios.get(url)
                    setProducts(response.data);
                    
                    // let fetchdata= await fetch(url)
                    // if(fetchdata.ok){
                    //     let ojectType = await fetchdata.json()
                    //     setProducts(ojectType)
                    // }else{
                    //     throw new Error(" Data Not Found ")
                    // }

                }catch(error){
                    setError(error.message)
                }
                finally{
                    setLoading(false)
                }
        }
         fetchingData()
        },[])
        return {products,loading,error, setProducts}
}
export default useFetch