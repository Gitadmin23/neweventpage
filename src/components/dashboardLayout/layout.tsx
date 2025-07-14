"use client"
import { Flex } from "@chakra-ui/react";
import useCustomTheme from "@/hooks/useTheme";
import SideBar from "./sidebar";
import Navbar from "./navbar";

interface IProps {
    children: React.ReactNode
}

export default function DashboardLayout(
    {
        children
    }: IProps
) {

    const { mainBackgroundColor, headerTextColor } = useCustomTheme()

    return (
        <Flex w={"100vw"} h={"100vh"} color={headerTextColor} bgColor={mainBackgroundColor} >
            <SideBar />
            <Flex w={"full"} height={"100vh"} pos={"relative"} flexDirection={"column"} >
                <Navbar />
                <Flex w={"full"} flex={"1"} pos={"absolute"} inset={"0px"} top={"76px"} >
                    {children}
                </Flex>
            </Flex>
        </Flex>
    )
}