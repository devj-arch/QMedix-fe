import axios from "axios";

const api=async(method,url,data=null)=>{
try {
    const res=await axios({
        method,
        url:`${import.meta.env.VITE_BACKEND_URL}/${url}`,
        data
    });
    return res;
    
} catch (error) {
    throw error;
}
}
export default api;
