import { Avatar, AvatarGroup, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import useCustomTheme from "@/hooks/useTheme";
import { useSearchParams } from 'next/navigation';
import { UserImage } from '../shared';
import { formatNumberWithK } from '@/helpers/utils/formatNumberWithK';
import { IEventType } from '@/helpers/models/event';

interface Props {
    event: IEventType,
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl",
}

function InterestedUsers(props: Props) {
    const {
        event,
        size,
    } = props

    const { primaryColor } = useCustomTheme();

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
                        <Avatar.Root rounded={"full"} roundedTopRight={"0px"} variant="solid">
                            <Avatar.Fallback>{"+" + formatNumberWithK(event?.memberCount - 3)}</Avatar.Fallback>
                        </Avatar.Root>
                    }
                </AvatarGroup>
            )}
        </>
    )
}

export default InterestedUsers
