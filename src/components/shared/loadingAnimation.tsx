"use client"
import useCustomTheme from '@/hooks/useTheme';
import { Box, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import { ThreeDots } from 'react-loader-spinner';

interface Props {
    loading: any,
    refeching?: any,
    children: React.ReactNode,
    length?: any,
    fix_height?: boolean,
    color?: string,
    customLoader?: React.ReactNode,
    withimg?: boolean,
    width?: string;
    bgColor?: string
}

function LoadingAnimation(props: Props) {

    const {
        children,
        loading,
        length,
        refeching,
        fix_height,
        customLoader,
        width,
        bgColor
    } = props

    const {
        secondaryBackgroundColor,
        mainBackgroundColor,
        bodyTextColor,
        primaryColor
    } = useCustomTheme();

    return (
        <Flex flexDir={"column"} w={"full"} h={fix_height ? "full" : "fit-content"} >
            {(!loading) && (
                <Flex w={"full"} h={"full"} flexDir={"column"} >
                    {children}
                    {(refeching) && (
                        <Flex w={width ? width : "full"} minW={"100px"} bg={secondaryBackgroundColor} height={"50px"} >
                            <Flex width={"full"} justifyContent={"center"} alignItems={"center"} height={"full"} fontSize={"20px"}  >
                                <ThreeDots
                                    visible={true}
                                    height="40"
                                    width="40"
                                    color={primaryColor}
                                    radius="9"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            </Flex>
                        </Flex>
                    )}
                </Flex>
            )}

            {(!loading && !refeching) && (
                <>
                    {(length === 0) && (
                        <Flex width={"full"} flexDir={"column"} bg={mainBackgroundColor} alignItems={"center"} py={"4"}  >
                            <Image src={"/images/folder.png"} alt="folder" width={"350px"} />
                            <Text>{`You don't have any record yet`}</Text>
                        </Flex>
                    )}
                </>
            )}
            {(loading) && (
                <Flex w={"full"} height={fix_height ? "full" : "auto"} minH={fix_height ? "60vh" : "240px"} >
                    {!customLoader && (
                        <Flex
                            width={"full"}
                            bg={bgColor ?? "transparent"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            flexDir={"column"}
                            gap={"3"}
                            height={fix_height ? "full" : "auto"}
                            minH={fix_height ? "60vh" : "240px"}
                            py={"10"}
                        >
                            <Box position={"relative"} w={"68px"} h={"68px"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
                                <Spinner
                                    size={"xl"}
                                    color={primaryColor}
                                    borderWidth={"3px"}
                                    w={"68px"}
                                    h={"68px"}
                                    position={"absolute"}
                                />
                                <Image alt='logo' src='/images/logo.png' w={"36px"} h={"36px"} objectFit={"contain"} />
                            </Box>
                            <Text fontSize={"xs"} fontWeight={"500"} color={bodyTextColor} letterSpacing={"0.5px"} >
                                Loading...
                            </Text>
                        </Flex>
                    )}
                    {customLoader}
                </Flex>
            )}
        </Flex>
    )
}

export default LoadingAnimation
