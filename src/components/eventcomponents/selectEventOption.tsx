"use client"
import useCustomTheme from "@/hooks/useTheme"
import { Flex, Menu, Portal, Text } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation";
import { IoChevronDown } from "react-icons/io5";

export default function SelectEventOption() {


    const tablist = [
        {
            name: "All Events",
            route: "/product/events"
        },
        {
            name: "My Events",
            route: "?type=my_event"
        },
        {
            name: "Past Events",
            route: "?type=past_event"
        },
        {
            name: "Saved Events",
            route: "?type=saved_event"
        },
        {
            name: "Draft",
            route: "?type=draft"
        }
    ]

    const { borderColor, secondaryBackgroundColor, headerTextColor, mainBackgroundColor } = useCustomTheme()


    const router = useRouter();
    const query = useSearchParams();
    const type = query?.get('type');

    return (
        <Menu.Root >
            <Menu.Trigger cursor={"pointer"} asChild>
                <Flex gap={"3"} borderWidth={"1px"} borderColor={borderColor} rounded={"full"} fontSize={"14px"} h={"45px"} px={"3"} fontWeight={"semibold"} alignItems={"center"} >
                    <Text fontWeight={"semibold"} >{type === "saved_event" ? "Saved Events" : type === "past_event" ? "Past Events" : type === "my_event" ? "My Events" : type === "draft" ? "Draft" : "All Events"}</Text> <IoChevronDown color={headerTextColor} />
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