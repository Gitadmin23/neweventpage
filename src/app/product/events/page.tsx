"use client"
import { EventLisiting, SelectEventOption } from "@/components/eventcomponents";
import { GlassIcon } from "@/svg";
import { Flex } from "@chakra-ui/react";


export default function EventPage() {
    return (
        <Flex w={"full"} px={["4", "4", "6"]} pt={["6", "6", "12", "12"]} pb={"12"} flexDir={"column"} overflowY={"auto"} >
            <Flex w={"full"} alignItems={"center"} flexDirection={"column"} gap={"3"} >
                <Flex fontSize={["20px", "20px", "56px"]} alignItems={"end"} display={["flex", "flex", "none"]} fontWeight={"700"} >what are you l<Flex mb={"1"} ><GlassIcon size='17' /></Flex>king for?</Flex>
                <Flex fontSize={["16px", "16px", "56px"]} alignItems={"end"} display={["none", "none", "flex"]} fontWeight={"700"} >what are you l<Flex mb={"3"} ><GlassIcon size='45' /></Flex>king for?</Flex>
                <Flex pt={["6", "6", "6"]} pb={["0px", "6", "6"]} maxWidth={"745px"} position={"relative"} width={"full"} gap={"4"} flexDir={["row"]} alignItems={["start", "start", "center"]} flexDirection={["column", "column", "row"]} >
                    <SelectEventOption />
                </Flex>
            </Flex>
            <Flex w={"full"} >
                <EventLisiting />
            </Flex>
        </Flex>
    )
}