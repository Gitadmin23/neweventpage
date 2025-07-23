import { fetchSecureData, fetchUnsecureData } from "@/helpers/services/api";
import { useQuery } from "@tanstack/react-query"; 

export const useFetchData = <T>({endpoint, params, id, queryKey = [], name}:{endpoint: string, name?: string, params?: any, id?: any, queryKey?: any }) => {
    
    const arr = [...queryKey]
    
    return useQuery({
        queryKey: [ name, endpoint, id, ...arr ],
        queryFn: () => fetchSecureData<T>(endpoint, params),
    })
};

export const useUnsecureFetchData = <T>(endpoint: string, name: string) => {
    return useQuery({
        queryKey: [name, endpoint],
        queryFn: () => fetchUnsecureData<T>(endpoint),
    })
};
