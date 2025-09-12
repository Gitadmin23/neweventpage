import { CustomButton, CustomDatePicker, ModalLayout, TicketFormInput } from "@/components/shared";
import useCustomTheme from "@/hooks/useTheme";
import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IoLogoTwitter } from "react-icons/io5";
import { PiTrashSimpleDuotone } from "react-icons/pi";
import NumberPicker from "./numberPicker";
import { toaster } from "@/components/ui/toaster";
import { IEventType } from "@/helpers/models/event";

export default function EarlyBirdBtn(
    {
        value,
        setValue,
        eventData
    }: {
        value: any,
        setValue: (name: string, value: any) => void,
        eventData?: IEventType
    }
) {

    const [open, setOpen] = useState(false)

    const clickHandler = () => {
        if (value.productTypeData[0].ticketType !== "Early Bird") {
            const clone = [...value.productTypeData]
            const ticket = {
                totalNumberOfTickets: "",
                ticketPrice: null,
                ticketType: "Early Bird",
                minTicketBuy: 1,
                maxTicketBuy: 1,
                startTime: "",
                endTime: "",
                startDate: "",
                endDate: "",
                isFree: false
            }
            clone.unshift(ticket)
            setValue("productTypeData", clone)
        }
        setOpen(true)
    }

    const removeHandler = () => {
        if(!eventData?.ticketBought) {
            const clone = [...value.productTypeData]
    
            clone?.shift()
    
            setValue("productTypeData", clone)
        }
        setOpen(false)
    }

    const {
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()

    const closeHandler = () => {
        if(value?.productTypeData[0]?.ticketType === "Early Bird") {
            if(!value?.productTypeData[0]?.ticketPrice) { 
                toaster.create({
                    title: "Add Ticket Price",
                    type: "error",
                    closable: true
                })
            } else if(!value?.productTypeData[0]?.totalNumberOfTickets){
                toaster.create({
                    title: "Add Total Number Of Ticket",
                    type: "error",
                    closable: true
                })
            } else if(!value?.productTypeData[0]?.startDate){
                toaster.create({
                    title: "Add Ticket Start Date",
                    type: "error",
                    closable: true
                })
            } else if(!value?.productTypeData[0]?.endDate){
                toaster.create({
                    title: "Add Ticket End Date",
                    type: "error",
                    closable: true
                })
            } else {
                setOpen(false)
            }
        }
    }

    return (
        <Flex>
            <Flex gap={"1"}  >
                <Flex cursor={"pointer"} _disabled={{ opacity: "0.2", cursor: "not-allowed" }} onClick={() => clickHandler()} alignItems={"center"} gap={"1"} px="6" h={"45px"} rounded={"full"} bgColor={value?.productTypeData[0]?.ticketType === "Early Bird" ? primaryColor : mainBackgroundColor} borderColor={primaryColor} borderWidth={"1px"} color={value?.productTypeData[0]?.ticketType === "Early Bird" ? "white" : primaryColor} >
                    <IoLogoTwitter size="23px" />
                    <Text fontWeight={"500"} fontSize={"14px"} >{value?.productTypeData[0]?.ticketType === "Early Bird" ? "Edit" : ""} Early Bird</Text>
                </Flex>
                {(value?.productTypeData[0]?.ticketType === "Early Bird" && !eventData?.ticketBought) &&
                    <Flex cursor={"pointer"} onClick={() => removeHandler()} _disabled={{ opacity: "0.2", cursor: "not-allowed" }} _hover={{ backgroundColor: "transparent" }} color={"red"} flexDir={"column"} justifyContent={"end"} mt={"7"} bg={"transparent"} h={"fit-content"} >
                        <PiTrashSimpleDuotone size={"15px"} />
                    </Flex>
                }
            </Flex>
            <ModalLayout open={open} size={["full", "full" , "lg"]} trigger={true} close={removeHandler} closeBtn={true} >
                <Flex pos={"relative"} w={"full"} h={["100vh", "100vh" ,"80vh"]} overflowY={"auto"}  flexDir={"column"} rounded={"2xl"} gap={"4"} p={"4"} >
                    <Flex flexDir={"column"} gap={"2"} >
                        <Text fontSize={"22px"} fontWeight={"600"} >Early Bird Ticket</Text>
                        <Text>Enter the ticket information</Text>
                    </Flex>
                    <TicketFormInput disabled={true} name={`productTypeData[0].ticketType`} label="Enter Ticket Name" />
                    <TicketFormInput  type="number" name={`productTypeData[0].ticketPrice`} label="Enter Price" />
                    <TicketFormInput type="number" name={`productTypeData[0].totalNumberOfTickets`} label="Total number of tickets available to be sold for your events" />
                    <Flex flexDir={"column"} gap={"0.5"} >
                        <Text fontSize={"14px"} fontWeight={"medium"} >Indicate the maximum number of tickets each user can purchase for your event</Text>
                        <NumberPicker value={value?.productTypeData[0]?.maxTicketBuy} name={`productTypeData[0].maxTicketBuy`} setValue={setValue} />
                    </Flex>
                    <Flex gap={"4"} flexDir={"column"} w={"full"} >
                        <CustomDatePicker label="Start *" end={value?.endDate} name={["productTypeData[0].startDate", "productTypeData[0].startTime", "productTypeData[0].endDate", "productTypeData[0].endTime"]} value={value?.productTypeData[0]?.startDate} setValue={setValue} />
                        <CustomDatePicker label="End *" start={value?.productTypeData[0]?.startDate}  end={value?.endDate} name={["productTypeData[0].endDate", "productTypeData[0].endTime"]} value={value?.productTypeData[0]?.endDate} setValue={setValue} />
                    </Flex>
                    <TicketFormInput textarea={true} name={`productTypeData[0].description`} label="Enter Ticket Description" />
                    <Flex w={"full"} justifyContent={"end"} >
                        <CustomButton onClick={closeHandler} text={"Done"} px={"6"} width={"fit-content"} borderRadius={"999px"} />
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}