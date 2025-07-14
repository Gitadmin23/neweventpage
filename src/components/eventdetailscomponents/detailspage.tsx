import { IEventType } from "@/helpers/models/event";
import { Flex, Text } from "@chakra-ui/react";
import BreadCrumbs from "./breadcrumbs";
import EventImage from "./eventImage";
import DescriptionPage from "./descriptionPage";
import EventCreator from "./eventCreator";
import InterestedUsers from "../eventcomponents/interestedUser";
import { capitalizeFLetter } from "@/helpers/utils/capitalLetter";
import PrBtn from "../prcomponent/prBtn";
import useCustomTheme from "@/hooks/useTheme";

export default function DetailsPage(
    props : IEventType
){

    const { mainBackgroundColor } = useCustomTheme()

    const isAdmin = props?.isOrganizer || props?.eventMemberRole === "ADMIN" || props?.eventMemberRole === "COLLABORATOR"

    return(
        <Flex w={"full"} bgColor={mainBackgroundColor} flexDir={"column"} pos={"relative"} gap={"4"} px={["0px", "0px", "6"]} pb={["400px", "400px", "6"]} py={"6"} >
            <BreadCrumbs {...props} />

            <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                <EventImage {...props} />
                <Flex w={"full"} flexDir={"column"} gap={"3"} >
                    <Text fontWeight={"700"} fontSize={["16px", "16px", "24px"]} >{capitalizeFLetter(props?.eventName)}</Text>
                    <Flex w={"full"} flexDir={["column-reverse", "column-reverse", "column"]} gap={"2"} >
                        <DescriptionPage limit={200} label='Event Details' description={props?.eventDescription} />
                        <Flex flexDir={isAdmin ? "column" : "row"} gap={"2"} w={"full"} >
                            <Flex w={[isAdmin ? "full" : "fit-content", isAdmin ? "full" : "full", "full"]} alignItems={["start", "start", "center"]} flexDir={["column", "column", "row"]} justifyContent={["start", "start", "space-between"]} gap={"3"} >
                                <Flex gap={"3"} w={[isAdmin ? "full" : "fit-content", isAdmin ? "full" : "full", "full"]} alignItems={[isAdmin ? "center" : "start", isAdmin ? "center" : "start", "center"]} flexDir={[isAdmin ? "row" : "column", isAdmin ? "row" : "column", "row"]} justifyContent={[isAdmin ? "space-between" : "start", isAdmin ? "space-between" : "start", "space-between"]}  >
                                    <EventCreator {...props} />
                                    <Flex display={["flex", "flex", "none"]} w={"full"} flexDir={"column"} gap={"2"} mr={isAdmin ? "auto" : "0px"} >
                                        {props?.attendeesVisibility && (
                                            <InterestedUsers event={props} />
                                        )}

                                        {(!props?.isOrganizer && props?.eventMemberRole !== "ADMIN" && props?.eventMemberRole !== "COLLABORATOR") && (
                                            <PrBtn data={props} />
                                        )}
                                    </Flex>
                                </Flex>
                            </Flex>
                            {/* <Flex display={["flex", "flex", "none"]} maxW={["full", "full", "full", "430px", "430px"]} flexDir={"column"} gap={"2"} w={"full"} >
                                {((eventMemberRole !== "COLLABORATOR") && !isOrganizer && eventMemberRole !== "ADMIN") && (
                                    <Flex bg={mainBackgroundColor} zIndex={"50"} pos={["relative"]} bottom={"0px"} w={"full"} flexDir={"column"} rounded={"16px"} gap={"3"} p={"3"} borderWidth={(pathname?.includes("past") && !isOrganizer) ? "0px" : "1px"} borderColor={"#DEDEDE"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} > 
                                        {((!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && !pathname?.includes("past")) && (
                                            <SelectTicket open={open} setOpen={setOpen} data={props} currency={currency} ticket={productTypeData} />
                                        )}
                                        {(!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && (
                                            <GetEventTicket open={open} setOpen={setOpen} data={props} />
                                        )}
                                    </Flex>
                                )}
                                {isAdmin && (
                                    <OrganizeBtn {...props} />
                                )}
                                {isOrganizer && (
                                    <VolunteerBtn {...props} />
                                )}
                            </Flex> */}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}