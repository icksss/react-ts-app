import defaultAxios from "axios";
import { useEffect } from "react";
import { useState } from "react";



const useAxios = (options:any, axiosInstance = defaultAxios) => {
    const [state, setState] = useState<any>({
        loading: true,
        error: null,
        data: null
    });
    
    const [trigger, setTrigger] = useState(0);
    
    if (!options.url) {
        return;
    }
    useEffect(() => {
        axiosInstance(options)
            .then((data) => {
                setState({
                    ...state,
                    loading: false,
                    data: data
                });
            })
            .catch((error) => {
                setState({
                    ...state,
                    loading: false,
                    error: error
                });
            });
    }, [trigger]);

    const refetch = () => {
        setState({
            ...state,
            loading: true
        });
        setTrigger(trigger + 1);
    };
    return { ...state, refetch };
};

export default useAxios;
