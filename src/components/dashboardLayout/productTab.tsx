"use client"
import { GlassIcon, NewEventIcon, ServiceIcon, RentalIcon, StoreIcon, NewDonationIcon } from "@/svg";
import { Flex, Input, InputGroup, Text, useTooltip } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip"
import { SelectEventOption, SelectEventType } from "../eventcomponents";
import { CustomButton, ProductTooltip } from "../shared";
import useCustomTheme from "@/hooks/useTheme";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SelectDonationOption } from "../fundraisingComponents";
import { DASHBOARDPAGE_URL } from "@/helpers/services/urls";
import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import useSearchStore from "@/helpers/store/useSearchData";
import { useColorMode } from "../ui/color-mode";

export default function ProductTab(
    {
        children
    }: { children: React.ReactNode }
) {

    const {
        secondaryBackgroundColor,
        headerTextColor,
        primaryColor,
        borderColor,
        mainBackgroundColor
    } = useCustomTheme()

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)

    const pathname = usePathname()
    const query = useSearchParams();
    const frame = query?.get('frame');
    const type = query?.get('type');
    const router = useRouter()
    const { search, setSearchValue } = useSearchStore((state) => state)
    const { colorMode } = useColorMode();

    const token = Cookies.get("chase_token")

    const clickHandler = (item: string) => {
        if (item === "donation") {
            router.push(`/product/fundraising${frame ? "?frame=true" : ""}`)
            setShow(true)
        } else if (item === "event") {
            router.push(`/product/events${frame ? "?frame=true" : ""}`)
            setOpen(true)
        } else {
            window.location.href = `${DASHBOARDPAGE_URL}/dashboard/product/kiosk${!frame ? `?type=${item}&token=${token}&theme=${colorMode}` : `?type=${item}&frame=true&theme=${colorMode}`}`;
            // /dashboard/product/kiosk?type=service
        }
    }
    useEffect(() => {
        if (open) {
            const timeout = setTimeout(() => {
                setOpen(false)
                setShow(false)
            }, 3000); // 3 seconds
            return () => clearTimeout(timeout);
        }
        // Cleanup to avoid memory leak
    }, [open, show]);

    return (
        <Flex w={"full"} px={(pathname?.includes("create") || pathname?.includes("details")) ? "0px" : ["2", "2", "6"]} pt={(pathname?.includes("create") || pathname?.includes("details")) ? "0px" : ["6", "6", "12", "12"]} pb={pathname?.includes("create") ? "0px" : "12"} flexDir={"column"} overflowY={"auto"} >
            <Flex w={"full"} display={(!pathname?.includes("create") && !pathname?.includes("details")) ? "flex" : "none"} alignItems={"center"} flexDirection={"column"} gap={"3"} >
                <Flex fontSize={["20px", "20px", "56px"]} alignItems={"end"} display={["flex", "flex", "none"]} fontWeight={"700"} >what are you l<Flex mb={"1"} ><GlassIcon size='17' /></Flex>king for?</Flex>
                <Flex fontSize={["16px", "16px", "56px"]} alignItems={"end"} display={["none", "none", "flex"]} fontWeight={"700"} >what are you l<Flex mb={"3"} ><GlassIcon size='45' /></Flex>king for?</Flex>
                <Flex w={["full", "fit-content", "fit-content"]} gap={"0px"} justifyContent={"space-between"} alignItems={"center"} bgColor={secondaryBackgroundColor} p={"6px"} rounded={"full"} >
                    {/* <Tooltip
                        content={
                            <ProductTooltip title="Welcome Chasescroll Event" details="Event System: Add or Get Free & paid event tickets in this section ONLY." setIsOpen={setOpen} />
                        }
                        open={open}
                    > */}
                    <CustomButton onClick={() => clickHandler("event")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex display={["none", "none", "flex"]} >
                                <NewEventIcon color={pathname === "/product/events" ? "white" : headerTextColor} />
                            </Flex>
                            <Text fontSize={["10px", "12px", "14px"]} >Event</Text>
                        </Flex>
                    } height={["30px", "38px", "48px"]} px={"4"} fontSize={"sm"} backgroundColor={pathname === "/product/events" ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={pathname === "/product/events" ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={pathname === "/product/events" ? "white" : headerTextColor} width={["fit-content", "107px", "175px"]} />
                    {/* </Tooltip> */}
                    <CustomButton onClick={() => clickHandler("service")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex display={["none", "none", "flex"]} >
                                <ServiceIcon color={(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? "white" : headerTextColor} />
                            </Flex>
                            <Text fontSize={["10px", "12px", "14px"]} >Service</Text>
                        </Flex>
                    } height={["30px", "38px", "48px"]} px={"4"} fontSize={"sm"} backgroundColor={(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? "white" : headerTextColor} width={["fit-content", "107px", "175px"]} />
                    <CustomButton onClick={() => clickHandler("rental")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex display={["none", "none", "flex"]} >
                                <RentalIcon color={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "white" : headerTextColor} />
                            </Flex>
                            <Text fontSize={["10px", "12px", "14px"]} >Rental</Text>
                        </Flex>
                    } height={["30px", "38px", "48px"]} px={"4"} fontSize={"sm"} backgroundColor={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "white" : headerTextColor} width={["fit-content", "107px", "175px"]} />
                    <CustomButton onClick={() => clickHandler("kiosk")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex display={["none", "none", "flex"]} >
                                <StoreIcon color={(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") ? "white" : headerTextColor} />
                            </Flex>
                            <Text fontSize={["10px", "12px", "14px"]} >Kiosk</Text>
                        </Flex>
                    } height={["30px", "38px", "48px"]} px={"4"} fontSize={"sm"} backgroundColor={(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") ? "white" : headerTextColor} width={["fit-content", "107px", "175px"]} />
                    <Flex w="fit-content" >
                        {/* <Tooltip
                            content={
                                <ProductTooltip title="Welcome to Fundraising section" details="Donate or Create event-base fundraising ONLY in this section. Eg, campaigns, schools, non-profits, clubs, churches, youth groups or urgent causes etc." setIsOpen={setOpen} />
                            }
                            open={show}
                        > */}
                        <CustomButton onClick={() => clickHandler("donation")} text={
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex display={["none", "none", "flex"]} >
                                    <NewDonationIcon color={pathname?.includes("/product/fundraising") ? "white" : headerTextColor} />
                                </Flex>
                                <Text fontSize={["10px", "12px", "14px"]} >Fundraising</Text>
                            </Flex>
                        } height={["30px", "38px", "48px"]} px={"4"} fontSize={"sm"} backgroundColor={pathname?.includes("/product/fundraising") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={pathname?.includes("/product/fundraising") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={pathname?.includes("/product/fundraising") ? "white" : headerTextColor} width={["80px", "107px", "175px"]} />
                        {/* </Tooltip> */}
                    </Flex>
                </Flex>
                <Flex maxW={"500px"} mt={"4"} w={"full"} > 
                    <InputGroup startElement={
                        <Flex pl={"3"} >
                            <IoSearchOutline size={"20px"} />
                        </Flex>
                    }>
                        <Input value={search} onChange={(e) => setSearchValue(e.target.value)} type="search" h={"45px"} rounded={"full"} bgColor={mainBackgroundColor} placeholder={`Search for ${pathname.includes("event") ? "event" : "fundraising"}`} />
                    </InputGroup>
                </Flex>
                {pathname.includes("event") && (
                    <Flex pt={["2", "2", "6"]} pb={["0px", "6", "6"]} maxWidth={"745px"} position={"relative"} width={"full"} gap={["2", "2", "4"]} alignItems={["start", "start", "center"]} flexDirection={["column", "column", "row"]} >
                        {!type && (
                            <SelectEventType />
                        )}
                        {!frame && (
                            <Flex gap={["2", "2", "4"]}  >
                                <SelectEventOption />
                                <CustomButton onClick={() => router.push("/product/create/events")} text={"Create Event"} width={["100px", "110px", "150px"]} height={["40px", "40px", "45px"]} fontSize={["12px", "12px", "14px"]} borderRadius={"full"} />
                            </Flex>
                        )}
                    </Flex>
                )}
                {(pathname.includes("fundraising") && !frame) && (
                    <Flex pt={["2", "2", "6"]} pb={["0px", "6", "6"]} maxWidth={"745px"} position={"relative"} width={"full"} gap={"4"} flexDir={["row"]} alignItems={["start", "start", "center"]} flexDirection={["row"]} >
                        <SelectDonationOption />
                        <CustomButton onClick={() => router.push("/product/create/fundraising")} text={"Create Fundraising"} width={"150px"} height={["40px", "40px", "45px"]} fontSize={["12px", "12px", "14px"]} borderRadius={"full"} />
                    </Flex>
                )}
            </Flex>
            {children}
        </Flex>
    )
}