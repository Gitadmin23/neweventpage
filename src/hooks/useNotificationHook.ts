import httpService from "@/helpers/services/httpService";
import { URLS } from "@/helpers/services/urls";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";



const useNotificationHook = () => {

    const [count, setCount] = useState(""); 

    const { mutate: fetchData, isPending: isLoading } = useMutation({
        mutationKey: ['getNotifications'],
        mutationFn: () =>
            httpService.get(`${URLS.GET_NOTIFICATIONS}`, {
                params: {
                    page: 0,
                    size: 50
                }
            }),
        onSuccess: (data: any) => {
            const unrread = data.data.content.filter((item: any) => item.status === 'UNREAD');
            setCount(unrread.length + "")
        },
    });

    useEffect(() => {
        fetchData();
    }, [])


    return {
        isLoading,
        count,
    };
}

export default useNotificationHook