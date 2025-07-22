"use client"
import { Flex } from "@chakra-ui/react";
import useCustomTheme from "@/hooks/useTheme";
import SideBar from "./sidebar";
import Navbar from "./navbar";
import { useParams, usePathname } from "next/navigation";
import usePaystackStore from "@/helpers/store/usePaystack";
import { Fundpaystack } from "../shared";

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
    const param = useParams();

    const id = param?.slug ?? param?.id;
    const { configPaystack, setPaystackConfig, message, amount, setAmount } = usePaystackStore((state) => state);

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

            <Fundpaystack id={id} config={configPaystack} setConfig={setPaystackConfig} amount={amount} setAmount={setAmount} message={message} />
        </Flex>
    )
}