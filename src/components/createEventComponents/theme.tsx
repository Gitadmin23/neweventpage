"use client"
import { Flex, Text } from "@chakra-ui/react";
import { CustomButton, CustomDatePicker, CustomInput, EventCategory, ImagePicker } from "../shared";
import useEvent from "@/hooks/useEvent";
import CustomSwitch from "./theme/customEventSwitch";
import EventVisibility from "./theme/eventVisibility";
import { useImage } from "@/helpers/store/useImagePicker";
import { toaster } from "../ui/toaster";


export default function Theme(
    {
        formik,
        isLoading
    } : {
        isLoading: boolean;
        formik: any
    }
) {



    const { image } = useImage((state) => state)

    const clickHandler = () => {
        if (image?.length === 0 && formik.values.picUrls === 0) {
            toaster.create({
                title: `Add Image`,
                type: "error",
                closable: true
            }) 
        } else {
            formik.handleSubmit()
        }
    }

    return (
        <Flex w={"full"} flexDir={"column"} gap={"4"} >
            <Flex w={"full"} flexDir={"column"} >
                <Text fontSize={"20px"} fontWeight={"semibold"} >Add image and Videos</Text>
                <Text fontSize={"14px"} mb={"2"} >Add clear images that show your event information with a good background</Text>
                <ImagePicker preview={formik?.values.picUrls} />
            </Flex>
            <Flex w={"full"} flexDir={"column"} >
                <Text fontSize={"20px"} fontWeight={"semibold"} >Basic Event Details</Text>
                <Text fontSize={"14px"} mb={"2"} >This section highlights details that should attract attendees to your event</Text>
                <CustomInput name={"eventName"} errors={formik?.errors} touched={formik?.touched} setValue={formik.setFieldValue} label="Event Title *" value={formik.values} />
            </Flex>
            <EventCategory value={formik?.values?.eventType} errors={formik?.errors} touched={formik?.touched} setValue={formik.setFieldValue} />
            <CustomInput name={"eventDescription"} textarea={true} errors={formik?.errors} touched={formik?.touched} setValue={formik.setFieldValue} label="Description*" value={formik.values} />
            <Flex gap={"3"} w={"full"} >
                <CustomSwitch label="Attendee Visibility" name="attendeesVisibility" value={formik.values.attendeesVisibility} setValue={formik.setFieldValue} />
                <EventVisibility value={formik.values.isPublic+""} errors={formik?.errors} touched={formik?.touched} setValue={formik.setFieldValue} />
            </Flex>
            <Text fontSize={"14px"} >Tells us when your event starts and Ends</Text>
            <Flex gap={"3"} w={"full"} >
                <CustomDatePicker label="Start *" name={["startDate", "startTime"]} value={formik?.values?.startDate} setValue={formik.setFieldValue} errors={formik?.errors} touched={formik?.touched} />
                <CustomDatePicker label="End *" start={formik?.values?.startDate} name={["endDate", "endTime"]} value={formik?.values?.endDate} setValue={formik.setFieldValue} errors={formik?.errors} touched={formik?.touched} />
            </Flex>
            <Flex justifyContent={"end"} py={"6"} >
                <CustomButton isLoading={isLoading} onClick={clickHandler} text={"Save and continue"} maxW={"250px"} borderRadius={"999px"} />
            </Flex>
        </Flex>
    )
}