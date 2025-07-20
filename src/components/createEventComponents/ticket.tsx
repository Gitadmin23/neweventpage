"use client"
import useEvent from "@/hooks/useEvent";
import { Flex, Text } from "@chakra-ui/react";
import { CustomButton, CustomInput, TicketFormInput } from "../shared";
import NumberPicker from "./ticket/numberPicker";
import useCustomTheme from "@/hooks/useTheme";
import { useState } from "react";
import FunnelBtn from "./communityFunnel/funnelBtn";
import GetCommunity from "./communityFunnel/getCommunityFunnel";
import CollaboratorBtn from "../shared/addCollaborator";
import { useRouter, useSearchParams } from "next/navigation";

export default function Ticket(
    {
        formik,
        isLoading
    } : {
        isLoading: boolean;
        formik: any
    }
) {

    console.log(formik.values);
    // const { formik, createEventFromDraft, uploadImage } = useEvent()

    const {
        secondaryBackgroundColor,
        primaryColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme()

    const [tab, setTab] = useState(false)
    // const query = useSearchParams(); 
    // const id = query?.get('id');

    const handleAddTicket = () => {
        formik.setFieldValue('productTypeData', [
            ...formik.values.productTypeData,
            {
                totalNumberOfTickets: '',
                ticketPrice: '',
                ticketType: '',
                minTicketBuy: 1,
                maxTicketBuy: 1,
            },
        ]);
    };

    const handleRemoveTicket = (index: number) => {
        const newList = [...formik.values.productTypeData];
        newList.splice(index, 1);
        formik.setFieldValue('productTypeData', newList);
    };

    // console.log(formik.errors);
    const clickHandler = () => {
        formik.handleSubmit()
    }

    const router = useRouter()
    

    const tabHandler = (item: string) => {
        if (item === "free") {
            formik.setFieldValue('productTypeData', [
                {
                    totalNumberOfTickets: '',
                    ticketPrice: 0,
                    ticketType: 'Free',
                    minTicketBuy: 1,
                    maxTicketBuy: 1,
                },
            ]);
            setTab(true)
        } else {
            formik.setFieldValue('productTypeData', [
                {
                    totalNumberOfTickets: null,
                    ticketPrice: null,
                    ticketType: '',
                    minTicketBuy: 1,
                    maxTicketBuy: "1",
                },
            ]);
            setTab(false)
        }
    }

    return (
        <Flex w={"full"} h={"full"} flexDir={"column"} gap={"4"} >
            <Flex w={"full"} flexDir={"column"} >
                <Text fontSize={"20px"} fontWeight={"semibold"} >Set your ticket Prices and customize it</Text>
                <Text fontSize={"14px"} mb={"2"} >Effortlessly invite Attendees with Ticket Generation</Text>
            </Flex>
            <Flex w={"full"} rounded={"full"} bgColor={mainBackgroundColor} p={"3"} borderWidth={"1px"} borderColor={borderColor} >
                <CustomButton onClick={()=> tabHandler("ticket")} width={"50%"} text={"Paid"} backgroundColor={tab ? mainBackgroundColor : secondaryBackgroundColor} color={tab ? headerTextColor : primaryColor} borderRadius={"999px"} />
                <CustomButton onClick={()=> tabHandler("free")} width={"50%"} text={"Free"} backgroundColor={!tab ? mainBackgroundColor : secondaryBackgroundColor} color={!tab ? headerTextColor : primaryColor} borderRadius={"999px"} />
            </Flex>
            <Text fontSize={"14px"} fontWeight={"medium"} >Other Ticket Types</Text>

            {formik.values.productTypeData.map((ticket: any, index: number) => (
                <Flex key={index} w={"full"} flexDir={"column"} gap={"4"} >
                    <Flex w={"full"} flexDir={"column"} rounded={"2xl"} gap={"4"} borderWidth={"1px"} p={"4"} >
                        <Flex w={"full"} gap={"3"} >
                            <TicketFormInput disabled={ticket.ticketType === "Free"} index={index} defaultData={ticket.ticketType} name={`ticketType`} errors={formik?.errors.productTypeData} touched={formik?.touched} setValue={formik.setFieldValue} label="Enter Ticket Name" value={formik.values} />
                            <TicketFormInput disabled={ticket.ticketType === "Free"} index={index} defaultData={ticket.ticketPrice} type="number" name={`ticketPrice`} errors={formik?.errors.productTypeData} touched={formik?.touched} setValue={formik.setFieldValue} label="Enter Price" value={formik.values} />
                        </Flex>
                        <TicketFormInput index={index} defaultData={ticket.totalNumberOfTickets} type="number" name={`totalNumberOfTickets`} errors={formik?.errors.productTypeData} touched={formik?.touched} setValue={formik.setFieldValue} label="Total number of tickets available to be sold for your events" value={formik.values} />
                        <Flex flexDir={"column"} gap={"0.5"} >
                            <Text fontSize={"14px"} fontWeight={"medium"} >Indicate the maximum number of tickets each user can purchase for your event</Text>
                            <NumberPicker value={formik.values.productTypeData[index].maxTicketBuy} name={`maxTicketBuy`} setValue={formik.setFieldValue} />
                        </Flex>
                    </Flex>
                    {formik.values.productTypeData.length > 1 && (
                        <CustomButton ml={"auto"} onClick={() => handleRemoveTicket(index)} text={"Remove ticket type"} maxW={"200px"} color={"red"} backgroundColor={secondaryBackgroundColor} borderRadius={"999px"} fontSize={"14px"} />
                    )}
                </Flex>
            ))}
            <CustomButton onClick={handleAddTicket} text={"Add new ticket type"} maxW={"200px"} color={primaryColor} backgroundColor={secondaryBackgroundColor} borderRadius={"999px"} fontSize={"14px"} />

            <CustomInput disabled={true} name={`currency`} errors={formik?.errors} touched={formik?.touched} setValue={formik.setFieldValue} label="Currency" value={formik.values} />
            <GetCommunity value={formik.values.eventFunnelGroupID} setValue={formik.setFieldValue} />
            <Flex w={"full"} justifyContent={"space-between"} >
                <FunnelBtn setValue={formik?.setFieldValue} value={formik.values.eventFunnelGroupID} />

                <CollaboratorBtn value={formik.values} setValue={formik.setFieldValue} btn={true} addCollaborator={true} />
            </Flex>
            <Flex justifyContent={"end"} py={"6"} gap={"3"} mt={"auto"} >
                <CustomButton onClick={()=> router.back()} text={"Back"} borderColor={primaryColor} backgroundColor={"white"} color={primaryColor} maxW={"250px"} borderRadius={"999px"} />
                <CustomButton isLoading={isLoading} onClick={clickHandler} text={"Submit"} maxW={"250px"} borderRadius={"999px"} />
            </Flex>
        </Flex>
    )
}