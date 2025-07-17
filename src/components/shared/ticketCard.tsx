"use client"
import { Box, Image, Flex, Text } from "@chakra-ui/react";
import QRCode from "react-qr-code";
// import EventLocationDetail from "@/components/sharedComponent/event_location";
import { IoClose } from "react-icons/io5"; 
import { EventImage } from "../eventdetailscomponents";
import { textLimit } from "@/helpers/utils/textlimit";
import { dateFormat, timeFormat } from "@/helpers/utils/dateFormat";
import { EventPrice } from "../eventcomponents";
import UserImage from "./userImage"; 
import { ITicket } from "@/helpers/models/ticket";


interface ITicketprops {
    ticket: ITicket;
    showStatus?: boolean; // use this to show accepted or denied
    approved?: boolean;
    showQrCode?: boolean;
    close: () => void
}

export default function Ticket({ ticket, showStatus = false, approved, close }: ITicketprops) {
    // const { id, event } = ticket; 
    return (
        <Flex p={"4"} shadow={"lg"} flexDirection={"column"} bg={"white"} roundedTop={"md"} width={"full"} alignItems={"center"} justifyContent={"center"} gap={"2"} >
            <Flex gap={"4"} width={"full"} alignItems={"center"} justifyContent={"space-between"} >

                <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"center"} >Ticket Details</Text>
                <Box onClick={() => close()} as='button' >
                    <IoClose color={"black"} size={"25px"} />
                </Box>
            </Flex>
            <Flex width={"full"} flexDirection={"column"} alignItems={"center"} >

                <Flex width={"fit-content"} flexDirection={"column"} bg={"white"} alignItems={"center"} justifyContent={"center"} gap={"2"} >

                    <Flex alignItems={"center"} gap={"4"} py={"2"} px={"2"} borderBottom={"1px solid #E2E8F0"}  >
                        <Box w={"fit-content"} >
                            <Flex width={"140px"} height={"110px"} >
                                <EventImage {...ticket?.event} />
                            </Flex>
                        </Box>
                        <Box>
                            <Text fontSize={"17px"} fontWeight={"bold"} >{textLimit(ticket?.event?.eventName + "", 15)}</Text>
                            {/* <EventLocationDetail isLimited={true} location={ticket?.event?.location} fontWeight={"medium"} color={"brand.chasescrollBlue"} fontsize='sm' noicon={true} locationType={ticket?.event?.locationType} /> */}
                        </Box>
                    </Flex>
                    <Flex width={"full"} pos={"relative"} pb={"2"} justifyContent={"center"} borderBottom={"1px solid #E2E8F0"}  >
                        <Box width={'fit-content'} height={'fit-content'} position={'absolute'} bottom={'10px'} right={"6"} bg={'transparent'}>
                            <Image src={approved ? '/assets/approved.svg' : '/assets/denied.svg'} alt={'approved'} width={'150px'} height={'150px'} objectFit={'cover'} />
                        </Box>
                        <Flex p={"2"} width={"full"} flexDirection={"column"} gap={"4"} fontSize={"xs"} >
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Place</Text>
                                {/* <EventLocationDetail isLimited={true} color={"brand.chasescrollTextGrey"} fontsize={"xs"} location={ticket?.event?.location} fontWeight={"medium"} noicon={true} locationType={ticket?.event?.locationType} /> */}
                            </Flex>
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Order ID</Text>
                                <Text color={"brand.chasescrollTextGrey"} >{textLimit(ticket?.id + "", 10)}</Text>
                            </Flex>
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Date</Text>
                                <Text color={"brand.chasescrollTextGrey"} >{dateFormat(ticket?.createdDate)}</Text>
                            </Flex>
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Ticket Fee</Text>
                                <Text color={"brand.chasescrollTextGrey"} >
                                    <EventPrice minPrice={ticket?.boughtPrice} maxPrice={ticket?.boughtPrice} currency={ticket?.event?.currency} />
                                </Text>
                            </Flex>
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Ticket Type</Text>
                                <Text color={"brand.chasescrollTextGrey"} >
                                    {ticket?.ticketType}
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex p={"2"} width={"full"} flexDirection={"column"} gap={"4"} fontSize={"xs"} >

                            <UserImage size="lg" user={ticket?.createdBy} />
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                                <Text color={"brand.chasescrollTextGrey"} >{ticket?.createdBy?.username}</Text>
                            </Flex>
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Time</Text>
                                <Text color={"brand.chasescrollTextGrey"} >{timeFormat(ticket?.createdDate)}</Text>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex gap={"2"} borderLeft={["", "", "1px dashed black"]} borderTop={["1px dashed black", "1px dashed black", "0px"]} w={["full", "full", "fit-content"]} alignItems={"center"} border={""} py={["4", "4", "0px"]} pl={["0px", "0px", "4"]} flexDir={"column"} >
                        <Box bg={"white"} p={"3"} w={"fit-content"} rounded={"16px"} >
                            <QRCode
                                style={{ height: "100px", width: "100px", zIndex: 20 }}
                                value={ticket?.id + ""}
                                viewBox={`0 0 256 256`}
                            />
                        </Box>
                        <Text textAlign={"center"} fontSize={"xs"} >Powered by Chasescroll</Text>
                    </Flex>
                </Flex>

            </Flex>
        </Flex>
    );
}
