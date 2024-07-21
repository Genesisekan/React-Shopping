import axios, { AxiosRequestConfig, Method } from "axios";
import { useRef, useState } from "react";


function useRequest<T>(url: string, method: Method, payload: AxiosRequestConfig){
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);
    const controllerRef = useRef(new AbortController());
    
    const cancle = () => {
        controllerRef.current.abort();
    }

    const request = () => {
        setData(null);
        setError('');
        setLoaded(false);

        return axios.request<T>({
                url,
                method,
                data: payload
            }).then(response => {
                setData(response.data);
                return response.data;
            }).catch((e: any) =>{
                setError(e.message || 'unknown request error.');
                throw new Error(e);
            }).finally(()=>{
                setLoaded(true);
            });
    }

    return {data, error, loaded, request, cancle};

}
export default useRequest;