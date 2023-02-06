import { useState } from "react";
import axios from "axios";

const useUpdateOrders = () =>{

const [orders, setOrders] = useState([])


const fetchOrders = async () => {
    try{
        const res = await axios(process.env.RUTA_BACK+"/orders");
        setOrders(res.data)
        return orders;
    }catch(error){
        return error.message
    }
}

return {
    orders,
    fetchOrders,
}
}

export default useUpdateOrders;