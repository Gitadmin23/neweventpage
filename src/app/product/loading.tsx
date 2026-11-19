"use client"
import useCustomTheme from "@/hooks/useTheme";
import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";

export default function ProductLoading() {
    const { primaryColor, mainBackgroundColor, bodyTextColor } = useCustomTheme();

    return (
        <Flex
            w={"full"}
            h={"full"}
            minH={"70vh"}
            bgColor={mainBackgroundColor}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            gap={"3"}
        >
            <Box position={"relative"} w={"72px"} h={"72px"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
                <Spinner
                    size={"xl"}
                    color={primaryColor}
                    borderWidth={"3px"}
                    w={"72px"}
                    h={"72px"}
                    position={"absolute"}
                />
                <Image alt="logo" src="/images/logo.png" w={"38px"} h={"38px"} objectFit={"contain"} />
            </Box>
            <Text fontSize={"sm"} fontWeight={"500"} color={bodyTextColor} letterSpacing={"0.5px"} >
                Loading...
            </Text>
        </Flex>
    );
}
