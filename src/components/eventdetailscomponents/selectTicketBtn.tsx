import { Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { CustomButton, ModalLayout, ProductImageScroller } from "../shared";
import React, { useEffect, useState } from "react";
import { IEventType, IProductTypeData } from "@/helpers/models/event";
import { IMAGE_URL, URLS } from "@/helpers/services/urls";
import { dateFormat } from "@/helpers/utils/dateFormat";
import { formatNumberWithK, numberFormat, numberFormatNaire } from "@/helpers/utils/formatNumberWithK";
import { LuMinus, LuPlus } from "react-icons/lu";
import useCustomTheme from "@/hooks/useTheme";
import useModalStore from "@/helpers/store/useModalSwitch";
import usePaystackStore from "@/helpers/store/usePaystack";
import { useMutation } from "@tanstack/react-query";
import httpService from "@/helpers/services/httpService";
import { toaster } from "../ui/toaster";
import usePayStack from "@/hooks/usePayStack";

interface ITicket {
    "ticketType": string,
    "numberOfTickets": number
}


export default function SelectTicketBtn(
    {
        picUrls,
        eventName,
        startDate,
        productTypeData,
        id,
        affiliateID
    }: IEventType
) {


    // const { setShowModal, showModal } = useModalStore((state) => state);
    // const [open, setOpen] = useState(false)

    const { payForTicket, setOpen, open } = usePayStack()

    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

    const {
        secondaryBackgroundColor,
        headerTextColor,
        primaryColor
    } = useCustomTheme()

    const [selectTicketType, setSelectTicketType] = useState<Array<ITicket>>([])

    const checkType = (type: string) => {
        const index = selectTicketType.findIndex(ticket => ticket.ticketType === type);

        return index
    }

    const checkTicketTotal = () => {
        let totalNumber = 0

        productTypeData.map((item) => {
            totalNumber = Number(item.totalNumberOfTickets) + totalNumber
        })
        return totalNumber
    }



    const checkSelectedTicketTotal = () => {

        let totalNumber = 0

        selectTicketType.map((item) => { 
            totalNumber =( Number(productTypeData[checkType(item.ticketType)]?.ticketPrice) * item.numberOfTickets) + totalNumber
        })

        return totalNumber
    }

    const clickHandler = ({ item, type }: { item: IProductTypeData, type: "increase" | "reduce" }) => {


        let clone = [...selectTicketType]

        const index = checkType(item.ticketType);

        if (selectTicketType?.length > 0) {
            if (index > -1) {
                if (type === "increase") {
                    clone[index] = {
                        ticketType: item.ticketType,
                        numberOfTickets: clone[index].numberOfTickets + 1
                    }
                } else {
                    if (clone[index].numberOfTickets - 1 === 0) {
                        clone = clone.filter(ticket => ticket.ticketType !== item.ticketType)
                    } else if (clone[index].numberOfTickets > 0) {
                        clone[index] = {
                            ticketType: item.ticketType,
                            numberOfTickets: clone[index].numberOfTickets - 1
                        }
                    }
                }
            } else {
                clone.push({
                    ticketType: item.ticketType,
                    numberOfTickets: 1
                })
            }

        } else {
            if (type === "increase") {
                clone.push({
                    ticketType: item.ticketType,
                    numberOfTickets: 1
                })
            }

        }
        setSelectTicketType(clone)
    }


    const { setPaystackConfig, message, setMessage } = usePaystackStore((state) => state);
    // const query = useSearchParams();
    // const type = query?.get('type');

    useEffect(() => {
        setSelectTicketType([] as any)
    }, [open])

    // const payForTicket = useMutation({
    //     mutationFn: (data: any) => httpService.post("/events/create-multi-ticket", data),
    //     onSuccess: (data: any) => {

    //         setPaystackConfig({
    //             publicKey: PAYSTACK_KEY,
    //             email: data?.data?.content?.email,
    //             amount: (Number(data?.data?.content?.orderTotal) * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    //             reference: data?.data?.content?.orderCode
    //         });
    //         setShowModal(false)
    //     },
    //     onError: () => { 
    //         toaster.create({
    //             title: "Error Creating Ticket",
    //             type: "error",
    //             closable: true
    //         })

    //         setMessage({ ...message, event: true })
    //     },
    // });

    const submitHandler = React.useCallback(() => {
        payForTicket.mutate(
            {
                "eventID": id,
                "ticketBuyObjectList": selectTicketType,
            }
        )
    }, [payForTicket])

    return (
        <Flex w={"full"} gap={"2"} flexDir={"column"} >
            <Text fontWeight={"500"} >See ticket available for this event</Text>
            <CustomButton onClick={() => setOpen(true)} borderRadius={"999px"} fontSize={"14px"} text={"Select Ticket here"} />

            <ModalLayout size="xl" closeBtn={true} open={open} close={() => setOpen(false)} trigger={true} >
                <Flex w={"full"} h={"70vh"} justifyContent={"center"} alignItems={"center"} >
                    <Flex p={"5"} h={"full"} borderWidth={"1px"} rounded={"2xl"} gap={"4"} w={"full"} maxW={"1032px"} >
                        <Flex flexDir={"column"} alignItems={"center"} gap={"7"} px={"3"} w={"full"} >
                            <Flex flexDirection={"column"} textAlign={"center"} w={"full"} pb={"2"} borderBottomWidth={"1px"} gap={"1"} >
                                <Text fontWeight={"700"} fontSize={"25px"} >{eventName}</Text>
                                <Text fontSize={"14px"} >{dateFormat(startDate)}</Text>
                            </Flex>
                            <Flex flexDir={"column"} w={"full"} gap={"3"} >
                                {productTypeData?.map((item, index) => {
                                    return (
                                        <Flex _hover={{ borderColor: primaryColor }} key={index} w={"full"} borderWidth={"1px"} justifyContent={"space-between"} alignItems={"center"} rounded={"8px"} px={"4"} height={"110px"} >
                                            <Flex flexDir={"column"} gap={"2"} >
                                                <Text fontWeight={"semibold"} >{item.ticketType} {formatNumberWithK(item?.ticketPrice, false)}</Text>
                                                {item.ticketType === "Early Bird" && (
                                                    <Flex bgColor={"#FFEDDF"} h={"21px"} color={"#FF0000"} rounded={"full"} px={"4"} >
                                                        Sales ends on {dateFormat(item.endDate)}
                                                    </Flex>
                                                )}
                                            </Flex>
                                            <Flex gap={"3"} alignItems={"center"} >
                                                <IconButton onClick={() => clickHandler({
                                                    item: item,
                                                    type: "reduce"
                                                })} bgColor={secondaryBackgroundColor} color={headerTextColor} rounded={"full"} size="sm">
                                                    {/* <LuMinus /> */}
                                                    <Text fontWeight={"500"} fontSize={"25px"} >-</Text>
                                                </IconButton>
                                                {selectTicketType[checkType(item.ticketType)]?.numberOfTickets ?? "0"}
                                                <IconButton onClick={() => clickHandler({
                                                    item: item,
                                                    type: "increase"
                                                })} bgColor={secondaryBackgroundColor} color={headerTextColor} rounded={"full"} size="sm">
                                                    {/* <LuPlus /> */}

                                                    <Text fontWeight={"500"} fontSize={"25px"} >+</Text>
                                                </IconButton>
                                            </Flex>
                                        </Flex>
                                    )
                                })}
                            </Flex>
                            <Text fontWeight={"medium"} mr={"auto"} >Powered by <span style={{ color: primaryColor, fontStyle: "italic" }} >Chasescroll.com</span></Text>
                            <Flex w={"full"} justifyContent={"end"} pt={"4"} borderTopWidth={"1px"} mt={"auto"} >
                                <CustomButton height={"35px"} fontSize={"14px"} loading={payForTicket.isPending} onClick={submitHandler} disable={selectTicketType.length > 0 ? false : true} width={"fit-content"} text={"Get Ticket"} px={"6"} borderRadius={"999px"} />
                            </Flex>
                        </Flex>
                        <Flex bgColor={secondaryBackgroundColor} rounded={"8px"} w={"fit-content"} flexDir={"column"} gap={"4"} >
                            <Flex w={"350px"} >
                                <ProductImageScroller objectFit={"cover"} images={picUrls} height={"200px"} />
                            </Flex>
                            <Flex textAlign={"center"} flexDir={"column"} pb={"3"} borderBottomWidth={"1px"} >
                                <Text fontWeight={"600"} fontSize={"18px"} >{checkTicketTotal()}</Text>
                                <Text>Ticket Available for this Event</Text>
                            </Flex>
                            {selectTicketType.length > 0 && (
                                <Flex h={"full"} px={"3"} pb={"4"} textAlign={"left"} flexDir={"column"} gap={"4"} >
                                    <Text fontWeight={"500"} fontSize={"18px"} >Order summary</Text>
                                    {selectTicketType?.map((item, index) => {
                                        return (
                                            <Flex key={index} w={"full"} fontWeight={"500"} justifyContent={"space-between"} alignItems={"center"} >
                                                <Text>{item.numberOfTickets} x {item.ticketType}</Text>
                                                <Text>{numberFormatNaire(productTypeData[checkType(item.ticketType)]?.ticketPrice ?? 0)}</Text>
                                            </Flex>
                                        )
                                    })}
                                    <Flex mt={"auto"} w={"full"} fontWeight={"500"} justifyContent={"space-between"} alignItems={"center"} >
                                        <Text fontSize={"lg"} fontWeight={"600"} >Total</Text>
                                        <Text fontSize={"lg"} fontWeight={"600"} >{numberFormatNaire(checkSelectedTicketTotal())}</Text>
                                    </Flex>
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}