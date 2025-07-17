"use client"
import { Flex, Text } from "@chakra-ui/react";
import { CustomInput, ImagePicker } from "../shared";
import useEvent from "@/hooks/useEvent";


export default function Theme() {

    const { formikTheme } = useEvent()

    return (
        <Flex w={"full"} flexDir={"column"} gap={"4"} >
            <Flex w={"full"} flexDir={"column"} >
                <Text fontSize={"20px"} fontWeight={"semibold"} >Add image and Videos</Text>
                <Text fontSize={"14px"} mb={"2"} >Add clear images that show your event information with a good background</Text>
                <ImagePicker />
            </Flex>
            <Flex w={"full"} flexDir={"column"} >
                <Text fontSize={"20px"} fontWeight={"semibold"} >Basic Event Details</Text>
                <Text fontSize={"14px"} mb={"2"} >This section highlights details that should attract attendees to your event</Text>
                <CustomInput name={"eventName"} setValue={formikTheme.setFieldValue} label="Event Title *" value={formikTheme.values} />
            </Flex>
            <CustomInput name={"eventDescription"} textarea={true} setValue={formikTheme.setFieldValue} label="Description*" value={formikTheme.values} />
        </Flex>
    )
}