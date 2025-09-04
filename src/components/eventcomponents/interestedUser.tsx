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
                <AvatarGroup gap="0" spaceX="-3" size="lg"> 
                    {event?.interestedUsers?.map((item: any, index: number) => {
                        if (index <= 3) {
                            return (
                                <UserImage size={size ?? "xs"} user={item} />
                            )
                        }
                    })}
                    {event?.memberCount >= 4 &&
                        <Avatar.Root size={size ?? "xs"}  rounded={"full"} roundedTopRight={"0px"} variant="solid">
                            <Avatar.Fallback>{"+" + formatNumberWithK(event?.memberCount - 3)}</Avatar.Fallback>
                        </Avatar.Root>
                    }
                </AvatarGroup>
            )}
        </>
    )
}

export default InterestedUsers
