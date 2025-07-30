"use client"
import { IEventType } from "@/helpers/models/event";
import useCustomTheme from "@/hooks/useTheme";
import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ProductImageScroller } from "../../shared";
import moment from "moment";
import { LocationStrokeEx } from "@/svg";
import { textLimit } from "@/helpers/utils/textlimit";
import InterestedUsers from "../interestedUser";
import EventPrice from "../eventPrice";

export default function EventCard(
    {
        event
    }: {
        event: IEventType
    }
) {

    const router = useRouter()

    const { primaryColor, mainBackgroundColor } = useCustomTheme()
 

    const clickHandler = () => {
        // if (token) {
            router.push("/product/details/events/" + event?.id);
        // } else {
        //     router.push("/event/" + event?.id);
        // }
    }

    return (
        <Flex as={"button"} flexDir={"column"} h={"full"} bgColor={mainBackgroundColor} onClick={() => clickHandler()} borderWidth={"1px"} rounded={"10px"} w={"full"} >
            <Flex w={"full"} pos={"relative"} >
                <ProductImageScroller images={event.picUrls.length > 0 ? event.picUrls : [event?.currentPicUrl]} createdDate={moment(event?.createdDate)?.fromNow()} userData={event?.createdBy} />
                {/* <Flex w={"40px"} pos={"absolute"} display={["none", "none", "flex"]} bottom={"4"} right={"4"} h={"40px"} rounded={"full"} bgColor={mainBackgroundColor} justifyContent={"center"} alignItems={"center"} > */}
                {/* <ShareEvent
                        data={event}
                        type="EVENT"
                        // size="18px"
                        showText={false}
                        id={event?.id}
                    /> */}
                {/* </Flex> */}

                <Flex w={"fit-content"} pos={"absolute"} bottom={"4"} left={"2"} display={["block", "block", "none"]} >
                    <Flex
                        width={"40px"}
                        flexDir={"column"}
                        py={"2"}
                        alignItems={"center"}
                        roundedBottom={"20px"}
                        roundedTopLeft={"20px"}
                        bgColor={"#C4C4C499"}
                        borderWidth={"1px"}
                    >
                        <Text
                            fontSize={"10px"}
                            fontWeight={"700"}
                            lineHeight={"10px"}
                            color={"white"}
                        >
                            {moment(event?.startDate).format("MMM")}
                        </Text>
                        <Text lineHeight={"16px"} fontWeight={"700"}
                            color={"white"} fontSize={"16px"}>
                            {moment(event?.startDate).format("D")}
                        </Text>
                    </Flex>
                </Flex>
            </Flex> 
            <Flex flexDir={"column"} px={["1", "1", "3"]} pt={["2", "2", "3"]} gap={"1"} pb={["1", "1", "1"]} >
                <Flex gap={"2"} >
                    <Flex w={"fit-content"} display={["none", "none", "block"]} >
                        <Flex
                            width={"50px"}
                            flexDir={"column"}
                            py={"2"}
                            alignItems={"center"}
                            roundedBottom={"20px"}
                            roundedTopLeft={"20px"}
                            borderWidth={"1px"}
                        >
                            <Text
                                fontSize={"12px"}
                                fontWeight={"700"}
                                lineHeight={"10px"}
                                color={primaryColor}
                            >
                                {moment(event?.startDate).format("MMM")}
                            </Text>
                            <Text lineHeight={"24px"} fontWeight={"700"} fontSize={"24px"}>
                                {moment(event?.startDate).format("D")}
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex flexDirection={"column"} alignItems={"start"}  >
                        <Text fontSize={"14px"} fontWeight={"700"} >{textLimit(event?.eventName, 20)}</Text>
                        <Flex display={["none", "none", "flex"]} w={"full"} gap={"1"} >
                            <Flex w={"fit-content"} mt={"2px"} >
                                <LocationStrokeEx color={primaryColor} size='17px' />
                            </Flex>
                            <Text color={primaryColor} textAlign={"left"} fontSize={"12px"} fontWeight={"500"} >{event?.location?.toBeAnnounced ? "To Be Announced" : textLimit(event?.location?.locationDetails + "", 25)}</Text>
                        </Flex>
                        <Flex display={["flex", "flex", "none"]} w={"full"} gap={"1"} >
                            <Flex w={"fit-content"} mt={"2px"} >
                                <LocationStrokeEx color={primaryColor} size='17px' />
                            </Flex>
                            <Text color={primaryColor} textAlign={"left"} fontSize={"12px"} fontWeight={"500"} >{event?.location?.toBeAnnounced ? "To Be Announced" : textLimit(event?.location?.locationDetails + "", 25)}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <Flex borderTopWidth={"1px"} w={"full"} mt={["auto"]} h={["50px", "50px", "50px"]} px={["2", "2", "3"]} alignItems={"center"} >
                {event?.attendeesVisibility && (
                    <InterestedUsers 
                        event={event} 
                    />
                )} 
                <Text color={primaryColor} display={["block"]} ml={"auto"} fontWeight={"600"} fontSize={"14px"} >
                    <EventPrice
                        minPrice={event?.minPrice}
                        maxPrice={event?.maxPrice}
                        currency={event?.currency}
                    />
                </Text>
            </Flex>
        </Flex>
    )
}