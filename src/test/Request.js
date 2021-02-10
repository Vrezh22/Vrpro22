import React, { useState, useEffect } from 'react';
import useRequest from '../hook/request';

const Request = () => {
    const [data, setData] = useState({});
    const { loading, error, request, clearError } = useRequest();
    useEffect(() => {
        (async () => {
            const data = await request('https://jsonplaceholder.typicode.com/posts/1', {
                method: 'GET'
            });
            setData(data);
        })();
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) {
        clearError();
        return <p>Error</p>
    }
    return (
        <div>
            <h1>Resuest</h1>
            <div>
                <p>{data.body}</p>
            </div>
        </div>
    )
}

export default Request;