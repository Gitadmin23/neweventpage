"use client"
import { Flex } from "@chakra-ui/react";
// import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie" 
import useCustomTheme from "@/hooks/useTheme";
import { MutatingDots } from 'react-loader-spinner'
import { useRouter, useSearchParams } from "next/navigation";


export default function LogInSpinner() {


    const query = useSearchParams();
    const token = query?.get('token');  
    const eventId = query?.get('eventId');

    const router = useRouter()
    const { primaryColor, } = useCustomTheme()

    useEffect(() => {
        if (typeof token === "string") {
            // Store token in cookie
            Cookies.set("chase_token", token, {
                path: "/",
                secure: true,
                sameSite: "Lax",
            });

            const timer = setTimeout(() => {
                if(eventId && eventId !== null) {
                    router.replace(`/product/details/events/${eventId}`)
                } else {
                    router.replace("/product/events")
                }
            }, 2000);

            return () => clearTimeout(timer); 

        }
    }, [token]);

    return (
        <Flex w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} >
            <Flex w={"full"} h={"40vh"} justifyContent={"center"} alignItems={"center"} > 
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