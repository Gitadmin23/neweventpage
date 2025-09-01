"use client"
import { fetchSecureData, fetchUnsecureData } from "@/helpers/services/api";
import { useQuery } from "@tanstack/react-query"; 

export const useFetchData = <T>({endpoint, params, id, queryKey = [], name, enable = true}:{endpoint: string, name?: string, params?: any, id?: any, queryKey?: any, enable?: boolean }) => {
    
    const arr = [...queryKey]
    
    return useQuery({
        queryKey: [ name, endpoint, id, ...arr ],
        queryFn: () => fetchSecureData<T>(endpoint, params),
        enabled: enable
    })
};

export const useUnsecureFetchData = <T>(endpoint: string, name: string) => {
    return useQuery({
        queryKey: [name, endpoint],
        queryFn: () => fetchUnsecureData<T>(endpoint),
    })
};
