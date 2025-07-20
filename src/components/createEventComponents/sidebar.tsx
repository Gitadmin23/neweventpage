"use client"
import useCustomTheme from "@/hooks/useTheme";
import { Flex, Text } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function Sidebar() {

    const {
        secondaryBackgroundColor,
        mainBackgroundColor,
        primaryColor,
        headerTextColor
    } = useCustomTheme()

    const query = useSearchParams();
    const type = query?.get('type');

    const router = useRouter()

    return (
        <Flex bgColor={secondaryBackgroundColor} flexDir={"column"} p={5} w={"344px"}  >
            <Flex w={"full"} gap={"3"} alignItems={"center"} >
                <Flex onClick={()=> router.back()} cursor={"pointer"}  >
                    <IoArrowBack size={"25px"} />
                </Flex>
                <Text>Create Event</Text>
            </Flex>
            <Flex w={"full"} flexDir={"column"} gap={"4"} mt={"6"} >
                <Flex w={"full"} flexDir={"column"} gap={"2"} rounded={"lg"} bgColor={mainBackgroundColor} p={"3"}  >
                    <Flex gap={"2"} alignItems={"center"} >
                        <Flex w={"20px"} h={"20px"} borderWidth={"1.5px"} p={"4px"} borderColor={primaryColor} rounded={"full"} >
                            <Flex w={"full"} h={"full"} rounded={"full"} bgColor={primaryColor} />
                        </Flex>
                        <Text fontSize={"16px"} fontWeight={"600"} color={primaryColor} >Theme</Text>
                    </Flex>
                    <Text fontWeight={"600"} >Tell Us More about your Event</Text>
                    <Text fontSize={"12px"} >Whether it's a conference, seminar, or celebration, let us in on the details. Your event matters, and we're here to ensure it gets the spotlight it deserves.</Text>
                </Flex>
                <Flex w={"full"} flexDir={"column"} gap={"2"} rounded={"lg"} bgColor={mainBackgroundColor} p={"3"}  >
                    <Flex gap={"2"} alignItems={"center"} >
                        <Flex w={"20px"} h={"20px"} borderWidth={"1.5px"} p={"4px"} borderColor={!type ? headerTextColor : primaryColor} rounded={"full"} >
                            {type && (
                                <Flex w={"full"} h={"full"} rounded={"full"} bgColor={primaryColor} />
                            )}
                        </Flex>
                        <Text fontSize={"16px"} fontWeight={"600"} color={!type ? headerTextColor : primaryColor} >Information</Text>
                    </Flex>
                    <Text fontWeight={"600"} >Discover the Details</Text>
                    <Text fontSize={"12px"} >We will like to know the location and schedule for your upcoming event</Text>
                </Flex>
                <Flex w={"full"} flexDir={"column"} gap={"2"} rounded={"lg"} bgColor={mainBackgroundColor} p={"3"}  >
                    <Flex gap={"2"} alignItems={"center"} >
                        <Flex w={"20px"} h={"20px"} borderWidth={"1.5px"} p={"4px"} borderColor={type !== "ticket" ? headerTextColor : primaryColor} rounded={"full"} >
                            {type === "ticket" && (
                                <Flex w={"full"} h={"full"} rounded={"full"} bgColor={primaryColor} />
                            )}
                        </Flex>
                        <Text fontSize={"16px"} fontWeight={"600"} color={type !== "ticket" ? headerTextColor : primaryColor} >Ticket</Text>
                    </Flex>
                    <Text fontWeight={"600"} >Effortlessly Invite Attendees with Ticket Generation</Text>
                    <Text fontSize={"12px"} >Streamline Attendance with Seamless Ticket Generation and Invitations</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}