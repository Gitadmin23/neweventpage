"use client"
import { Flex, Text } from "@chakra-ui/react";
import { CustomButton, CustomDatePicker, CustomInput, ImagePicker } from "../shared";
import useEvent from "@/hooks/useEvent";
import CustomSwitch from "./theme/customEventSwitch";
import EventVisibility from "./theme/eventVisibility";
import { useImage } from "@/helpers/store/useImagePicker";
import { toaster } from "../ui/toaster";
import EventCategory from "./theme/eventCategory";
import CustomEditor from "../shared/customEditor";


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
        if (image?.length === 0 && formik.values?.picUrls.length === 0) {
            toaster.create({
                title: `Add Image`,
                type: "error",
                closable: true
            }) 
 
        } else {
            formik.handleSubmit()
        }
    }

    console.log(formik?.values);
    

    return (
        <Flex w={"full"} flexDir={"column"} gap={"4"} px={"4"} >
            <Flex w={"full"} flexDir={"column"} >
                <Text fontSize={["18px", "18px", "20px"]} fontWeight={"semibold"} >Add image and Videos</Text>
                <Text fontSize={"14px"} mb={"2"} >Add clear images that show your event information with a good background</Text>
                <ImagePicker preview={formik?.values?.picUrls} setValue={formik.setFieldValue} />
            </Flex>
            <Flex w={"full"} flexDir={"column"} >
                <Text fontSize={"20px"} fontWeight={"semibold"} >Basic Event Details</Text>
                <Text fontSize={"14px"} mb={"2"} >This section highlights details that should attract attendees to your event</Text>
                <CustomInput name={"eventName"} label="Event Title *" />
            </Flex>
            <EventCategory value={formik?.values?.eventType} touched={formik?.touched} setValue={formik.setFieldValue} />
            <CustomEditor name={"eventDescription"} editor={true} label="Description*" />
            <Flex gap={"3"} w={"full"}  flexDir={["column", "column", "row"]} >
                <CustomSwitch label="Attendee Visibility" name="attendeesVisibility" value={formik.values.attendeesVisibility} setValue={formik.setFieldValue} />
                <EventVisibility />
            </Flex>
            <Text fontSize={"14px"} >Tells us when your event starts and Ends</Text>
            <Flex gap={"3"} w={"full"} flexDir={["column", "column", "row"]} >
                <CustomDatePicker label="Start *" name={["startDate", "startTime", "endDate", "endTime"]} value={formik?.values?.startDate} setValue={formik.setFieldValue} errors={formik?.errors} touched={formik?.touched} />
                <CustomDatePicker label="End *" start={formik?.values?.startDate} name={["endDate", "endTime"]} value={formik?.values?.endDate} setValue={formik.setFieldValue} errors={formik?.errors} touched={formik?.touched} />
            </Flex>
            <Flex justifyContent={"end"} py={"6"} >
                <CustomButton isLoading={isLoading} onClick={clickHandler} text={"Save and continue"} maxW={"250px"} borderRadius={"999px"} />
            </Flex>
        </Flex>
    )
}