import useCustomTheme from '@/hooks/useTheme';
import { Flex, Image, Spinner, Text } from '@chakra-ui/react' 
import React from 'react'

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
        color,
        customLoader,
        withimg,
        width,
        bgColor
    } = props

    const {
        secondaryBackgroundColor,
        mainBackgroundColor
    } = useCustomTheme(); 

    return (
        <>
            {!loading && (
                <>
                    {children}
                    {(!loading && refeching) && (
                        <Flex w={width ? width : "full"} minW={"100px"} bg={secondaryBackgroundColor} height={"auto"} >
                            {/* {!customLoader && ( */}
                            <Flex width={"full"} justifyContent={"center"} height={fix_height ? "full" : "auto"} fontSize={"20px"} py={fix_height ? "" : "8"}  >
                                <Spinner size={["md", "sm"]} color={color ? color : 'black'} />
                            </Flex> 
                        </Flex>
                    )}
                </>
            )}

            {(!loading && !refeching) && (
                <>
                    {(length === 0 && !withimg) && (
                        <Flex width={"full"} bg={secondaryBackgroundColor} justifyContent={"center"} fontSize={"20px"} py={"4"}  >
                            <Text>No Records Found</Text>
                        </Flex>
                    )}
                    {(length === 0 && withimg) && (
                        <Flex width={"full"} flexDir={"column"} bg={mainBackgroundColor} alignItems={"center"} py={"4"}  >
                            <Image src={"/images/folder.png"} alt="folder" width={"350px"} />
                            <Text>{`You don't have any record yet`}</Text>
                        </Flex>
                    )}
                </>
            )}
            {loading && (
                <Flex w={"full"} height={"auto"} >
                    {!customLoader && (
                        <Flex width={"full"} bg={secondaryBackgroundColor} justifyContent={"center"} height={fix_height ? "full" : "auto"} fontSize={"20px"} py={fix_height ? "" : "8"}  >
                            <Spinner size={["md", "sm"]} color={color ? color : 'black'} />
                        </Flex>
                    )}
                    {customLoader}
                </Flex>
            )}
        </>
    )
}

export default LoadingAnimation
