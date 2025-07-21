import { CustomButton, CustomDatePicker, ModalLayout, TicketFormInput } from "@/components/shared";
import useCustomTheme from "@/hooks/useTheme";
import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IoLogoTwitter } from "react-icons/io5";
import { PiTrashSimpleDuotone } from "react-icons/pi";
import NumberPicker from "./numberPicker";

export default function EarlyBirdBtn(
    {
        value,
        setValue
    }: {
        value: any,
        setValue: (name: string, value: any) => void,
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
            }
            clone.unshift(ticket)
            setValue("productTypeData", clone)
        }
        setOpen(true)
    }

    const removeHandler = () => {
        const clone = [...value.productTypeData]

        clone?.shift()

        setValue("productTypeData", clone)
    }

    const {
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()

    return (
        <Flex>
            <Flex gap={"1"}  >
                <Flex cursor={"pointer"} _disabled={{ opacity: "0.2", cursor: "not-allowed" }} onClick={() => clickHandler()} alignItems={"center"} gap={"1"} px="6" h={"45px"} rounded={"full"} bgColor={value?.productTypeData[0]?.ticketType === "Early Bird" ? primaryColor : mainBackgroundColor} borderColor={primaryColor} borderWidth={"1px"} color={value?.productTypeData[0]?.ticketType === "Early Bird" ? "white" : primaryColor} >
                    <IoLogoTwitter size="23px" />
                    <Text fontWeight={"500"} fontSize={"14px"} >{value?.productTypeData[0]?.ticketType === "Early Bird" ? "Edit" : ""} Early Bird</Text>
                </Flex>
                {value?.productTypeData[0]?.ticketType === "Early Bird" &&
                    <Flex cursor={"pointer"} onClick={() => removeHandler()} _disabled={{ opacity: "0.2", cursor: "not-allowed" }} _hover={{ backgroundColor: "transparent" }} color={"red"} flexDir={"column"} justifyContent={"end"} mt={"7"} bg={"transparent"} h={"fit-content"} >
                        <PiTrashSimpleDuotone size={"15px"} />
                    </Flex>
                }
            </Flex>
            <ModalLayout open={open} size="sm" trigger={true} close={() => setOpen(false)} closeBtn={true} >
                <Flex w={"full"} flexDir={"column"} rounded={"2xl"} gap={"4"} p={"4"} >
                    <Flex flexDir={"column"} gap={"2"} >
                        <Text fontSize={"22px"} fontWeight={"600"} >Early Bird Ticket</Text>
                        <Text>Enter the ticket information</Text>
                    </Flex>
                    <TicketFormInput disabled={true} index={0} defaultData={value?.productTypeData[0]?.ticketType} name={`ticketType`} setValue={setValue} label="Enter Ticket Name" value={value} />
                    <TicketFormInput index={0} defaultData={value?.productTypeData[0]?.ticketPrice} type="number" name={`ticketPrice`} setValue={setValue} label="Enter Price" value={value} />
                    <TicketFormInput index={0} defaultData={value?.productTypeData[0]?.totalNumberOfTickets} type="number" name={`totalNumberOfTickets`} setValue={setValue} label="Total number of tickets available to be sold for your events" value={value} />
                    <Flex flexDir={"column"} gap={"0.5"} >
                        <Text fontSize={"14px"} fontWeight={"medium"} >Indicate the maximum number of tickets each user can purchase for your event</Text>
                        <NumberPicker value={value?.productTypeData[0]?.maxTicketBuy} name={`maxTicketBuy`} setValue={setValue} />
                    </Flex>
                    <Flex gap={"4"} flexDir={"column"} w={"full"} >
                        <CustomDatePicker label="Start *" name={["startDate", "startTime"]} value={value?.productTypeData[0]?.startDate} setValue={setValue} />
                        <CustomDatePicker label="End *" start={value?.productTypeData[0]?.startDate} name={["endDate", "endTime"]} value={value?.productTypeData[0]?.endDate} setValue={setValue} />
                    </Flex>
                    <Flex w={"full"} justifyContent={"end"} >
                        <CustomButton onClick={() => setOpen(false)} text={"Close"} px={"6"} width={"fit-content"} borderRadius={"999px"} />
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}