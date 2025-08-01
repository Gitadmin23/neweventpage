"use client"
import { Flex, Text } from "@chakra-ui/react";
import { CustomButton, CustomDatePicker, CustomInput, ImagePicker, TicketFormInput } from "../shared";
import useFundraising from "@/hooks/useFundraising";
import CustomEventSwitch from "../createEventComponents/theme/customEventSwitch";
import { useDetails } from "@/helpers/store/useUserDetails";
import useCustomTheme from "@/hooks/useTheme";
import { SuccessModalFundraising } from ".";
import { usePathname } from "next/navigation";
import DonationCollaborator from "./donationCollaborator";

export default function FundraisingForm() {

    const { formik, uploadImage, createFundraising, createFundraisingGroup, updateFundraising, open, setOpen } = useFundraising()
    // const { userId } = useDetails((state) => state)

    // const {
    //     secondaryBackgroundColor
    // } = useCustomTheme()

    const onSwitchHandler = (name: string, value: any) => {
        formik.setFieldValue(name, value ? "PRIVATE" : "PUBLIC")
    }

    // const clickHandler = () => {

    //     let clone = [...formik.values.data, {
    //         "visibility": "PUBLIC",
    //         creatorID: userId,
    //         name: "",
    //         bannerImage: "",
    //         description: "",
    //         endDate: "",
    //         goal: "",
    //         purpose: "",
    //         collaborators: []
    //     }]

    //     formik.setFieldValue('data', clone);
    // }

    // const handleRemove = (index: number) => {
    //     const newList = [...formik.values.data];
    //     newList.splice(index, 1);
    //     formik.setFieldValue('data', newList);
    // };

    // const pathname = usePathname()

    return (
        <Flex w={"full"} flexDir={"column"} alignItems={"center"} >
            <Flex maxW={"569px"} w={"full"} flexDir={"column"} gap={"6"} py={"6"} >
                {formik.values.data.map((item, index) => {
                    return (
                        <Flex key={index} w={"full"} flexDirection={"column"} gap={"4"} px={"4"} >
                            <Flex w={"full"} flexDir={"column"} >
                                <Text fontSize={["18px", "18px", "20px"]} fontWeight={"semibold"} >Fundraising Cover Photo</Text>
                                <Text fontSize={"14px"} mb={"2"} >Add photos / posters that describes details of your Fundraising</Text>
                                <ImagePicker index={index} single preview={item.bannerImage ? [item.bannerImage] : []} setValue={formik.setFieldValue} />
                            </Flex>
                            <TicketFormInput index={index} value={item.name} name={`name`} errors={formik?.errors.data} touched={formik?.touched} setValue={formik.setFieldValue} label="Fund raising Title" notticket={true} />
                            <CustomEventSwitch title="Show" errors={formik?.errors?.data} label="Fund raising Visibility" setValue={onSwitchHandler} value={item.visibility === "PUBLIC" ? false : true} name={`data[${index + ""}].visibility`} />
                            <Flex w={"full"} gap={"3"} >
                                <TicketFormInput type="number" index={index} value={item.goal} name={`goal`} errors={formik?.errors.data} touched={formik?.touched} setValue={formik.setFieldValue} label="Donations Target" notticket={true} />
                                <TicketFormInput index={index} value={item.purpose} name={`purpose`} errors={formik?.errors.data} touched={formik?.touched} setValue={formik.setFieldValue} label="Purpose for Donation" notticket={true} />
                            </Flex>
                            <CustomDatePicker index={index} label="End Date" name={[`data[${index + ""}].endDate`]} value={item?.endDate} errors={formik?.errors.data} setValue={formik.setFieldValue} />
                            <TicketFormInput textarea={true} index={index} value={item.description} name={`description`} errors={formik?.errors.data} touched={formik?.touched} setValue={formik.setFieldValue} label="Fund Raising Description" notticket={true} />
                            {/* {formik.values.data.length > 1 && (
                                <CustomButton ml={"auto"} onClick={() => handleRemove(index)} text={"Remove ticket type"} maxW={"200px"} color={"red"} backgroundColor={secondaryBackgroundColor} borderRadius={"999px"} fontSize={"14px"} />
                            )} */}

                            {/* {!pathname?.includes("edit") && ( */}
                                <Flex flexDir={["column", "column", "row"]} justifyContent={"space-between"} mt={"5"} gap={["4", "4", "4"]} >
                                    <DonationCollaborator btn={true} index={index} />
                                </Flex>
                            {/* )} */}
                        </Flex>
                    )
                })}
                {/* <CustomButton onClick={clickHandler} text={"Add New Fundraising"} color={"#5465E0"} backgroundColor={"#EFF1FE"} px={"6"} width={"fit-content"} borderRadius={"999px"} /> */}

                <CustomButton isLoading={uploadImage?.isPending || createFundraising?.isPending || createFundraisingGroup?.isPending || updateFundraising?.isPending} onClick={() => formik.handleSubmit()} text={"Submit"} ml={"auto"} px={"6"} width={"full"} maxW={"200px"} borderRadius={"999px"} />
            </Flex>
            <SuccessModalFundraising open={open} setOpen={setOpen} />
        </Flex>
    )
}