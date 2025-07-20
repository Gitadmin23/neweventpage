"use client"
import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import useCustomTheme from "@/hooks/useTheme";
import { textLimit } from '@/helpers/utils/textlimit'
import { capitalizeFLetter } from '@/helpers/utils/capitalLetter'
import JoinOrLeaveCommunityBtn from './joinandLeaveBtn';
import { ICommunity } from '@/helpers/models/community';
import ProductImageScroller from './productImageScroller';

interface Props {
    data: ICommunity,
    searchbar?: boolean,
    profile?: boolean,
    create?: boolean
}

function CommunityCard(props: Props) {
    const {
        data,
        searchbar,
        profile,
        create
    } = props

    const {
        bodyTextColor,
        mainBackgroundColor,
        primaryColor
    } = useCustomTheme();
    // const { colorMode } = useColorMode();

    const router = useRouter()

    // const { setSearchValue } = useSearchStore((state) => state);
    // const submit = () => {
    //     // setSearchValue("")
    //     router.push("/dashboard/profile/")
    // }

    return (
        <Flex width={"full"} role='button' borderBottomWidth={searchbar ? "1px" : "0px"} roundedBottom={"2xl"} roundedTopLeft={"2xl"} justifyContent={"space-between"} alignItems={"center"} py={"2"} gap={"2"} >
            <Flex gap={searchbar ? "3" : "3"} width={"full"}   >
                <Box width={"fit-content"} >
                    <Flex w={"50px"} >
                        <ProductImageScroller rounded='10px' objectFit="cover" images={[data?.data?.imgSrc]} height={"50px"} />
                    </Flex>
                    {/* <CommunityImage data={data} size={searchbar?  "50px" : "50px"} font={searchbar ? "16px": "30px"} /> */}
                </Box>
                <Flex maxW={"200px"} flexDir={"column"} textAlign={"left"} >
                    <Text fontSize={"13px"} lineHeight={"15px"} fontWeight={"medium"} >{textLimit(capitalizeFLetter(data?.data?.name), 20)}</Text>
                    <Text fontSize={"11px"} color={bodyTextColor} >{textLimit(data?.data?.description, 100)}</Text>
                    <Flex h={"20px"} rounded={"10px"}  bg={data?.data?.isPublic ? "#D0D4EB" : "#FBCDCD"} fontWeight={"semibold"} color={data?.data?.isPublic ? primaryColor : "#E90303"} fontSize={"9px"}  display={"flex"} justifyContent={"center"} alignItems={"center"} width={"50px"} >
                        {data?.data?.isPublic ? 'Public' : 'Private'}
                    </Flex>
                </Flex>
            </Flex>
            {(!profile && !create) && (
                <JoinOrLeaveCommunityBtn width={searchbar ? "120px" : "120px"} height={searchbar ? "30px" : "34px"} data={data} />
            )}
        </Flex>
    )
}

export default CommunityCard