"use client"
import { Flex, Text } from "@chakra-ui/react";
import SelectLocationType from "./information/selectLocationType";
import { CustomButton, CustomInput } from "../shared";
import SelectMapLocation from "./information/selectMapLocation";
import CustomEventSwitch from "./theme/customEventSwitch";
import useCustomTheme from "@/hooks/useTheme";
import { useRouter, useSearchParams } from "next/navigation";
import { toaster } from "../ui/toaster";

export default function Information(
    {
        formik,
        isLoading
    }: {
        isLoading: boolean;
        formik: any
    }
) {

    const {
        primaryColor
    } = useCustomTheme()

    const query = useSearchParams();
    const id = query?.get('id');

    const router = useRouter()

    const clickHandler = () => {

        if (!formik.values.location.toBeAnnounced && !formik.values.location.locationDetails && !formik.values.location.link) {
            toaster.create({
                title: `Add Location`,
                type: "error",
                closable: true
            })
        } else {
            formik.handleSubmit()
        }
    }

    console.log(formik.values);


    return (
        <Flex w={"full"} h={"full"} flexDir={"column"} gap={"4"} >
            <Flex w={"full"} flexDir={"column"} >
                <Text fontSize={"20px"} fontWeight={"semibold"} >Tell us where this event will be hosting</Text>
                <Text fontSize={"14px"} mb={"2"} >This section highlights details that should attract attendees to your event</Text>
            </Flex>
            <CustomEventSwitch title="To Be Announced" setValue={formik.setFieldValue} value={formik.values.location.toBeAnnounced} name="location.toBeAnnounced" />
            {!formik.values.location.toBeAnnounced && (
                <SelectLocationType value={formik.values.locationType} setValue={formik.setFieldValue} />
            )}
            {((formik.values.locationType === "physical" || formik.values.locationType === "hybrid") && !formik.values.location.toBeAnnounced) && (
                <SelectMapLocation value={formik.values.location.locationDetails} setValue={formik.setFieldValue} latlng={formik.values.location.latlng} />
            )}
            {((formik.values.locationType === "online" || formik.values.locationType === "hybrid") && !formik.values.location.toBeAnnounced) && (
                <CustomInput name={"location.link"} errors={formik?.errors} touched={formik?.touched} setValue={formik.setFieldValue} label="Enter Online Url" value={formik.values} />
            )}
            <CustomInput defaultData={formik.values?.location?.address} name={"location.address"} textarea={true} errors={formik?.errors?.location?.address} touched={formik?.touched?.location?.address} setValue={formik.setFieldValue} label="Event Address" value={formik.values} />

            <CustomEventSwitch title="Do you wish to accept PR requests for your event?" setValue={formik.setFieldValue} value={formik.values.affiliates ? formik.values.affiliates[0].affiliateType === "pr" ? true : false : false} name="affiliates[0].affiliateType" />
            {formik.values.affiliates && (
                <> 
                    {formik.values.affiliates[0].affiliateType === "pr" && (
                        <CustomInput type="number" name={"affiliates[0].percent"} errors={formik?.errors} touched={formik?.touched} setValue={formik.setFieldValue} label="Add Percentage" value={formik.values} />
                    )}
                </>
            )}

            <Flex justifyContent={"end"} py={"6"} gap={"3"} mt={"auto"} >
                <CustomButton onClick={() => router.back()} text={"Back"} borderColor={primaryColor} backgroundColor={"white"} color={primaryColor} maxW={"250px"} borderRadius={"999px"} />
                <CustomButton isLoading={isLoading} onClick={clickHandler} text={"Save and continue"} maxW={"250px"} borderRadius={"999px"} />
            </Flex>
        </Flex>
    )
}