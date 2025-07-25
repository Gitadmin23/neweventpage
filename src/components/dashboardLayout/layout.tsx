"use client"
import { Flex } from "@chakra-ui/react";
import useCustomTheme from "@/hooks/useTheme";
import SideBar from "./sidebar";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import BottomBar from "./bottomBar";

interface IProps {
    children: React.ReactNode
}

export default function DashboardLayout(
    {
        children
    }: IProps
) {

    const { mainBackgroundColor, headerTextColor } = useCustomTheme()
    const pathname = usePathname()

    return (
        <Flex w={"100vw"} h={"100vh"} color={headerTextColor} bgColor={mainBackgroundColor} >
            <Suspense>
                <SideBar />
            </Suspense>
            <Flex w={"full"} height={"100vh"} pos={"relative"} flexDirection={"column"} >  
                <Flex w={"full"} display={["flex", "flex", (!pathname?.includes("create") && !pathname?.includes("details")) ? "none" : "flex"]} >
                    {(!pathname?.includes("create") && !pathname?.includes("details")) && (
                        <Navbar />
                    )} 
                </Flex>
                <Flex w={"full"} pos={"relative"} h={"full"} >
                    <Flex w={"full"} pos={"absolute"} bgColor={mainBackgroundColor} overflowY={"auto"} bottom={["70px", "70px", "70px", "0px", "0px"]} top={["76px", "76px", "76px", "0px", "0px"]} inset={"0px"} >
                        {children}
                    </Flex>
                </Flex>
                <Flex w={"full"} h={"fit-content"} > 
                    <BottomBar />
                </Flex>
            </Flex>
        </Flex>
    )
}