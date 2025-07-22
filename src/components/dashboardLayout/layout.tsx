"use client"
import { Flex } from "@chakra-ui/react";
import useCustomTheme from "@/hooks/useTheme";
import SideBar from "./sidebar";
import Navbar from "./navbar";
import { usePathname } from "next/navigation"; 

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
            <SideBar />
            <Flex w={"full"} height={"100vh"} pos={"relative"} flexDirection={"column"} >
                {(!pathname?.includes("create") && !pathname?.includes("details")) && (
                    <Navbar />
                )}
                <Flex w={"full"} pos={"relative"} h={"full"} >
                    <Flex w={"full"} flex={"1"} pos={"absolute"} bgColor={mainBackgroundColor} overflowY={"auto"} inset={"0px"} >
                        {children}
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}