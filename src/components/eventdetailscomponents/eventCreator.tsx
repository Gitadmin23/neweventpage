"use client"
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react' 
import { usePathname, useRouter, useSearchParams } from 'next/navigation' 
import useCustomTheme from '@/hooks/useTheme' 
import InterestedUsers from '../eventcomponents/interestedUser' 
import { ChatBtn, AddAndRemoveUser, UserImage } from '../shared'
import { IEventType } from '@/helpers/models/event'
import { capitalizeFLetter } from '@/helpers/utils/capitalLetter'
import { textLimit } from '@/helpers/utils/textlimit'
import { useDetails } from '@/helpers/store/useUserDetails'
import { DASHBOARDPAGE_URL } from '@/helpers/services/urls'
import { useColorMode } from '../ui/color-mode'
import Cookies from "js-cookie"

export default function EventCreator(props: IEventType) {

    const { 
        createdBy,
        id
    } = props

    const [isFriend, setisFriend] = useState(createdBy?.joinStatus)

    const [open, setOpen] = useState(false)

    const pathname = usePathname()
    const query = useSearchParams();
    const frame = query?.get('frame');
    const type = query?.get('type');
    const router = useRouter() 
    const { colorMode } = useColorMode();

    const token = Cookies.get("chase_token")

    const isAdmin = props?.isOrganizer || props?.eventMemberRole === "ADMIN" || props?.eventMemberRole === "COLLABORATOR"
    const { userId: user_index } = useDetails((state) => state);

    const clickHandler = () => { 
        // router.push("/dashboard/profile/" + createdBy?.userId) 
        window.location.href = `${DASHBOARDPAGE_URL}/dashboard/profile/${createdBy?.userId}?token=${token}&theme=${colorMode}}`;
    }

    const { 
        mainBackgroundColor,
        secondaryBackgroundColor
    } = useCustomTheme();

    return (
        <Flex w={["130px", "fit-content", isAdmin ? "full" : "full"]} gap={"6"} bgColor={[mainBackgroundColor, mainBackgroundColor, secondaryBackgroundColor]} rounded={"64px"} alignItems={["center"]} h={["fit-content", "fit-content", "86px"]} px={["0px", "0px", "4"]} py={["0px", "0px", "3"]} >
            <Flex as={"button"} onClick={clickHandler} position={"relative"} border={"0px solid #CDD3FD"} rounded={"full"} alignItems={"center"} gap={"3"} >
                <Flex width={"fit-content"} position={"relative"} >
                    <Flex display={["none", "flex", "flex"]} >
                        <UserImage user={createdBy} size="sm" />
                    </Flex>
                    <Flex display={["flex", "none", "none"]} >
                        <UserImage user={createdBy} />
                    </Flex> 
                </Flex>
                <Box >
                    <Text textAlign={"left"} display={["none", "block"]} fontWeight={"medium"} >{capitalizeFLetter(createdBy?.firstName) + " " + capitalizeFLetter(createdBy?.lastName)}</Text>
                    <Text textAlign={"left"} display={["block", "none"]} fontWeight={"medium"} fontSize={"12px"} >{textLimit(capitalizeFLetter(createdBy?.firstName) + " " + capitalizeFLetter(createdBy?.lastName), 10)}</Text>
                    <Text textAlign={"left"} mt={"-2px"} fontSize={["13px", "13px", "sm"]} >{createdBy?.username?.includes("@gmail") ? textLimit(createdBy?.username, 4) : textLimit(createdBy?.username, 10)}</Text>
                </Box>
            </Flex>
            <Flex display={["none", "none", "flex"]} ml={["0px", "0px", "auto"]} alignContent={"center"} gap={"3"} >

                <Flex rounded={"64px"} display={["none", "none", createdBy?.userId !== user_index ? "flex" : "none"]} h={"47px"} bgColor={mainBackgroundColor} px={["3", "3", "5", "5"]} py={"12px"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                    {createdBy?.userId !== user_index && (
                        <Flex color={"#5465E0"} rounded={"32px"} justifyContent={"center"} alignItems={"center"} gap={["1"]} px={"1px"} py={"8px"} >
                            <ChatBtn userId={createdBy?.userId ?? ""} />
                            <AddAndRemoveUser icon={true} name={(isFriend === "FRIEND_REQUEST_RECIEVED" || isFriend === "FRIEND_REQUEST_SENT" || isFriend === "CONNECTED" || isFriend === "CONNECTFriend") ? isFriend === "FRIEND_REQUEST_SENT" ? "Pending" : isFriend === "CONNECTFriend" ? "Disconnect" : "Disconnect" : "Connect"} setJoinStatus={setisFriend} user_index={createdBy?.userId} /> 
                        </Flex>
                    )}
                </Flex>
                {props?.attendeesVisibility && (
                    <InterestedUsers event={props} />
                )}
            </Flex> 
        </Flex>
    )
}
