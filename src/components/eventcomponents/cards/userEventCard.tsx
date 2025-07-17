import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useCustomTheme from '@/hooks/useTheme'
import moment from 'moment'
import { DeleteBtn, ProductImageScroller } from '@/components/shared'
import { IEventType } from '@/helpers/models/event'
import { capitalizeFLetter } from '@/helpers/utils/capitalLetter'
import { textLimit } from '@/helpers/utils/textlimit'
import EventPrice from '../eventPrice'
import InterestedUsers from '../interestedUser'
import { EventLocation } from '@/components/eventdetailscomponents'

export default function UserEventCard(props: IEventType) {

    const {
        id,
        endDate,
    } = props;


    const router = useRouter()
    const pathname = usePathname()
    const query = useSearchParams();
    const type = query?.get('type');

    const { mainBackgroundColor, primaryColor, headerTextColor } = useCustomTheme()

    const clickHandler = () => {
        if (pathname?.includes("draft")) {
            router?.push(`/dashboard/event/edit_draft/${id}`)
        } else if (new Date(endDate) < (new Date())) {
            router?.push(`/dashboard/event/pastdetails/${id}`)
        } else {
            router?.push(`/dashboard/event/details/${id}`)
        }
    }

    return (
        <Flex as={"button"} onClick={clickHandler} w={"full"} pos={"relative"} flexDir={"column"} bg={mainBackgroundColor} rounded={"16px"} shadow={"xl"} >
            {(type !== "past_event") && (
                <DeleteBtn id={props?.id} name={props?.eventName + " Event"} isEvent={pathname?.includes("draft") ? false : true} draft={pathname?.includes("draft") ? true : false} isOrganizer={props?.isOrganizer} />
            )}
            <ProductImageScroller images={[props?.currentPicUrl]} rounded='16px' createdDate={moment(props?.createdDate)?.fromNow()} userData={props?.createdBy} />
            <Flex w={"full"} flexDir={"column"} px={"2"} >
                <Flex w={"full"} alignItems={"center"} gap={"2"} py={"2"} >
                    {props?.startDate && (
                        <Flex w={"fit-content"} >
                            <Flex
                                width={"50px"}
                                flexDir={"column"}
                                h={"49px"}
                                p={"1"}
                                justifyContent={"center"}
                                borderWidth={"1px"}
                                bgColor={mainBackgroundColor}
                                alignItems={"center"}
                                roundedBottom={"12px"}
                                roundedTopLeft={"12px"}
                            >
                                <Text
                                    fontSize={"12px"}
                                    color={primaryColor}
                                    fontWeight={"600"}
                                >
                                    {moment(props?.startDate).format("MMM")}
                                </Text>
                                <Text fontSize={"16px"} color={headerTextColor} fontWeight={"600"} >
                                    {moment(props?.startDate).format("D")}
                                </Text>
                            </Flex>
                        </Flex>
                    )}
                    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} >
                        <Flex flexDirection={"column"} justifyContent={"start"} alignItems={"start"} >
                            <Text fontWeight={"600"} fontSize={"14px"} >{textLimit(capitalizeFLetter(props?.eventName), 20)}</Text>
                            {/* <Text fontSize={"14px"}> */}
                                {/* <EventLocationDetail
                                    landingcolor={true}
                                    iconsize={"13px"}
                                    fontWeight={"medium"}
                                    fontsize={"13px"}
                                    height="auto"
                                    location={props?.location}
                                    locationType={props?.locationType}
                                    isLimited={true}
                                    length={20}
                                /> */}

                                <EventLocation limit={20} showLink={false}  fontSize='12px' data={props} />
                            {/* </Text> */}
                        </Flex>
                        <Text fontSize={"14px"} fontWeight={"600"} >
                            <EventPrice
                                font={["13px", "13px", "14px"]}
                                minPrice={props?.minPrice}
                                maxPrice={props?.maxPrice}
                                currency={props?.currency}
                            />
                        </Text>
                    </Flex>
                </Flex>
                {(type === "past_event") && (
                    <Flex w={"full"} borderTopWidth={"1px"} justifyContent={"space-between"} h={"50px"} px={"2"} alignItems={"center"} roundedBottom={"16px"} >
                        <InterestedUsers event={props} size="sm" />
                        <Text fontWeight={"600"} ml={"auto"} fontSize={"14px"} color={"#F11317"} >Ended</Text>
                    </Flex>
                )}
                {(type === "my_event") && (
                    <Flex w={"full"} borderTopWidth={"1px"} justifyContent={"space-between"} h={"50px"} px={"2"} alignItems={"center"} roundedBottom={"16px"} >
                        <InterestedUsers event={props} size="sm" />
                        <Text fontWeight={"600"} ml={"auto"} fontSize={"14px"} color={primaryColor} >Edit</Text>
                    </Flex>
                )}
                {(type === "saved_event") && (
                    <Flex w={"full"} borderTopWidth={"1px"} justifyContent={"space-between"} h={"50px"} px={"2"} alignItems={"center"} roundedBottom={"16px"} >
                        <InterestedUsers event={props} size="sm" />
                        <Text fontWeight={"600"} ml={"auto"} fontSize={"14px"} color={primaryColor} >Saved</Text>
                    </Flex>
                )}

                {(type === "draft") && (
                    <Flex w={"full"} borderTopWidth={"1px"} justifyContent={"center"} h={"50px"} px={"2"} alignItems={"center"} roundedBottom={"16px"} >
                        <Text fontWeight={"600"} fontSize={"14px"} color={primaryColor} >Draft</Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}
