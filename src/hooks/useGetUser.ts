
import { IUser } from "@/helpers/models/user";
import httpService from "@/helpers/services/httpService";
import { URLS } from "@/helpers/services/urls";
import { useDetails } from "@/helpers/store/useUserDetails";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";

const useGetUser = () => {


    const [user, setUser] = React.useState<IUser | null>(null);
    const { setAll, email } = useDetails((state) => state);

    const { mutate: fetchData, isPending: isLoading } = useMutation({
        mutationKey: ['userInfo'],
        mutationFn: () =>
            httpService.get(`${URLS.GET_USER_PRIVATE_PROFILE}`),
        onSuccess: (data: any) => {

            setUser(data.data);

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
    });

    useEffect(() => {
        if (!email) {
            fetchData();
        }
    }, [email])

    useEffect(() => {
        setAll({
            user: user,
            userId: user?.userId,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            dob: user?.dob,
            username: user?.username,
        });
    }, [user])

    return {
        user,
        isLoading
    };
}

export default useGetUser