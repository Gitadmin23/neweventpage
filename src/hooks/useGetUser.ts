 
import httpService from "@/helpers/services/httpService";
import { URLS } from "@/helpers/services/urls";
import { useDetails } from "@/helpers/store/useUserDetails";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useGetUser = () => {
 
    // const [user, setUser] = React.useState<IUser | null>(null);
    const { setAll, email, user } = useDetails((state) => state);
    const [show, setShow] = useState(false)

    const { mutate: fetchData, isPending: isLoading } = useMutation({
        mutationKey: ['userInfo'],
        mutationFn: () =>
            httpService.get(`${URLS.GET_USER_PRIVATE_PROFILE}`),
        onSuccess: (data: any) => {

            // setUser(data.data);

            setAll({
                user: data?.data,
                userId: data?.data?.userId,
                firstName: data?.data?.firstName,
                lastName: data?.data?.lastName,
                email: data?.data?.email,
                dob: data?.data?.dob,
                username: data?.data?.username,
            });
        }, 
        onError: () => {
            setShow(true)
        }
    });

    useEffect(() => {
        if (!email) {
            fetchData();
        }
    }, [email]) 

    return {
        user,
        isLoading,
        show
    };
}

export default useGetUser