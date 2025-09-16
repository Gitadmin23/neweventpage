"use client"
import useCustomTheme from "@/hooks/useTheme";
import { Flex, Text } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
    const id = query?.get('id');
    const pathname = usePathname()
    const router = useRouter()

    const clickHandler = (item: string) => {
        if(pathname?.includes("edit")){
            if(!item) {
                router.push(`/product/create/events/edit?id=${id}`)
            } else {
                router.push(`/product/create/events/edit?type=${item}&id=${id}`)
            }
        }
    }

    return (
        <Flex bgColor={[mainBackgroundColor, mainBackgroundColor, secondaryBackgroundColor]} flexDir={"column"} p={5} w={["full", "full", "344px"]}  >
            <Flex w={"full"} gap={"3"} pb={["2", "2", "0px"]} position={"relative"} justifyContent={"center"} alignItems={"center"} >
                {type === "info" ? (
                    <Flex onClick={() => router.push("/product/create/events" + (pathname?.includes("edit") ? `/edit?id=${id}` : `/draft?id=${id}`))} pos={"absolute"} insetX={"auto"} left={"0px"} cursor={"pointer"}  >
                        <IoArrowBack size={"25px"} />
                    </Flex>
                ): !type ? (
                    <Flex onClick={() => router.push(pathname?.includes("edit") ? `/product/details/events/${id}` : "/product/events")} pos={"absolute"} insetX={"auto"} left={"0px"} cursor={"pointer"}  >
                        <IoArrowBack size={"25px"} />
                    </Flex>
                ):(
                    <Flex onClick={() => router.back()} pos={"absolute"} insetX={"auto"} left={"0px"} cursor={"pointer"}  >
                        <IoArrowBack size={"25px"} />
                    </Flex>
                )}
                <Text textAlign={"center"} fontWeight={"600"} >{pathname?.includes("draft") ? "Draft" : pathname?.includes("edit") ? "Edit" : "Create"} Event</Text>
            </Flex>
            <Flex display={["none", "none", "flex"]} w={"full"} flexDir={"column"} gap={"4"} mt={"6"} >
                <Flex cursor={"pointer"} onClick={()=> clickHandler("")} w={"full"} flexDir={"column"} gap={"2"} rounded={"lg"} bgColor={mainBackgroundColor} p={"3"}  >
                    <Flex gap={"2"} alignItems={"center"} >
                        <Flex w={"20px"} h={"20px"} borderWidth={"1.5px"} p={"4px"} borderColor={primaryColor} rounded={"full"} >
                            <Flex w={"full"} h={"full"} rounded={"full"} bgColor={primaryColor} />
                        </Flex>
                        <Text fontSize={"16px"} fontWeight={"600"} color={primaryColor} >Theme</Text>
                    </Flex>
                    <Text fontWeight={"600"} fontSize={"14px"} >Tell Us More about your Event</Text>
                    <Text fontSize={"12px"} >Whether it's a conference, seminar, or celebration, let us in on the details. Your event matters, and we're here to ensure it gets the spotlight it deserves.</Text>
                </Flex>
                <Flex cursor={"pointer"} onClick={()=> clickHandler("info")} w={"full"} flexDir={"column"} gap={"2"} rounded={"lg"} bgColor={mainBackgroundColor} p={"3"}  >
                    <Flex gap={"2"} alignItems={"center"} >
                        <Flex w={"20px"} h={"20px"} borderWidth={"1.5px"} p={"4px"} borderColor={!type ? headerTextColor : primaryColor} rounded={"full"} >
                            {type && (
                                <Flex w={"full"} h={"full"} rounded={"full"} bgColor={primaryColor} />
                            )}
                        </Flex>
                        <Text fontSize={"16px"} fontWeight={"600"} color={!type ? headerTextColor : primaryColor} >Information</Text>
                    </Flex>
                    <Text fontWeight={"600"} fontSize={"14px"} >Discover the Details</Text>
                    <Text fontSize={"12px"} >We will like to know the location and schedule for your upcoming event</Text>
                </Flex>
                <Flex cursor={"pointer"} onClick={()=> clickHandler("ticket")} w={"full"} flexDir={"column"} gap={"2"} rounded={"lg"} bgColor={mainBackgroundColor} p={"3"}  >
                    <Flex gap={"2"} alignItems={"center"} >
                        <Flex w={"20px"} h={"20px"} borderWidth={"1.5px"} p={"4px"} borderColor={type !== "ticket" ? headerTextColor : primaryColor} rounded={"full"} >
                            {type === "ticket" && (
                                <Flex w={"full"} h={"full"} rounded={"full"} bgColor={primaryColor} />
                            )}
                        </Flex>
                        <Text fontSize={"16px"} fontWeight={"600"} color={type !== "ticket" ? headerTextColor : primaryColor} >Ticket</Text>
                    </Flex>
                    <Text fontWeight={"600"} fontSize={"14px"} >Effortlessly Invite Attendees with Ticket Generation</Text>
                    <Text fontSize={"12px"} >Streamline Attendance with Seamless Ticket Generation and Invitations</Text>
                </Flex>
            </Flex>
            <Flex w={"full"} fontSize={"14px"} fontWeight={"600"} rounded={"8px"} px={"2"} display={["flex", "flex", "none"]} borderWidth={"1px"} h={"61px"} justifyContent={"space-between"} alignItems={"center"} >
                <Text cursor={"pointer"} onClick={()=> clickHandler("")} color={primaryColor} >Theme</Text>
                <Text cursor={"pointer"} onClick={()=> clickHandler("info")} color={!type ? headerTextColor : primaryColor} >Information</Text>
                <Text cursor={"pointer"} onClick={()=> clickHandler("ticket")} color={type !== "ticket" ? headerTextColor : primaryColor} >Ticket</Text>
            </Flex>
        </Flex>
    )
}