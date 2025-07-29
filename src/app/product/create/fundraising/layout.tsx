"use client"
import { FundraisingHeader } from "@/components/createFundraisingComponents"; 
import { useColorMode } from "@/components/ui/color-mode";
import useCustomTheme from "@/hooks/useTheme";
import { Box, Flex } from "@chakra-ui/react"; 

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <Flex width={"full"} pos={"relative"} h={["auto", "auto", "auto", "100vh", "100vh"]} overflowX={"hidden"} overflowY={["auto", "auto", "auto", "hidden", "hidden"]} display={["flex"]} flexDir={["column", "column", "column", "row"]}  >
            <FundraisingHeader />
            <Flex borderWidth={["0px", "0px", "0px", "1px", "1px"]} w={"full"} p={["0px", "0px", "0px", "0px"]} h={"full"}  >
                <Flex rounded={["0px", "0px", "0px", "2xl"]} w={"full"} h={["full", "full", "full", "auto", "auto"]} overflowY={["none", "none", "none", "auto", "auto"]}  >
                    <Box  rounded={["0px", "0px", "0px", "2xl"]} w={"full"} px={"3"} h={"full"} >
                        {children}
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    )
}