import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface UseApiResponse {
    data: any | null;
    setData: any;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

const useApi = (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body: any = null
): UseApiResponse => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {

            const config: AxiosRequestConfig = {
                method,
                url,
                ...(body && { data: body }),
            };

            const response = await axios(config);
            setData(response.data);
        } catch (err: any) {

            setError(err.message);
        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, method, body]);

    return { data, setData, loading, error, refetch: fetchData };
}

export default useApi;
