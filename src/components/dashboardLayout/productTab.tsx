"use client"
import { GlassIcon, NewEventIcon, ServiceIcon, RentalIcon, StoreIcon, NewDonationIcon } from "@/svg";
import { Flex, Text } from "@chakra-ui/react";
import { SelectEventOption, SelectEventType } from "../eventcomponents";
import { CustomButton } from "../shared";
import useCustomTheme from "@/hooks/useTheme";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SelectDonationOption } from "../fundraisingComponents";


export default function ProductTab(
    {
        children
    }: { children: React.ReactNode }
) {

    const {
        secondaryBackgroundColor,
        headerTextColor,
        primaryColor,
        borderColor
    } = useCustomTheme()

    const pathname = usePathname()
    const query = useSearchParams();
    const type = query?.get('type');
    const router = useRouter()

    const clickHandler = (item: string) => {
        if (item === "donation") {
            router.push("/product/fundraising")
        } else if(item === "event") {
            router.push("/product/events")
        }
    }

    return (
        <Flex w={"full"} px={(pathname?.includes("create") || pathname?.includes("details")) ? "0px" : ["4", "4", "6"]} pt={(pathname?.includes("create") || pathname?.includes("details")) ? "0px" : ["6", "6", "12", "12"]} pb={pathname?.includes("create") ? "0px" : "12"} flexDir={"column"} overflowY={"auto"} >
            <Flex w={"full"} display={(!pathname?.includes("create") && !pathname?.includes("details")) ? "flex" : "none"} alignItems={"center"} flexDirection={"column"} gap={"3"} >
                <Flex fontSize={["20px", "20px", "56px"]} alignItems={"end"} display={["flex", "flex", "none"]} fontWeight={"700"} >what are you l<Flex mb={"1"} ><GlassIcon size='17' /></Flex>king for?</Flex>
                <Flex fontSize={["16px", "16px", "56px"]} alignItems={"end"} display={["none", "none", "flex"]} fontWeight={"700"} >what are you l<Flex mb={"3"} ><GlassIcon size='45' /></Flex>king for?</Flex>
                <Flex w={["full", "fit-content", "fit-content"]} gap={"0px"} alignItems={"center"} bgColor={secondaryBackgroundColor} p={"6px"} rounded={"full"} >
                    <CustomButton onClick={() => clickHandler("event")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex display={["none", "none", "flex"]} >
                                <NewEventIcon color={pathname === "/product/events" ? "white" : headerTextColor} />
                            </Flex>
                            <Text fontSize={["10px", "12px", "14px"]} >Event</Text>
                        </Flex>
                    } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={pathname === "/product/events" ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={pathname === "/product/events" ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={pathname === "/product/events" ? "white" : headerTextColor} width={["100%", "107px", "175px"]} />
                    <CustomButton onClick={() => clickHandler("service")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex display={["none", "none", "flex"]} >
                                <ServiceIcon color={(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? "white" : headerTextColor} />
                            </Flex>
                            <Text fontSize={["10px", "12px", "14px"]} >Service</Text>
                        </Flex>
                    } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? "white" : headerTextColor} width={["100%", "107px", "175px"]} />
                    <CustomButton onClick={() => clickHandler("rental")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex display={["none", "none", "flex"]} >
                                <RentalIcon color={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "white" : headerTextColor} />
                            </Flex>
                            <Text fontSize={["10px", "12px", "14px"]} >Rental</Text>
                        </Flex>
                    } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "white" : headerTextColor} width={["100%", "107px", "175px"]} />
                    <CustomButton onClick={() => clickHandler("kiosk")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex display={["none", "none", "flex"]} >
                                <StoreIcon color={(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") ? "white" : headerTextColor} />
                            </Flex>
                            <Text fontSize={["10px", "12px", "14px"]} >Kiosk</Text>
                        </Flex>
                    } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") ? "white" : headerTextColor} width={["100%", "107px", "175px"]} />
                    <Flex w="fit-content" >
                        <CustomButton onClick={() => clickHandler("donation")} text={
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex display={["none", "none", "flex"]} >
                                    <NewDonationIcon color={pathname?.includes("/product/fundraising") ? "white" : headerTextColor} />
                                </Flex>
                                <Text fontSize={["10px", "12px", "14px"]} >Fundraising</Text>
                            </Flex>
                        } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={pathname?.includes("/product/fundraising") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={pathname?.includes("/product/fundraising") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={pathname?.includes("/product/fundraising") ? "white" : headerTextColor} width={["80px", "107px", "175px"]} />
                    </Flex>
                </Flex>
                {pathname.includes("event") && (
                    <Flex pt={["6", "6", "6"]} pb={["0px", "6", "6"]} maxWidth={"745px"} position={"relative"} width={"full"} gap={"4"} flexDir={["row"]} alignItems={["start", "start", "center"]} flexDirection={["column", "column", "row"]} >
                        {!type && (
                            <SelectEventType />
                        )}
                        <SelectEventOption />
                        <CustomButton onClick={() => router.push("/product/create/events")} text={"Create Event"} width={"150px"} fontSize={"14px"} borderRadius={"full"} />
                    </Flex>
                )} 
                {pathname.includes("fundraising") && (
                    <Flex pt={["6", "6", "6"]} pb={["0px", "6", "6"]} maxWidth={"745px"} position={"relative"} width={"full"} gap={"4"} flexDir={["row"]} alignItems={["start", "start", "center"]} flexDirection={["column", "column", "row"]} > 
                        <SelectDonationOption />
                        <CustomButton onClick={() => router.push("/product/create/fundraising")} text={"Create Fundraising"} width={"150px"} fontSize={"14px"} borderRadius={"full"} />
                    </Flex>
                )}
            </Flex>
            {children}
        </Flex>
    )
}