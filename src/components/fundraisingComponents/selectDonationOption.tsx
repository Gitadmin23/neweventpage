"use client"
import useCustomTheme from "@/hooks/useTheme"
import { Flex, Menu, Portal, Text } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation";
import { IoChevronDown } from "react-icons/io5";

export default function SelectDonationOption() {


    const tablist = [
        {
            name: "All Fundraising",
            route: "/product/fundraising"
        },
        {
            name: "My Fundraising",
            route: "?type=my_fundraising"
        },
        {
            name: "Past Fundraising",
            route: "?type=past_fundraising"
        }, 
    ]

    const { borderColor, secondaryBackgroundColor, headerTextColor, mainBackgroundColor, primaryColor } = useCustomTheme()


    const router = useRouter();
    const query = useSearchParams();
    const type = query?.get('type');

    return (
        <Menu.Root >
            <Menu.Trigger cursor={"pointer"} asChild>
                <Flex gap={"3"} borderWidth={"1px"} bgColor={"#F2F4FF"} borderColor={borderColor} rounded={"full"} fontSize={"14px"} h={"45px"} px={"4"} fontWeight={"semibold"} alignItems={"center"} >
                    <Text fontWeight={"semibold"} color={primaryColor} >{type === "past_fundraising" ? "Past Fundraising" : type === "my_fundraising" ? "My Fundraising" : "All Fundraising"}</Text> <IoChevronDown color={primaryColor} />
                </Flex>
            </Menu.Trigger>
            <Portal >
                <Menu.Positioner>
                    <Menu.Content bgColor={mainBackgroundColor} px={"2"} py={"2"} >
                        {tablist?.map((subitem, subindex) => {
                            return (
                                <Menu.Item
                                    borderWidth="0"
                                    outline="none"
                                    bg={(type === subitem?.route?.replace("?type=", "") || (!type && subitem?.name === "All Events")) ? secondaryBackgroundColor : "transparent"}
                                    _hover={{ bg: "transparent" }}
                                    _focus={{ bg: "transparent" }}
                                    _active={{ bg: "transparent" }}
                                    _selected={{ bg: "transparent" }}
                                    cursor={"pointer"}
                                    w={"full"} key={subindex} onClick={() => router?.push(subitem?.route)} color={headerTextColor}
                                    value={subitem?.route} px={"2"} h={"30px"} fontWeight={"medium"} >
                                    {subitem?.name}
                                </Menu.Item>
                            )
                        })}
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}