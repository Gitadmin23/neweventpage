"use client"
import { Flex } from "@chakra-ui/react";
import useCustomTheme from "@/hooks/useTheme";
import SideBar from "./sidebar";
import Navbar from "./navbar";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import BottomBar from "./bottomBar";
import { useImage } from "@/helpers/store/useImagePicker";
import useSearchStore from "@/helpers/store/useSearchData";
import { useColorMode } from "../ui/color-mode";

interface IProps {
    children: React.ReactNode
}

export default function DashboardLayout(
    {
        children
    }: IProps
) {

    const { mainBackgroundColor, headerTextColor } = useCustomTheme()

    const { setSearchValue } = useSearchStore((state)=> state)
    const pathname = usePathname()
    const query = useSearchParams();
    const frame = query?.get('frame'); 
    const theme : any = query?.get('theme'); 

    const { setImage } = useImage((state: any) => state)

    const { setColorMode } = useColorMode();  
   
    useEffect(() => { 
        if(theme) {
            setColorMode(theme) 
        } else {
            setColorMode("light") 
        }
    }, [theme]);  

    useEffect(() => {
        setImage([])
        setSearchValue("")
    }, [pathname])

    return (
        <Flex w={"100vw"} h={"100vh"} color={headerTextColor} bgColor={mainBackgroundColor} >
            {!frame && (
                <SideBar />
            )}
            <Flex w={"full"} height={"100vh"} pos={"relative"} flexDirection={"column"} >
                {!frame && (
                    <Flex w={"full"} display={["flex", "flex", (!pathname?.includes("create") && !pathname?.includes("details")) ? "flex" : "none"]} >
                        <Navbar />
                    </Flex>
                )}
                <Flex w={"full"} pos={"relative"} h={"full"} >
                    <Flex w={"full"} pos={"absolute"} bgColor={mainBackgroundColor} overflowY={"auto"} bottom={["0px", "0px"]} top={["0px", "0px"]} inset={"0px"} >
                        {children}
                    </Flex>
                </Flex>
                {!frame && (
                    <Flex w={"full"} h={"fit-content"} >
                        <BottomBar />
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}