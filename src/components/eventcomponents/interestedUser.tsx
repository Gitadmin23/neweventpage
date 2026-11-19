"use client"
import { Avatar, AvatarGroup } from '@chakra-ui/react'
import React from 'react' 
import { UserImage } from '../shared';
import { formatNumberWithK } from '@/helpers/utils/formatNumberWithK';
import { IEventType } from '@/helpers/models/event';

interface Props {
    event: IEventType,
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl",
}

function InterestedUsers(props: Props) {
    const {
        event,
        size,
    } = props 

    return (
        <>
            {event?.interestedUsers?.length > 0 && ( 
                <AvatarGroup gap="0" spaceX="-2.5" size={size ?? "xs"}> 
                    {event?.interestedUsers?.slice(0, 3)?.map((item: any, index: number) => (
                        <UserImage key={item?.userId || index} size={size ?? "xs"} user={item} />
                    ))}
                    {event?.memberCount > 3 && (
                        <Avatar.Root
                            size={size ?? "xs"}
                            rounded={"full"}
                            roundedTopRight={"4px"}
                            variant="solid"
                            bg={"#18191A"}
                            color={"white"}
                            borderWidth={"1.5px"}
                            borderColor={"white"}
                        >
                            <Avatar.Fallback color={"white"} fontSize={"10px"} fontWeight={"700"}>
                                {"+" + formatNumberWithK(event?.memberCount - 3)}
                            </Avatar.Fallback>
                        </Avatar.Root>
                    )}
                </AvatarGroup>
            )}
        </>
    )
}

export default InterestedUsers
