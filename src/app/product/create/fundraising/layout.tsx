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


    const { colorMode } = useColorMode();

    const {
        mainBackgroundColor,
        secondaryBackgroundColor
    } = useCustomTheme()

    return (
        <Flex width={"full"} pt={"74px"} h={["100vh", "100vh", "100vh", "100vh", "100vh"]} display={["flex"]} flexDir={["column", "column", "column", "row"]}  >
            <FundraisingHeader />
            <Flex  borderWidth={"1px"} w={"full"} p={["0px", "0px", "0px", "3"]} h={"full"}  >
                <Flex rounded={["0px", "0px", "0px", "2xl"]} w={"full"} h={"auto"} overflowY={"auto"} >
                    <Box  rounded={["0px", "0px", "0px", "2xl"]} w={"full"} px={"3"} h={"fit-content"} >
                        {children}
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    )
}