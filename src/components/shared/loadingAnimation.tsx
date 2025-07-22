"use client"
import useCustomTheme from '@/hooks/useTheme';
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { keyframes } from '@emotion/react';
import React, { useEffect, useState } from 'react'
import { Grid, MagnifyingGlass, RevolvingDot, ThreeDots } from 'react-loader-spinner';

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

    let {
        children,
        loading,
        length,
        refeching,
        fix_height,
        // color,
        customLoader,
        withimg,
        width,
        // bgColor
    } = props

    const {
        secondaryBackgroundColor,
        mainBackgroundColor,
        primaryColor
    } = useCustomTheme();

    const [isLoading, setLoading] = useState(true)
    const [dataLength, setDataLength] = useState(0)

    useEffect(() => {
        // Set a 3-second timeout
        if (!loading) {
            const timeoutId = setTimeout(() => {
                setLoading(false);
            }, 1000);
            setDataLength(length)

            // Cleanup: clear the timeout if the component unmounts or a new timer is set
            return () => clearTimeout(timeoutId);
        } else {
            setLoading(loading)
        }

    }, [loading])

    const rotate = keyframes`
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
`;

    return (
        <Flex flexDir={"column"} w={"full"} h={fix_height ? "full" : "fit-content"} >
            {(!isLoading || dataLength > 0) && (
                <Flex w={"full"} h={"full"} flexDir={"column"} >
                    {children}
                    {(isLoading && dataLength > 0) && (
                        <Flex w={width ? width : "full"} minW={"100px"} bg={secondaryBackgroundColor} height={"50px"} >
                            {/* {!customLoader && ( */}
                            <Flex width={"full"} justifyContent={"center"} height={"full"} fontSize={"20px"}  >
                                {/* <Spinner size={["md", "sm"]} color={color ? color : 'black'} /> */}
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

            {(!isLoading && !refeching) && (
                <>
                    {(dataLength === 0 && !withimg) && (
                        <Flex width={"full"} bg={secondaryBackgroundColor} justifyContent={"center"} fontSize={"20px"} py={"4"}  >
                            <Text>No Records Found</Text>
                        </Flex>
                    )}
                    {(dataLength === 0 && withimg) && (
                        <Flex width={"full"} flexDir={"column"} bg={mainBackgroundColor} alignItems={"center"} py={"4"}  >
                            <Image src={"/images/folder.png"} alt="folder" width={"350px"} />
                            <Text>{`You don't have any record yet`}</Text>
                        </Flex>
                    )}
                </>
            )}
            {(loading && !dataLength) && (
                <Flex w={"full"} height={"auto"} >
                    {!customLoader && (
                        <Flex width={"full"} bg={secondaryBackgroundColor} justifyContent={"center"} height={fix_height ? "full" : "auto"} fontSize={"20px"} py={"8"}  >
                            {/* <Spinner size={["md", "sm"]} color={color ? color : 'black'} /> */}
                            <Box
                                w={"50px"}
                                h={"50px"}
                                animation={`${rotate} 2s linear infinite`} >
                                <Image alt='logo' src='/images/logo.png' w={"50px"} />
                            </Box>
                        </Flex>
                    )}
                    {customLoader}
                </Flex>
            )}
        </Flex>
    )
}

export default LoadingAnimation
