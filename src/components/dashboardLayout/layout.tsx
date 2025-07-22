"use client"
import { Flex } from "@chakra-ui/react";
import useCustomTheme from "@/hooks/useTheme";
import SideBar from "./sidebar";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";
import ProductTab from "./productTab";

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
                    <Flex w={"full"} flex={"1"} pos={"absolute"} bgColor={mainBackgroundColor} overflowY={"auto"} top={["76px", "76px", "76px", "0px", "0px"]} inset={"0px"} >
                        <Flex w={"full"} px={(pathname?.includes("create") || pathname?.includes("details")) ? "0px" : ["4", "4", "6"]} pt={(pathname?.includes("create") || pathname?.includes("details")) ? "0px" : ["6", "6", "12", "12"]} pb={pathname?.includes("create") ? "0px" : "12"} flexDir={"column"} overflowY={"auto"} >
                            {(!pathname?.includes("create") && !pathname?.includes("details")) && (
                                <ProductTab />
                            )}
                            {children}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}