import { IEventType } from "@/helpers/models/event";
import { dateFormat, timeFormat } from "@/helpers/utils/dateFormat";
import useCustomTheme from "@/hooks/useTheme";
import { CalendarIcon } from "@/svg";
import { Flex, Text } from "@chakra-ui/react";


export default function EventDate(
    {
        startDate, 
        endDate
    } : IEventType
){

    const { primaryColor } = useCustomTheme()

    return( 
        <Flex alignItems={"center"} gap={"3"} >
        <Flex w={"full"} flexDir={"column"} gap={"4"} >
            <Flex gap={"2"} alignItems={"center"} >
                <Text fontWeight={"600"} w={"90px"} >Start Date:</Text>
                <CalendarIcon color={primaryColor} />
                <Text fontSize={["12px", "12px", "14px"]} >{dateFormat(startDate)} {timeFormat(startDate)}</Text>
            </Flex>
            <Flex gap={"2"} alignItems={"center"}>
                <Text fontWeight={"600"} w={"90px"} >End Date:</Text>
                <CalendarIcon color={primaryColor} />
                <Text fontSize={["12px", "12px", "14px"]} >{dateFormat(endDate)} {timeFormat(endDate)}</Text>
            </Flex>
        </Flex>
    </Flex>
    )
}