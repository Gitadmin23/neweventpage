"use client"
import { Flex, Text } from "@chakra-ui/react";
import { CustomButton, CustomDatePicker, ImagePicker, LoadingAnimation, TicketFormInput } from "../shared";
import useFundraising from "@/hooks/useFundraising";
import CustomEventSwitch from "../createEventComponents/theme/customEventSwitch"; 
import { SuccessModalFundraising } from ".";
import { useEffect } from "react";
import httpService from "@/helpers/services/httpService"; 
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query"; 

export default function FundraisingFormEdit() {

    const query = useSearchParams(); 
    const id = query?.get('id');
    const { formik, uploadImage, createFundraising, createFundraisingGroup, updateFundraising, open, setOpen } = useFundraising() 

    const onSwitchHandler = (name: string, value: any) => {
        formik.setFieldValue(name, value ? "PRIVATE" : "PUBLIC")
    }  

    const { mutate: fetchData, isPending: isLoading } = useMutation({
        mutationKey: ['single-donation', id],
        mutationFn: () =>
            httpService.get(`/fund-raiser/single/${id}`),
        onSuccess: (data: any) => {
            try {

                formik.setValues({
                    data: [
                        {
                            "visibility": data?.data?.visibility,
                            creatorID: data?.data?.createdBy?.userId,
                            name: data?.data?.name,
                            bannerImage: data?.data?.bannerImage,
                            description: data?.data?.description,
                            endDate: data?.data?.endDate,
                            goal: data?.data?.goal,
                            purpose: data?.data?.purpose,
                        }
                    ]
                })
            } catch (e) {
                console.error('Error in onSuccess handler:', e);
            }
        },
    });

    useEffect(() => {
        fetchData();
    }, [])

    console.log(formik?.values);
    

    return (
        <LoadingAnimation loading={isLoading} > 
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
                                <TicketFormInput index={index} defaultData={item.name} value={item.name} name={`name`} errors={formik?.errors.data} touched={formik?.touched} setValue={formik.setFieldValue} label="Fund raising Title" notticket={true} />
                                <CustomEventSwitch title="Show" errors={formik?.errors?.data} label="Fund raising Visibility" setValue={onSwitchHandler} value={item.visibility === "PUBLIC" ? false : true} name={`data[${index + ""}].visibility`} />
                                <Flex w={"full"} gap={"3"} >
                                    <TicketFormInput type="number"  defaultData={item.goal} index={index} value={item.goal} name={`goal`} errors={formik?.errors.data} touched={formik?.touched} setValue={formik.setFieldValue} label="Donations Target" notticket={true} />
                                    <TicketFormInput index={index}  defaultData={item.purpose} value={item.purpose} name={`purpose`} errors={formik?.errors.data} touched={formik?.touched} setValue={formik.setFieldValue} label="Purpose for Donation" notticket={true} />
                                </Flex>
                                <CustomDatePicker index={index} label="End Date" name={[`data[${index + ""}].endDate`]} value={item?.endDate} errors={formik?.errors.data} setValue={formik.setFieldValue} />
                                <TicketFormInput textarea={true} defaultData={item.description} index={index} value={item.description} name={`description`} errors={formik?.errors.data} touched={formik?.touched} setValue={formik.setFieldValue} label="Fund Raising Description" notticket={true} />
                            </Flex>
                        )
                    })}
                    {/* <CustomButton onClick={clickHandler} text={"Add New Fundraising"} color={"#5465E0"} backgroundColor={"#EFF1FE"} px={"6"} width={"fit-content"} borderRadius={"999px"} /> */}

                    <CustomButton isLoading={uploadImage?.isPending || createFundraising?.isPending || createFundraisingGroup?.isPending || updateFundraising?.isPending} onClick={() => formik.handleSubmit()} text={"Submit"} ml={"auto"} px={"6"} width={"full"} maxW={"200px"} borderRadius={"999px"} />
                </Flex>
                <SuccessModalFundraising open={open} setOpen={setOpen} />
            </Flex>
        </LoadingAnimation>
    )
}