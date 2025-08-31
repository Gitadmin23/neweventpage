"use client"
import { IEventType } from "@/helpers/models/event";
import useCustomTheme from "@/hooks/useTheme";
import { Flex, Text } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductImageScroller, ShareLink } from "../../shared";
import moment from "moment";
import { LocationStrokeEx } from "@/svg";
import { textLimit } from "@/helpers/utils/textlimit";
import InterestedUsers from "../interestedUser";
import EventPrice from "../eventPrice";
import { toaster } from "@/components/ui/toaster";
import { SHARE_URL } from "@/helpers/services/urls";
import { useFetchData } from "@/hooks/useFetchData";

export default function EventCard(
    {
        event
    }: {
        event: IEventType
    }
) {

    const router = useRouter()

    const { primaryColor, mainBackgroundColor } = useCustomTheme()
    const query = useSearchParams();
    const frame = query?.get('frame');


    const { data: meshData = [] } = useFetchData<Array<any>>({
        name: "all-events-mesh", endpoint: `/pin-item/search`, id: event?.id, params: {
            typeId: event?.id
        }
    });

    const { data: donationData } = useFetchData<any>({
        name: "all-donation", endpoint: `/pinned-fundraisers/get-pinned-event-fundraising/${event?.id}`, id: event?.id, params: {
            id: event?.id
        }
    });

    const clickHandler = () => {
        if (frame) {
            window.location.href = `${SHARE_URL}/event?id=${event?.id}`;
        } else {
            router.push("/product/details/events/" + event?.id);
        }
    }

    return (
        <Flex as={"button"} flexDir={"column"} h={"full"} bgColor={mainBackgroundColor} borderWidth={"1px"} rounded={"10px"} w={"full"} >
            <Flex w={"full"} pos={"relative"} onClick={() => clickHandler()} >
                <ProductImageScroller images={event.picUrls.length > 0 ? event.picUrls : [event?.currentPicUrl]} createdDate={moment(event?.createdDate)?.fromNow()} userData={event?.createdBy} />
                {!frame && (
                    <ShareLink
                        data={event}
                        type="EVENT"
                        // size="18px"
                        affiliateID={event?.affiliateID}
                        showText={false}
                        id={event?.id}
                    />
                )}

                <Flex onClick={() => clickHandler()} w={"fit-content"} pos={"absolute"} bottom={"4"} left={"2"} >
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
                <Flex gap={"2"} w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                    <Flex flexDirection={"column"} alignItems={"start"}  >
                        <Text fontSize={"14px"} fontWeight={"700"} >{textLimit(event?.eventName, 20)}</Text>
                        <Flex display={["none", "none", "flex"]} w={"full"} gap={"1"} >
                            <Flex w={"fit-content"} mt={"2px"} >
                                <LocationStrokeEx color={primaryColor} size='17px' />
                            </Flex>
                            <Text color={primaryColor} textAlign={"left"} fontSize={"12px"} fontWeight={"500"} >{event?.location?.toBeAnnounced ? "To Be Announced" : textLimit(event?.location?.locationDetails + "", 17)}</Text>
                        </Flex>
                        <Flex display={["flex", "flex", "none"]} w={"full"} gap={"1"} >
                            <Flex w={"fit-content"} mt={"2px"} >
                                <LocationStrokeEx color={primaryColor} size='17px' />
                            </Flex>
                            <Text color={primaryColor} textAlign={"left"} fontSize={"12px"} fontWeight={"500"} >{event?.location?.toBeAnnounced ? "To Be Announced" : textLimit(event?.location?.locationDetails + "", 17)}</Text>
                        </Flex>
                    </Flex>
                    <Text color={primaryColor} display={["block"]} ml={"auto"} fontWeight={"600"} fontSize={["10px", "10px", "14px"]} >
                        <EventPrice
                            minPrice={event?.minPrice}
                            maxPrice={event?.maxPrice}
                            currency={event?.currency}
                        />
                    </Text>
                </Flex>
            </Flex>
            {event?.interestedUsers?.length > 0 && (
                <Flex borderTopWidth={(meshData?.length > 0 || donationData?.length > 0 || event?.affiliates?.length > 0 ) ? "0px" : "1px"} w={"full"} mt={["auto"]} h={["50px", "50px", "50px"]} px={["2", "2", "3"]} alignItems={"center"} >
                    {event?.attendeesVisibility && (
                        <InterestedUsers
                            event={event}
                        />
                    )}
                </Flex>
            )}
            {meshData?.length > 0 || donationData?.length > 0 || event?.affiliates?.length > 0 && (
                <Flex borderTopWidth={"1px"} w={"full"} mt={["auto"]} gap={"2"} h={["50px", "50px", "50px"]} px={["2", "2", "3"]} alignItems={"center"} >
                    {meshData?.length > 0 && (
                        <Flex rounded={"5px"} fontWeight={"semibold"} fontSize={"10px"} height={"30px"} justifyContent={"center"} alignItems={"center"} w={"full"} color={"#233DF3"} bgColor={"#F2F4FF"} >
                            <Text>Fundraiser</Text>
                        </Flex>
                    )}
                    {event?.affiliates.length > 0 && (
                        <Flex rounded={"5px"} fontWeight={"semibold"} fontSize={"10px"} height={"30px"} justifyContent={"center"} alignItems={"center"} w={"full"} maxW={"40%"} color={"#12BC42"} bgColor={"#F3FFF6"} >
                            <Text>Need a PR</Text>
                        </Flex>
                    )}
                    {meshData?.length > 0 && (
                        <Flex rounded={"5px"} fontWeight={"semibold"} fontSize={"10px"} height={"30px"} justifyContent={"center"} alignItems={"center"} w={"full"} color={"#FCD516"} bgColor={"#FFFCF3"} >
                            <Text>Item for sale</Text>
                        </Flex>
                    )}
                </Flex>
            )}
        </Flex>
    )
}