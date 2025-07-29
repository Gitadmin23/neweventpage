"use client"
import { Flex, Text } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import DonationTermAndCondition from "../shared/donationTermAndCondition";
import useCustomTheme from "@/hooks/useTheme";
import { usePathname, useRouter } from "next/navigation";

export default function FundraisingHeader() {


    const {
        bodyTextColor,
        headerTextColor,
        mainBackgroundColor
    } = useCustomTheme();

    const router = useRouter()

    const pathname = usePathname()

    return (
        <Flex position={"relative"} flexDir={"column"} h={["fit-content", "fit-content", "100vh", "100vh", "100vh"]} width={["full", "full", "full", "full", "546px"]} >
            <Flex pos={["relative", "relative", "relative", "absolute", "absolute"]} bgColor={mainBackgroundColor} top={"0px"} insetX={"0px"} gap={"3"} h={"50px"} px={"4"} alignItems={"center"} >
                <Flex as={"button"} w={"fit-content"} pos={"relative"} zIndex={"20"} cursor={"pointer"} onClick={() => router?.back()} justifyContent={"center"} alignItems={"center"}  >
                    <IoArrowBack size={"25px"} />
                </Flex>
                <Flex display={["flex"]} position={"absolute"} top={"4"} w={"full"} justifyContent={"center"} alignItems={"center"} >
                    <Text fontWeight={"bold"} fontSize={"20px"} >{pathname?.includes("edit") ? "Edit Fundraising" : "Create Fundraising"}</Text>
                </Flex>
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"} flexDir={"column"} px={["4", "4", "4", "12"]} py={"5"} h={["fit-content", "fit-content", "fit-content", "100vh", "100vh"]} width={["full", "full", "full", "full", "546px"]}  >
                <Flex maxW={["full", "full", "full", "full", "420px"]} w={"full"} fontWeight={"700"} flexDir={"column"} >
                    <Text color={headerTextColor} fontSize={["24px", "24px", "24px", "38px"]} lineHeight={["33.6px", "33.6px", "33.6px", "40px"]} >
                        Tells Us More About Your Fundraising.
                    </Text>
                    <Text my={"4"} fontWeight={"400"} color={bodyTextColor} lineHeight={"19.6px"} fontSize={"14px"} >
                        {`Whether it is a crowdfunding, community fundraising or charity fundraising, let us in on the details. Your fundraising matters and we're here to ensure it gets the spotlight it deserves.`}
                    </Text>

                    <Flex w={"full"} justifyContent={"center"} >
                        <DonationTermAndCondition />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}