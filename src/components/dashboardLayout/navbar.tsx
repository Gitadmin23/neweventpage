"use client"
import useCustomTheme from "@/hooks/useTheme";
import { FundraisingIcon } from "@/svg";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DashboardMenuBtn from "./dashboardMenuBtn";
import { useColorMode } from "../ui/color-mode";
import { useEffect } from "react";

export default function Navbar() {

    const { mainBackgroundColor, borderColor, headerTextColor, primaryColor } = useCustomTheme()
    const router = useRouter()
    const pathname = usePathname()
    const query = useSearchParams();
    const theme = query?.get('theme');

    const { setColorMode } = useColorMode(); 

    const newtheme = localStorage.getItem("theme") as string

    useEffect(() => {
        if (newtheme !== theme) {
            setColorMode(newtheme === "light" ? "dark" : "light")
            const url = new URL(window.location.href); 
            url.searchParams.delete("theme");
            window.history.replaceState(null, "", url.toString());
        }
    }, [theme]);

    return (
        <Flex color={headerTextColor} w={"full"} h={"76px"} pos={['sticky', 'sticky', 'sticky', "sticky", "sticky"]} bgColor={mainBackgroundColor} zIndex={"10"} insetX={"0px"} top={"0px"} borderBottomColor={borderColor} borderBottomWidth={"1px"} alignItems={"center"} px={"6"} justifyContent={"space-between"}  >
            {pathname?.includes("event") && (
                <Text display={["none", "none", "none", "flex", "flex"]} fontSize={"24px"} fontWeight={"700"} >Chasescroll  <span style={{ color: primaryColor, marginLeft: "2px" }} >Versax</span></Text>
            )}
            <Flex alignItems={"center"} gap={"2"} >
                <Flex as={"button"} onClick={() => router?.push("/dashboard")} display={["flex", "flex", "flex", "none", "none"]} alignItems={"center"} gap={"2"} >
                    <Image alt='logo' src='/images/logo.png' w={"35.36px"} />
                </Flex>
                {pathname?.includes("fundraising") && (
                    <Flex display={["none", "none", "flex"]} alignItems={"center"} gap="2" >
                        <FundraisingIcon />
                        <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"} >Fundraising</Text>
                    </Flex>
                )}
                {pathname?.includes("fundraising") && (
                    <Flex display={["flex", "flex", "none"]} alignItems={"center"} gap="2" >
                        <FundraisingIcon height='19' />
                        <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"} >Fundraising</Text>
                    </Flex>
                )}
            </Flex>
            <Flex display={["flex", "flex", "flex", "none", "none"]} alignItems={"center"} gap={"3"} >
                <DashboardMenuBtn />
            </Flex>
        </Flex>
    )
}