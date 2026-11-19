"use client"
import useCustomTheme from "@/hooks/useTheme";
import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";

export default function Loading() {
    const { primaryColor, mainBackgroundColor, bodyTextColor } = useCustomTheme();

    return (
        <Flex
            w={"100vw"}
            h={"100vh"}
            bgColor={mainBackgroundColor}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            gap={"3"}
        >
            <Box position={"relative"} w={"76px"} h={"76px"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
                <Spinner
                    size={"xl"}
                    color={primaryColor}
                    borderWidth={"3px"}
                    w={"76px"}
                    h={"76px"}
                    position={"absolute"}
                />
                <Image alt="logo" src="/images/logo.png" w={"40px"} h={"40px"} objectFit={"contain"} />
            </Box>
            <Text fontSize={"sm"} fontWeight={"500"} color={bodyTextColor} letterSpacing={"0.5px"} >
                Loading...
            </Text>
        </Flex>
    );
}
