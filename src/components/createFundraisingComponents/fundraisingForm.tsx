"use client"
import { Flex, Text } from "@chakra-ui/react";
import { CustomInput, ImagePicker } from "../shared";
import useFundraising from "@/hooks/useFundraising"; 
import CustomEventSwitch from "../createEventComponents/theme/customEventSwitch";

export default function FundraisingForm() {

    const { formik } = useFundraising()

    const onSwitchHandler = (name: string, value: any)=> {
        formik.setFieldValue(name, value ? "PRIVATE" : "PUBLIC")
    }

    console.log(formik.values);
    

    return (
        <Flex w={"full"} flexDir={"column"} alignItems={"center"} >
            <Flex maxW={"569px"} w={"full"} flexDir={"column"} gap={"6"}  >
                {formik.values.data.map((item, index) => {
                    return ( 
                        <Flex w={"full"} flexDirection={"column"} gap={"4"} px={"4"} >
                            <Flex w={"full"} flexDir={"column"} >
                                <Text fontSize={["18px", "18px", "20px"]} fontWeight={"semibold"} >Add image and Videos</Text>
                                <Text fontSize={"14px"} mb={"2"} >Add clear images that show your event information with a good background</Text>
                                <ImagePicker preview={item.bannerImage ? [item.bannerImage] : []} setValue={formik.setFieldValue} />
                            </Flex>
                            <CustomInput name={`data[${index+""}].name`} errors={formik?.errors} touched={formik?.touched} setValue={formik.setFieldValue} label="Fund raising Title" value={item.name} />
                            <CustomEventSwitch title="Show" label="Fund raising Visibility" setValue={onSwitchHandler} value={item.visibility === "PUBLIC" ? false : true} name={`data[${index+""}].visibility`} />
                            <Flex w={"full"} gap={"3"} >
                                <CustomInput type="number" name={`data[${index+""}].goal`} errors={formik?.errors} touched={formik?.touched} setValue={formik.setFieldValue} label="Donations Target" value={item.goal} />
                                <CustomInput name={`data[${index+""}].purpose`} errors={formik?.errors} touched={formik?.touched} setValue={formik.setFieldValue} label="Purpose for Donation" value={item.purpose} />
                            </Flex>
                            <CustomInput name={`data[${index+""}].description`} errors={formik?.errors} touched={formik?.touched} setValue={formik.setFieldValue} textarea={true} label="Fund Raising  Description" value={item.description} />
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}