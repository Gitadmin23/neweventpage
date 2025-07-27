"use client"
import { IEventType } from "@/helpers/models/event";
import { Flex, Text } from "@chakra-ui/react";
import BreadCrumbs from "./breadcrumbs"; 
import EventCreator from "./eventCreator";
import InterestedUsers from "../eventcomponents/interestedUser";
import { capitalizeFLetter } from "@/helpers/utils/capitalLetter";
import PrBtn from "../prcomponent/prBtn";
import useCustomTheme from "@/hooks/useTheme";
import OrganizeBtn from "./organizeBtn";
import { usePathname } from "next/navigation";
import VolunteerBtn from "./volunteerBtn";
import EventLocation from "./eventLocation";
import EventMesh from "./eventMesh";
import EventDonation from "./eventDonation";
import ViewRequest from "./viewRequest";
import { DescriptionCard, EventMap, ProductImageScroller } from "../shared";
import EventDate from "./eventDate";
import ViewTicket from "./viewTicket";
import SelectTicketBtn from "./selectTicketBtn";

export default function DetailsPage(
    props: IEventType | any
) {

    const {
        isOrganizer,
        eventMemberRole,
        eventName,
        eventDescription,
        attendeesVisibility,
        location
    } = props

    const { mainBackgroundColor } = useCustomTheme()

    const isAdmin = isOrganizer || eventMemberRole === "ADMIN" || eventMemberRole === "COLLABORATOR"

    const pathname = usePathname()

    return (
        <Flex w={"full"} bgColor={mainBackgroundColor} flexDir={"column"} gap={"4"} px={["4", "4", "6"]} pb={["400px", "400px", "6"]} py={"6"} >
            <BreadCrumbs {...props} />
            <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                <Flex flexDir={"column"} w={"full"} gap={"4"} >
                    <ProductImageScroller rounded={"8px"} height={["340px", "340px", "520px"]} images={props.picUrls.length > 0 ? props.picUrls : [props.currentPicUrl]} />
                    <Flex w={"full"} alignItems={"center"} my={"auto"} display={["none", "none", "flex"]} >
                        <EventLocation showLink={true} data={props} />
                    </Flex>
                </Flex>
                <Flex w={"full"} flexDir={"column"} gap={"3"} >
                    <Text fontWeight={"700"} fontSize={["16px", "16px", "24px"]} >{capitalizeFLetter(eventName)}</Text>
                    <Flex w={"full"} flexDir={["column-reverse", "column-reverse", "column"]} gap={"2"} >
                        <DescriptionCard limit={200} label='Event Details' description={eventDescription} />
                        <Flex flexDir={isAdmin ? "column" : "row"} gap={"2"} w={"full"} >
                            <Flex w={[isAdmin ? "full" : "fit-content", isAdmin ? "full" : "full", "full"]} alignItems={["start", "start", "center"]} flexDir={["column", "column", "row"]} justifyContent={["start", "start", "space-between"]} gap={"3"} >
                                <Flex gap={"3"} w={[isAdmin ? "full" : "fit-content", isAdmin ? "full" : "full", "full"]} alignItems={[isAdmin ? "center" : "start", isAdmin ? "center" : "start", "center"]} flexDir={[isAdmin ? "row" : "column", isAdmin ? "row" : "column", "row"]} justifyContent={[isAdmin ? "space-between" : "start", isAdmin ? "space-between" : "start", "space-between"]}  >
                                    <EventCreator {...props} />
                                    <Flex display={["flex", "flex", "none"]} w={"full"} flexDir={"column"} gap={"2"} mr={isAdmin ? "auto" : "0px"} >
                                        {attendeesVisibility && (
                                            <InterestedUsers event={props} />
                                        )}

                                        {(!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && (
                                            <PrBtn data={props} />
                                        )}
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex display={["flex", "flex", "none"]} maxW={["full", "full", "full", "430px", "430px"]} flexDir={"column"} gap={"2"} w={"full"} >
                                {((eventMemberRole !== "COLLABORATOR") && !isOrganizer && eventMemberRole !== "ADMIN") && (
                                    <Flex bg={mainBackgroundColor} zIndex={"50"} pos={["relative"]} bottom={"0px"} w={"full"} flexDir={"column"} rounded={"16px"} gap={"3"} p={"3"} borderWidth={(pathname?.includes("past") && !isOrganizer) ? "0px" : "1px"} borderColor={"#DEDEDE"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                                        {((!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && !pathname?.includes("past")) && (
                                            <SelectTicketBtn {...props} />
                                        )}
                                        <ViewTicket data={props} />
                                    </Flex>
                                )}
                                {isAdmin && (
                                    <OrganizeBtn {...props} />
                                )}
                                {isOrganizer && (
                                    <VolunteerBtn {...props} />
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                    <EventLocation showLink={true} data={props} />
                    <EventDate {...props} />
                    <Flex w={"full"} justifyContent={"space-between"} gap={"4"} >
                        <Flex display={["none", "none", "flex"]} w={"full"} flexDir={"column"} gap={"6"} >
                            <Flex maxW={["full", "full", "full", "317px", "317px"]} flexDir={"column"} gap={"6"} w={"full"} >
                                {((eventMemberRole !== "COLLABORATOR") && !isOrganizer && eventMemberRole !== "ADMIN") && (
                                    <Flex bg={mainBackgroundColor} zIndex={"50"} pos={["relative"]} bottom={"0px"} w={"full"} flexDir={"column"} rounded={"16px"} gap={"3"} p={"5"} borderWidth={(pathname?.includes("past") && !isOrganizer) ? "0px" : "1px"} borderColor={"#DEDEDE"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                                        {((!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && !pathname?.includes("past")) && (
                                            <SelectTicketBtn {...props} />
                                        )}
                                        <ViewTicket data={props} />
                                    </Flex>
                                )}
                                {isAdmin && (
                                    <OrganizeBtn {...props} />
                                )}
                            </Flex>
                            {/* {isOrganizer && (
                                <VolunteerBtn {...props} />
                            )} */}
                            {(!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && (
                                <Flex w={"fit-content"} >
                                    <PrBtn data={props} />
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                <Flex w={"full"} flexDir={"column"} gap={"3"} >
                    {/* <EventLocation showLink={true} data={props} /> */}
                    <Flex w={"full"} maxW={"500px"} gap={"2"} flexDir={["column", "column", "column", "column", "row"]} >
                        <Flex w={"full"} display={["flex", "flex", "none"]} >
                            <EventMesh data={props} />
                        </Flex>
                        <EventDonation item={props} />
                        {isOrganizer && (
                            <Flex w={"fit-content"} mt={"auto"} height={["auto", "auto", "fit-content"]} >
                                <ViewRequest {...props} />
                            </Flex>
                        )}
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        {/* <EventLocation {...props} /> */}
                        {location?.latlng && (
                            <Flex flexDir={"column"} gap={"2"} >
                                <Text fontSize={"14px"} fontWeight={"bold"} >Location and surroundings</Text>
                                <EventMap height={"212px"} latlng={location?.latlng ?? ""} />
                            </Flex>
                        )}
                    </Flex>
                </Flex>
                <Flex w={"full"} display={["none", "none", "flex"]} flexDir={"column"} >
                    <EventMesh data={props} />
                    <Flex w={"full"} h={"8"} />
                </Flex>
            </Flex>
        </Flex>
    )
}