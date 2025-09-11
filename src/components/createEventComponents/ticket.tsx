"use client"
import { Flex, Text } from "@chakra-ui/react";
import { CustomButton, CustomInput, TicketFormInput } from "../shared";
import NumberPicker from "./ticket/numberPicker";
import useCustomTheme from "@/hooks/useTheme";
import { useState } from "react";
import FunnelBtn from "./communityFunnel/funnelBtn";
import GetCommunity from "./communityFunnel/getCommunityFunnel";
import CollaboratorBtn from "../shared/addCollaborator";
import { usePathname, useRouter } from "next/navigation";
import EarlyBirdBtn from "./ticket/earlyBirdBtn";
import { IEventType } from "@/helpers/models/event";
import { FormikProvider } from "formik";

export default function Ticket(
    {
        formik,
        isLoading,
        eventData
    }: {
        isLoading: boolean;
        formik: any,
        eventData?: IEventType
    }
) {

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

    const pathname = usePathname()
    const handleAddTicket = () => {

        let clone = [...formik.values.productTypeData, {
            totalNumberOfTickets: '',
            ticketPrice: tab ? 0 : "",
            ticketType: '',
            minTicketBuy: 1,
            maxTicketBuy: 1,
            isFree: tab
        }]

        formik.setFieldValue('productTypeData', clone);

    };

    const handleRemoveTicket = (index: number) => {
        const newList = [...formik.values.productTypeData];
        newList.splice(index, 1);
        formik.setFieldValue('productTypeData', newList);
    };

    const clickHandler = () => {
        formik.handleSubmit()
    }

    const router = useRouter()

    const length = eventData?.productTypeData?.length ?? 0

    const tabHandler = (item: string) => {
        if (item === "free") {
            formik.setFieldValue('productTypeData', [
                {
                    totalNumberOfTickets: '',
                    ticketPrice: 0,
                    ticketType: 'Free',
                    minTicketBuy: 1,
                    maxTicketBuy: 1,
                    isFree: true
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
                    maxTicketBuy: 1,
                    isFree: false
                },
            ]);
            setTab(false)
        }
    }

    const checkticketSold = (index: number) => {
        return eventData?.productTypeData[index]?.ticketsSold ?? 0
    }

    console.log(formik);



    return (
            <Flex w={"full"} h={"full"} flexDir={"column"} gap={"4"} px={"4"} >
                <Flex w={"full"} flexDir={"column"} >
                    <Text fontSize={["18px", "18px", "20px"]} fontWeight={"semibold"} >Set your ticket Prices and customize it</Text>
                    <Text fontSize={"14px"} mb={"2"} >Effortlessly invite Attendees with Ticket Generation</Text>
                </Flex>
                <Flex w={"full"} rounded={"full"} bgColor={mainBackgroundColor} p={"2"} borderWidth={"1px"} borderColor={borderColor} >
                    <CustomButton disable={eventData?.ticketBought} onClick={() => tabHandler("ticket")} width={"50%"} height={"40px"} text={"Paid"} backgroundColor={tab ? mainBackgroundColor : secondaryBackgroundColor} color={tab ? headerTextColor : primaryColor} borderRadius={"999px"} />
                    <CustomButton disable={eventData?.ticketBought} onClick={() => tabHandler("free")} width={"50%"} height={"40px"} text={"Free"} backgroundColor={!tab ? mainBackgroundColor : secondaryBackgroundColor} color={!tab ? headerTextColor : primaryColor} borderRadius={"999px"} />
                </Flex>
                {!tab && (
                    <EarlyBirdBtn eventData={eventData} value={formik.values} setValue={formik.setFieldValue} />
                )}
                <Text fontSize={"14px"} fontWeight={"medium"} >Other Ticket Types</Text>
                {formik.values?.productTypeData?.map((ticket: any, index: number) => {
                    if (ticket.ticketType !== "Early Bird") {
                        return (
                            <Flex key={index} w={"full"} flexDir={"column"} gap={"4"} >
                                <Flex w={"full"} flexDir={"column"} rounded={"2xl"} gap={"4"} borderWidth={"1px"} p={"4"} >
                                    <Flex w={"full"} gap={"3"} flexDir={["column", "column", "row"]}  >
                                        <TicketFormInput
                                            disabled={eventData?.ticketBought && length >= index+1 && !pathname.includes("draft")} 
                                            key={index}
                                            name={`productTypeData[${index}].ticketType`}
                                            label="Ticket Type"
                                            placeholder="Enter ticket type"
                                        />
                                        <TicketFormInput disabled={ticket.isFree} type="number" name={`productTypeData[${index}].ticketPrice`} label="Enter Price" />
                                    </Flex>
                                    <TicketFormInput type="number" name={`productTypeData[${index}].totalNumberOfTickets`} label="Total number of tickets available to be sold for your events" />
                                    <Flex flexDir={"column"} gap={"0.5"} >
                                        <Text fontSize={"14px"} fontWeight={"medium"} >Indicate the maximum number of tickets each user can purchase for your event</Text>
                                        <NumberPicker value={ticket.maxTicketBuy} name={`productTypeData[${index}].maxTicketBuy`} setValue={formik.setFieldValue} />
                                    </Flex>
                                </Flex>
                                {(formik.values.productTypeData.length > 1 && checkticketSold(index) <= 0) && (
                                    <CustomButton ml={"auto"} onClick={() => handleRemoveTicket(index)} text={"Remove ticket type"} maxW={"200px"} color={"red"} backgroundColor={secondaryBackgroundColor} borderRadius={"999px"} fontSize={"14px"} />
                                )}
                            </Flex>
                        )
                    }
                })}
                {/* {(!eventData?.ticketBought) && ( */}
                <CustomButton onClick={handleAddTicket} text={"Add new ticket type"} maxW={"200px"} color={primaryColor} backgroundColor={secondaryBackgroundColor} borderRadius={"999px"} fontSize={"14px"} />
                {/* )} */}

                <CustomInput disabled={true} name={`currency`} label="Currency" />
                <GetCommunity value={formik.values.eventFunnelGroupID} setValue={formik.setFieldValue} />
                <Flex w={"full"} flexDir={["column", "column", "row"]} gap={"3"} justifyContent={"space-between"} >
                    <FunnelBtn setValue={formik?.setFieldValue} value={formik.values.eventFunnelGroupID} />
                    <CollaboratorBtn value={formik.values} setValue={formik.setFieldValue} btn={true} addCollaborator={true} />
                </Flex>
                <Flex justifyContent={"end"} py={"6"} flexDir={["column", "column", "row"]} gap={"3"} mt={"auto"} >
                    <CustomButton onClick={() => router.back()} text={"Back"} borderColor={primaryColor} backgroundColor={mainBackgroundColor} color={primaryColor} maxW={["full", "full", "250px"]} borderRadius={"999px"} />
                    <CustomButton isLoading={isLoading} onClick={clickHandler} text={"Submit"} maxW={["full", "full", "250px"]} borderRadius={"999px"} />
                </Flex>
            </Flex> 
    )
}