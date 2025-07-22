"use client"
import { Flex } from "@chakra-ui/react";
// import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie" 
import useCustomTheme from "@/hooks/useTheme";
import { MutatingDots } from 'react-loader-spinner'


export default function LogInSpinner() {


    // const query = useSearchParams();
    // const token = query?.get('token');

    // const router = useRouter()
    const { primaryColor, } = useCustomTheme()

    // useEffect(() => {
    //     if (typeof token === "string") {
    //         // Store token in cookie
    //         Cookies.set("chase_token", token, {
    //             path: "/",
    //             secure: true,
    //             sameSite: "Lax",
    //         });

    //         const timer = setTimeout(() => {
    //             router.replace("/product/events")
    //         }, 2000);

    //         return () => clearTimeout(timer);

    //         // Optional: remove token from URL
    //         // window.history.replaceState(null, "/", window.location.pathname);

    //     }
    // }, [token]);

    return (
        <Flex w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} >
            <Flex w={"full"} h={"40vh"} justifyContent={"center"} alignItems={"center"} >
                {/* <Spinner size={"lg"} color={primaryColor} /> */}
                <MutatingDots
                    visible={true}
                    height="100"
                    width="100"
                    color={primaryColor}
                    secondaryColor={primaryColor}
                    radius="12.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </Flex>
        </Flex>
    )
}