import { Avatar, AvatarGroup, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { LoadingAnimation, UserImage } from '../shared';
import { formatNumberWithK } from '@/helpers/utils/formatNumberWithK';
import { IUser } from '@/helpers/models/user';
import { useQuery } from '@tanstack/react-query';
import { useFetchData } from '@/hooks/useFetchData';

interface Props {
    event: any,
    size?: any,
    border?: string,
    fontSize: number,
    refund?: boolean,
    color?: any,
    donationDetail?: boolean
}

function UsersDonation(props: Props) {
    const {
        event, 
        donationDetail
    } = props 

    const { data, isLoading } = useFetchData<any>({
        name: "donation-user", endpoint: `/payments/orders`, params: {
            typeID: event?.id,
            orderStatus: "PAID",
            size: 10,
            page: 0,
        }
    });

    console.log(data);
    



    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={donationDetail ? "full" : "fit-content"} flexDir={"column"} alignItems={"center"} >
                {donationDetail && (
                    <Flex flexDir={"column"} >
                        <Text fontWeight={"600"} fontSize={"11px"} >People who donated</Text>
                        {/* <Text fontSize={"12px"} color={bodyTextColor} >{formatNumber(data?.data?.totalElements, "")} users donated already</Text> */}
                    </Flex>
                )}

                <Flex alignItems={"center"} >
                    {data?.content?.map((item: {
                        buyer: IUser
                    }, index: number) => {
                        if (index <= 2) {
                            return (
                                <UserImage size={"xs"} user={item} />
                            )
                        }
                    })}
                    {data?.totalElements >= 3 &&
                        <Avatar.Root rounded={"full"} roundedTopRight={"0px"} variant="solid">
                            <Avatar.Fallback>{"+" + formatNumberWithK(event?.memberCount - 3)}</Avatar.Fallback>
                        </Avatar.Root>
                    }
                </Flex>
            </Flex>
        </LoadingAnimation>
    )
}

export default UsersDonation
