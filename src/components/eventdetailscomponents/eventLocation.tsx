import { IEventType } from "@/helpers/models/event";
import { textLimit } from "@/helpers/utils/textlimit";
import useCustomTheme from "@/hooks/useTheme";
import { LinkIcon, LocationStroke } from "@/svg";
import { Flex, Text } from "@chakra-ui/react";

export default function EventLocation(
    {
        data,
        limit = 0,
        showLink,
        fontSize
    } :{ data: IEventType, limit?: number, showLink: boolean, fontSize?: string}
) {

    const {
        location 
    } = data

    const { secondaryBackgroundColor } = useCustomTheme()

    return (
        <Flex w={"full"} gap={"2"} flexDir={"column"} >
            <Flex maxW={showLink ? "400px" : "full"} rounded={"32px"} py={"2"} px={showLink? "3" : "0px"} bgColor={showLink ? secondaryBackgroundColor : "transparent"} w={"full"} gap={showLink ? "2" : "1"} alignItems={"center"} >
                <LocationStroke />
                <Text fontSize={fontSize ?? "14px"} fontWeight={"500"} whiteSpace={"none"} lineBreak={"anywhere"} >{location?.toBeAnnounced ? "To Be Announced" : textLimit(location?.locationDetails+"", limit)}</Text>
            </Flex>
            {(location?.link && showLink)&& (
                <Flex maxW={["400px"]} rounded={"32px"} py={"2"} px={"3"} bgColor={secondaryBackgroundColor} w={"full"} gap={"2"} alignItems={"center"} >
                    <LinkIcon />
                    <Text fontSize={"14px"} fontWeight={"500"} ><a target="_blank" href={location?.link} >Click Me</a></Text>
                </Flex>
            )}
        </Flex>
    )
}