"use client"
import useCustomTheme from "@/hooks/useTheme";
import { Flex } from "@chakra-ui/react";

export default function Sidebar () {

    const { 
        secondaryBackgroundColor
    } = useCustomTheme()

    return(
        <Flex bgColor={secondaryBackgroundColor} flexDir={"column"} w={"344px"}  >
            <Flex w={"full"} >

            </Flex>
        </Flex>
    )
}