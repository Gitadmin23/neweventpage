import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import QRCode from "react-qr-code";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useCustomTheme from "@/hooks/useTheme";
import { IEventType } from "@/helpers/models/event"; 
import { useDetails } from "@/helpers/store/useUserDetails";
import { capitalizeFLetter } from "@/helpers/utils/capitalLetter";
import { dateFormat, timeFormat } from "@/helpers/utils/dateFormat";
import { textLimit } from "@/helpers/utils/textlimit";
import { DownloadTwoIcon } from "@/svg"; 
import { EventPrice } from "../eventcomponents";
import { CustomButton, ModalLayout, LoadingAnimation, UserImage } from "../shared";
import { useColorMode } from "../ui/color-mode";
import EventImage from "./eventImage";
import { useReactToPrint } from "react-to-print";
import { IUser } from "@/helpers/models/user";
import { PaginatedResponse } from "@/helpers/models/PaginatedResponse";
import { useFetchData } from "@/hooks/useFetchData";


interface IProps {
    "id": string,
    "createdDate": number,
    "lastModifiedBy": IUser,
    "createdBy": IUser,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "event": IEventType,
    "expirationDate": any,
    "sale": any,
    "ticketType": string,
    "boughtPrice": number,
    "price": number,
    "barcodeImage": string,
    "ticketUsed": number,
    "index": number,
    "scanTimeStamp": any
}

export default function ViewTicket(
    {
        data
    }: {
        data: IEventType
    }) {
 
    const [open, setOpen] = useState(false)

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        ticketBackgroundColor,
        headerTextColor
    } = useCustomTheme();
    
    const { colorMode } = useColorMode(); 

    const contentRef = useRef<HTMLDivElement>(null); 

    const { userId: user_index } = useDetails((state) => state);

    const reactToPrintFn = useReactToPrint({ contentRef }); 


    const { data: eventData, isLoading } = useFetchData<PaginatedResponse<IProps | any>>({
        name: "event-ticket", endpoint: "/events/get-users-tickets", id: data?.id, params: {
            userID: user_index,
            eventID: data?.id
        }
    });

    const checkEventDay = (item: any) => {
        return (new Date(item[item?.length - 1])?.getDate() >= new Date(eventData?.content[0]?.event?.startDate)?.getDate()) && (new Date(item[item?.length - 1])?.getDate() <= new Date(eventData?.content[0]?.event?.endDate)?.getDate())
    } 

    const isToDay = (item: any) => {

        return (new Date()?.getDate() === new Date(item)?.getDate() || new Date(eventData?.content[0]?.event?.endDate)?.getDate() === new Date(item)?.getDate())
    }

    const ref: any = React.useRef(null);

    const scroll = (scrolloffset: number) => {
        ref.current.scrollLeft += scrolloffset
    };

    return (
        <Flex>
            {data?.isBought && (
                <Flex w={"full"} display={[data?.isBought ? "block" : "block", "block", "block", "block"]} >
                    <CustomButton backgroundColor={"#F2F4FF"} borderWidth={"1px"} borderColor={primaryColor} color={primaryColor} borderRadius={"32px"} my={"auto"} onClick={() => setOpen(true)} disable={((!data?.isBought)) ? true : (data?.isBought) ? false : true} text={`View Ticket${eventData?.totalElements > 1 ? `s x${eventData?.totalElements}` : ""}`} width={["full"]} height={["45px"]} fontSize={"sm"} fontWeight={"semibold"} />
                </Flex>
            )}
            <ModalLayout size={"cover"} trigger={true} open={open} close={() => setOpen(false)} >
                <LoadingAnimation loading={isLoading} >
                    <Flex p={"4"} position={"relative"} h={"100vh"} flexDirection={"column"} bg={mainBackgroundColor} roundedTop={"md"} width={"full"} alignItems={"center"} px={"2"} gap={"2"} >
                        <Flex bg={mainBackgroundColor} w={"full"} h={"50px"} display={["none", "none", "flex"]} position={"relative"} gap={"4"} px={"4"} mb={"2"} width={"full"} justifyContent={"space-between"} alignItems={"center"} >

                            <Box display={["none", "none", "flex"]} zIndex={"10"} onClick={() => setOpen(false)} cursor={"pointer"} >
                                <IoClose size={"25px"} />
                            </Box>
                            <Flex pos={"absolute"} display={["none", "none", "flex"]} w={"full"} justifyContent={"center"} >
                                <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"center"} >Ticket Details</Text>
                            </Flex>
                            <Box display={["none", "none", "block"]} >
                                <CustomButton width={"fit"} px={"3"} borderRadius={"full"} onClick={() => reactToPrintFn()} text='Download Ticket' />
                            </Box>
                        </Flex>
                        <Box pos={"absolute"} top={"2"} left={"2"} p={"1"} bgColor={mainBackgroundColor} rounded={"full"} display={["flex", "flex", "none"]} zIndex={"10"} onClick={() => setOpen(false)} cursor={"pointer"} >
                            <IoClose size={"25px"} />
                        </Box>
                        <Box w={"full"} bg={mainBackgroundColor} h={"full"} pos={"relative"} flex={"1"} display={["none", "none", "flex"]} >
                            <Flex ref={contentRef} width={"full"} position={"absolute"} inset={"0px"} flex={"1"} overflowY={"auto"} flexDirection={"column"} gap={"4"} px={["4", "4", "0px"]} >
                                {/* {eventData.length > 0 && ( */}
                                    <Flex w={"full"} h={"fit-content"} flexDir={"column"} alignItems={"center"} gap={"4"} >
                                        {eventData?.content?.map((item, index: number) => {
                                            return (
                                                <Flex key={index} maxW={"750px"} w={"full"} flexDir={["row"]} rounded={"16px"} pb={"4"} p={["4"]} bg={index === 0 ? secondaryBackgroundColor : ticketBackgroundColor} alignItems={["center"]} justifyContent={"center"} gap={"4"} >
                                                    <Flex w={["fit-content"]} gap={"4"} >
                                                        <EventImage width={["201px"]} height={["201px"]} data={eventData?.content[0]?.event} />
                                                    </Flex>
                                                    <Flex flexDir={"column"} pos={"relative"} gap={"4"} px={["4", "4", "0px"]} >
                                                        <Text fontSize={"24px"} lineHeight={"18px"} fontWeight={"bold"} >{capitalizeFLetter(textLimit(eventData?.content[0]?.event?.eventName, 20))}</Text>

                                                        {isToDay(item?.scanTimeStamp ? item?.scanTimeStamp[item?.scanTimeStamp?.length - 1] : "") && (
                                                            <>
                                                                {(checkEventDay(item?.scanTimeStamp)) && (
                                                                    <Box width={'fit-content'} height={'fit-content'} position={'absolute'} bottom={'50px'} right={"0"} bg={'transparent'}>
                                                                        <Image src={'/images/approved.svg'} alt={'approved'} width={'100px'} height={'100px'} objectFit={'cover'} />
                                                                    </Box>
                                                                )}
                                                            </>
                                                        )}
                                                        <Flex gap={"4"} alignItems={"center"} >
                                                            <Flex border={`0.5px solid ${index === 0 ? bodyTextColor : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={colorMode === 'light' ? "#5B5858" : bodyTextColor} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                                {dateFormat(eventData?.content[0]?.event?.startDate)}
                                                            </Flex>
                                                            <Flex border={`0.5px solid ${index === 0 ? bodyTextColor : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={colorMode === 'light' ? "#5B5858" : bodyTextColor} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                                {timeFormat(eventData?.content[0]?.event?.startDate)}
                                                            </Flex>
                                                        </Flex>
                                                        <Flex gap={"4"} >

                                                            <Flex flexDirection={"column"} >
                                                                <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Ticket Type</Text>
                                                                <Text color={bodyTextColor} fontWeight={"semibold"} fontSize={"10.26px"} lineHeight={"13.68px"}  >{item.ticketType}</Text>
                                                            </Flex>
                                                            <Flex flexDirection={"column"} >
                                                                <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Ticket fee</Text>
                                                                <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >
                                                                    <EventPrice minPrice={item?.boughtPrice} maxPrice={item?.boughtPrice} currency={eventData?.content[0]?.event?.currency} />
                                                                </Text>
                                                            </Flex>
                                                            <Flex flexDirection={"column"} alignItems={"center"} >
                                                                <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Quantity</Text>
                                                                <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >{index + 1}/{eventData?.totalElements}</Text>
                                                            </Flex>
                                                        </Flex>
                                                        <Flex gap={"4"} fontSize={"xs"} >

                                                            <UserImage size={"lg"} user={eventData?.content[0]?.createdBy} />
                                                            <Flex flexDirection={"column"} >
                                                                <Text fontWeight={"bold"} color={headerTextColor} >Name</Text>
                                                                <Text color={bodyTextColor} >{eventData?.content[0]?.createdBy?.firstName + " " + eventData?.content[0]?.createdBy?.lastName}</Text>
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>

                                                    <Flex gap={"1"} borderLeft={["1px dashed black"]} w={["fit-content"]} alignItems={"center"} border={""} pl={["4"]} flexDir={"column"} >
                                                        <Box bg={"white"} p={"3"} w={"fit-content"} rounded={"16px"} >
                                                            <QRCode
                                                                style={{ height: "200px", width: "200px", zIndex: 20 }}
                                                                value={item?.id}
                                                                viewBox={`0 0 256 256`}
                                                            />
                                                        </Box>
                                                        <Text textAlign={"center"} fontSize={"xs"} >Powered by Chasescroll</Text>
                                                    </Flex>
                                                </Flex>
                                            )
                                        })}
                                    </Flex>
                                {/* )} */}
                            </Flex>
                        </Box>

                        {eventData?.totalElements > 1 && (
                            <Flex w={"full"} top={"200px"} position={"fixed"} display={["flex", "flex", "none"]} zIndex={"1000"} justifyContent={"space-between"} gap={"4"} px={"2"} >
                                <Flex onClick={() => scroll(-400)} as="button" position={"relative"} bgColor={mainBackgroundColor} w={"40px"} h={"40px"} borderWidth={"1px"} borderColor={bodyTextColor} justifyContent={"center"} alignItems={"center"} rounded={"full"} >
                                    <FaChevronLeft color={bodyTextColor} />
                                </Flex>
                                <Flex onClick={() => scroll(400)} as="button" bgColor={mainBackgroundColor} w={"40px"} h={"40px"} borderWidth={"1px"} borderColor={bodyTextColor} justifyContent={"center"} alignItems={"center"} rounded={"full"} >
                                    <FaChevronRight color={bodyTextColor} />
                                </Flex>
                            </Flex>
                        )}

                        <Flex ref={ref} position={"relative"} width={"full"} display={["flex", "flex", "none"]} className="hide-scrollbar" flexDirection={"row"} overflowX={"auto"} alignItems={"center"} gap={"4"} px={["1", "1", "0px"]} >
                            <Flex width={"full"} gap={"6"} >
                                {eventData?.content?.map((item, index: number) => {
                                    return (
                                        <Flex key={index} minW={"80vw"} flexDir={["column", "column", "row"]} rounded={"16px"} pb={"4"} pt={["4"]} p={["0px", "0px", "4"]} bg={index === 0 ? secondaryBackgroundColor : ticketBackgroundColor} alignItems={["start", "start", "center"]} justifyContent={"center"} >
                                            <Flex width={"full"} justifyContent={"space-between"} pos={"relative"} px={"4"} pt={"4"} >
                                                <Flex pos={"absolute"} width={"full"} pr={"6"} justifyContent={"center"} >
                                                    <Text fontSize={"16px"} fontWeight={"bold"} textAlign={"center"} >Ticket Details</Text>
                                                </Flex>
                                                <Box ml={"auto"} cursor={"pointer"} pos={"relative"} zIndex={"10"} onClick={() => reactToPrintFn()} display={["block", "block", "none"]}>
                                                    <DownloadTwoIcon />
                                                </Box>
                                            </Flex>
                                            <Flex pos={"relative"} w={["full", "full", "fit-content"]} gap={"4"} mt={["4", "4", "0px"]} px={["4", "4", ""]} >
                                                <EventImage width={["full", "full", "201px"]} height={["201px", "201px", "201px"]} data={eventData?.content[0]?.event} />
                                                {isToDay(item?.scanTimeStamp ? item?.scanTimeStamp[item?.scanTimeStamp?.length - 1] : "") && (
                                                    <>
                                                        {(checkEventDay(item?.scanTimeStamp)) && (
                                                            <Box width={'fit-content'} height={'fit-content'} position={'absolute'} bottom={'-50px'} right={"3"} bg={'transparent'}>
                                                                <Image src={'/assets/approved.svg'} alt={'approved'} width={'100px'} height={'100px'} objectFit={'cover'} />
                                                            </Box>
                                                        )}
                                                    </>
                                                )}
                                            </Flex>
                                            <Flex pos={"relative"} flexDir={"column"} mt={"2"} gap={"3"} px={["4", "4", "0px"]} >
                                                <Text fontSize={"18px"} fontWeight={"semibold"} >{capitalizeFLetter(textLimit(eventData?.content[0]?.event?.eventName, 20))}</Text>

                                                <Flex gap={"4"} display={["flex", "flex", "none"]} fontSize={"xs"} >

                                                    <UserImage size={"lg"} user={eventData?.content[0]?.createdBy} />
                                                    <Flex flexDirection={"column"} >
                                                        <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                                                        <Text color={bodyTextColor} >{eventData?.content[0]?.createdBy?.firstName + " " + eventData?.content[0]?.createdBy?.lastName}</Text>
                                                    </Flex>
                                                </Flex>
                                                <Flex gap={"4"} alignItems={"center"} >
                                                    <Flex border={`0.5px solid ${index === 0 ? "#CDD3FD" : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={bodyTextColor} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                        {dateFormat(eventData?.content[0]?.event?.startDate)}
                                                    </Flex>
                                                    <Flex border={`0.5px solid ${index === 0 ? "#CDD3FD" : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={bodyTextColor} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                        {timeFormat(eventData?.content[0]?.event?.startDate)}
                                                    </Flex>
                                                </Flex>
                                                <Flex gap={"4"} >

                                                    <Flex flexDirection={"column"} >
                                                        <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Ticket Type</Text>
                                                        <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >{item.ticketType}</Text>
                                                    </Flex>
                                                    <Flex flexDirection={"column"} >
                                                        <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Ticket fee</Text>
                                                        <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >
                                                            <EventPrice minPrice={item?.boughtPrice} maxPrice={item?.boughtPrice} currency={eventData?.content[0]?.event?.currency} />
                                                        </Text>
                                                    </Flex>
                                                    <Flex flexDirection={"column"} >
                                                        <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Number</Text>
                                                        <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >{index + 1}/{eventData.content?.length}</Text>
                                                    </Flex>
                                                </Flex>
                                                <Flex gap={"4"} display={["none", "none", "flex"]} fontSize={"xs"} >

                                                    <UserImage size={"lg"} user={eventData?.content[0]?.createdBy} />
                                                    <Flex flexDirection={"column"} gap={"2"} >
                                                        <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                                                        <Text color={bodyTextColor} >{eventData?.content[0]?.createdBy?.firstName + " " + eventData?.content[0]?.createdBy?.lastName}</Text>
                                                    </Flex>
                                                </Flex>
                                            </Flex>

                                            <Flex gap={"1"} borderLeft={["", "", "1px dashed black"]} mt={"2"} borderTop={["1px dashed black", "1px dashed black", "0px"]} w={["full", "full", "fit-content"]} alignItems={"center"} border={""} py={["4", "4", "0px"]} pl={["0px", "0px", "4"]} flexDir={"column"} >
                                                <Box bg={"white"} p={"3"} w={"fit-content"} rounded={"16px"} >
                                                    <QRCode
                                                        style={{ height: "200px", width: "200px", zIndex: 20 }}
                                                        value={item?.id}
                                                        viewBox={`0 0 256 256`}
                                                    />
                                                </Box>
                                                <Text textAlign={"center"} fontSize={"xs"} >Powered by Chasescroll</Text>
                                            </Flex>
                                        </Flex>
                                    )
                                })}
                            </Flex>
                        </Flex>

                    </Flex>
                </LoadingAnimation>
            </ModalLayout>
        </Flex>
    )
}