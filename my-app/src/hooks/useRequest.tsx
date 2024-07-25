import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "../utils/message";


const defaultRequestConfig = {
    url: '/',
    method: 'GET',
    data: {},
    params: {},
}



function useRequest<T>(options: AxiosRequestConfig & {manual?: boolean } = defaultRequestConfig){
    const navigator = useNavigate();
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);
    const controllerRef = useRef(new AbortController());
    
    const cancle = () => {
        controllerRef.current.abort();
    }

    const request = useCallback((requestOptions: AxiosRequestConfig) => {
        setData(null);
        setError('');
        setLoaded(false);

        const tokens = localStorage.getItem('token');
        const headers = (tokens) ? {
            token : tokens,
        } : {};

        return axios.request<T>({
                url: requestOptions?.url,
                method: requestOptions?.method,
                signal: controllerRef.current.signal,
                data: requestOptions?.data,
                params: requestOptions?.params,
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
    },[navigator]);

    useEffect(()=>{
        if(!options.manual){
            request(options).catch((error)=>{
                message(error.message);
            });    
        }
    },[options, request]);

    return {data, error, loaded, request, cancle};

}
export default useRequest;