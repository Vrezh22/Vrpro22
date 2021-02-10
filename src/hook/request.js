import { useState } from 'react';


const useRequest = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const request = async (url ,config) => {
            try {
                setLoading(true);
                const response = await fetch(url, config);
                const data = await response.json();
                setLoading(false);
                return data;
            } catch (error) {
                setLoading(false);
                setError(error);
            }
       
    }
    const clearError = () => setError(null);
    
    return { loading, error, request, clearError };
}

export default useRequest;