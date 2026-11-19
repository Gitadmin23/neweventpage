"use client"
import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import Cookies from "js-cookie" 
import useCustomTheme from "@/hooks/useTheme";
import { useRouter, useSearchParams } from "next/navigation";
import { useColorMode } from "../ui/color-mode";


export default function LogInSpinner() {

    const query = useSearchParams();
    const token = query?.get('token');  
    const eventId = query?.get('eventId');
    const create = query?.get('create');
    const theme: any = query?.get('theme');

    const router = useRouter()
    const { primaryColor, mainBackgroundColor, bodyTextColor } = useCustomTheme()
    const { setColorMode } = useColorMode()

    useEffect(() => {
        if (theme) {
            setColorMode(theme)
        }
    }, [theme, setColorMode])

    useEffect(() => {
        if (typeof token === "string") {
            // Store token in cookie
            Cookies.set("chase_token", token, {
                path: "/",
                secure: true,
                sameSite: "Lax",
            });
        }

        const themeQuery = theme ? `?theme=${theme}` : "";

        const timer = setTimeout(() => {
            if (eventId && eventId !== null && eventId !== "null") {
                router.replace(`/product/details/events/${eventId}${themeQuery}`)
            } else if (create === "event") {
                router.replace(`/product/create/events${themeQuery}`)
            } else if (create === "fundraiser") {
                router.replace(`/product/create/fundraising${themeQuery}`)
            } else {
                router.replace(`/product/events${themeQuery}`)
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [token, eventId, create, theme, router]);

    return (
        <Flex w={"full"} h={"full"} bgColor={mainBackgroundColor} justifyContent={"center"} alignItems={"center"} flexDir={"column"} gap={"3"} >
            <Box position={"relative"} w={"76px"} h={"76px"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
                <Spinner
                    size={"xl"}
                    color={primaryColor}
                    borderWidth={"3px"}
                    w={"76px"}
                    h={"76px"}
                    position={"absolute"}
                />
                <Image alt='logo' src='/images/logo.png' w={"40px"} h={"40px"} objectFit={"contain"} />
            </Box>
            <Text fontSize={"sm"} fontWeight={"500"} color={bodyTextColor} letterSpacing={"0.5px"} >
                Loading...
            </Text>
        </Flex>
    )
}