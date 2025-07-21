import { fetchSecureData, fetchUnsecureData } from "@/helpers/services/api";
import { useQuery } from "@tanstack/react-query"; 

export const useFetchData = <T>({endpoint, name, params, id }:{endpoint: string, name: string, params?: any, id?: any}) => {
    return useQuery({
        queryKey: [name, endpoint, id],
        queryFn: () => fetchSecureData<T>(endpoint, params),
    })
};

export const useUnsecureFetchData = <T>(endpoint: string, name: string) => {
    return useQuery({
        queryKey: [name, endpoint],
        queryFn: () => fetchUnsecureData<T>(endpoint),
    })
};
