import axios, { AxiosRequestConfig } from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


function useRequest<T>(options: AxiosRequestConfig = {}){
    const navigator = useNavigate();
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);
    const controllerRef = useRef(new AbortController());
    
    const cancle = () => {
        controllerRef.current.abort();
    }

    const request = (requestOptions?: AxiosRequestConfig) => {
        setData(null);
        setError('');
        setLoaded(false);

        const tokens = localStorage.getItem('token');
        const headers = (tokens) ? {
            token : tokens,
        } : {};

        return axios.request<T>({
                url: requestOptions?.url || options.url,
                method: requestOptions?.method || options.method,
                signal: controllerRef.current.signal,
                data: requestOptions?.data ||  options.data,
                params: requestOptions?.params || options.params,
                headers,
            }).then(response => {
                setData(response.data);
                return response.data;
            }).catch((e: any) =>{
                if(e?.response?.status === 403) {
                    localStorage.removeItem('token');
                    navigator('/account/login');
                }
                setError(e.message || 'unknown request error.');
                throw new Error(e);
            }).finally(()=>{
                setLoaded(true);
            });
    }

    return {data, error, loaded, request, cancle};

}
export default useRequest;