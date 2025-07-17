"use client"
import { IEventType } from "@/helpers/models/event"
import { textLimit } from "@/helpers/utils/textlimit"
import useCustomTheme from "@/hooks/useTheme"
import { Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { IoIosArrowForward } from "react-icons/io"

export default function BreadCrumbs(
    {
        eventName
    } : IEventType
) {

    const { back  } = useRouter()
    const { primaryColor } = useCustomTheme()

    const clickHandler = () => {
        back()
    }

    return (
        <Flex gap={"1"} alignItems={"center"} pb={"3"} >
            <Text cursor={"pointer"} onClick={clickHandler} fontSize={"14px"} color={primaryColor} fontWeight={"500"} >Back</Text>
            <IoIosArrowForward />
            <Text fontSize={"14px"} fontWeight={"500"} >Event details</Text>
            <IoIosArrowForward />
            <Text fontSize={"14px"} fontWeight={"500"} >{textLimit(eventName, 20)}</Text>
        </Flex>
    )
}