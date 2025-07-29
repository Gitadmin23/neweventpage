"use client"
import { IEventType } from "@/helpers/models/event"
import { IDonationList } from "@/helpers/models/fundraising"
import { textLimit } from "@/helpers/utils/textlimit"
import useCustomTheme from "@/hooks/useTheme"
import { Flex, Text } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { IoIosArrowForward } from "react-icons/io"

export default function BreadCrumbs(
    {
        eventName,
        name
    } : IEventType | IDonationList | any
) {

    const { back, push } = useRouter()
    const { primaryColor } = useCustomTheme()

    const query = useSearchParams();
    const edit = query?.get('edit');

    const clickHandler = () => {
        if(edit) { 
            if(name) {
                push("/product/fundraising")
            } else {
                push("/product/events")
            }
        } else {
            back()
        }
    }

    return (
        <Flex gap={"1"} alignItems={"center"} pb={"3"} >
            <Text cursor={"pointer"} onClick={clickHandler} fontSize={"14px"} color={primaryColor} fontWeight={"500"} >Back</Text>
            <IoIosArrowForward />
            <Text fontSize={"14px"} fontWeight={"500"} >{name ? "Fundraising" : "Event"} details</Text>
            <IoIosArrowForward />
            <Text fontSize={"14px"} fontWeight={"500"} >{textLimit(name ? name : eventName, 20)}</Text>
        </Flex>
    )
}