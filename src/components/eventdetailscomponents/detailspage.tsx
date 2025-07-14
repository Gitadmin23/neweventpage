import { IEventType } from "@/helpers/models/event";
import { Flex } from "@chakra-ui/react";
import BreadCrumbs from "./breadcrumbs";
import EventImage from "./eventImage";

export default function DetailsPage(
    props : IEventType
){
    return(
        <Flex w={"full"} flexDir={"column"} pos={"relative"} gap={"4"} px={["0px", "0px", "6"]} pb={["400px", "400px", "6"]} py={"6"} >
            <BreadCrumbs {...props} />

            <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                <EventImage {...props} />
            </Flex>
        </Flex>
    )
}