"use client"
import { Flex, Grid, Image } from "@chakra-ui/react";
import useCustomTheme from "@/hooks/useTheme";
import SideBar from "./sidebar";
import Navbar from "./navbar";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import BottomBar from "./bottomBar";
import { useImage } from "@/helpers/store/useImagePicker";
import useSearchStore from "@/helpers/store/useSearchData";
import { useColorMode } from "../ui/color-mode";
import useNotificationHook from "@/hooks/useNotificationHook";

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
        }
    }, [theme]);  

    useEffect(() => {
        setImage([])
        setSearchValue("")
    }, [pathname])
    const { count } = useNotificationHook()
    const { colorMode } = useColorMode();

    return (
        <Flex w={"100vw"} h={"100vh"} color={headerTextColor} bgColor={mainBackgroundColor} >
            {!frame && (
                <SideBar count={count} />
            )}
            <Flex w={"full"} height={"100vh"} pos={"relative"} flexDirection={"column"} >
                {!frame && (
                    <Flex w={"full"} display={["flex", "flex", (!pathname?.includes("create") && !pathname?.includes("details")) ? "flex" : "none"]} pos={"relative"} zIndex={"10"} >
                        <Navbar />
                    </Flex>
                )}
                <Flex w={"full"} pos={"relative"} h={"full"} >
                    <Flex w={"full"} pos={"absolute"} zIndex={"10"} overflowY={"auto"} bottom={frame ? "0px" : ["0px", "0px", "0px", "0px", "0px"]} top={frame ? "0px" : ["76px", "76px", "76px", "0px", "0px"]}  insetX={"0px"} >
                        {children}
                    </Flex> 
                    <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} bgColor={colorMode !== "dark" ? "transparent" : "#000"} opacity={colorMode !== "dark" ? "100%" : "15%"} pos={"absolute"} inset={"0px"} w={"full"} h={"full"} overflow={"hidden"} >
                        <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                        <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                        <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                        <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                        <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                        <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                        <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                        <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                        <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                        <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                        <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                        <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                    </Grid>
                </Flex>
                {!frame && (
                    <Flex w={"full"} bottom={"0px"}  >
                        <BottomBar count={count} />
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}