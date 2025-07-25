"use client"
import httpService from "@/helpers/services/httpService";
import useCustomTheme from "@/hooks/useTheme"
import { Flex, Menu, Portal, Text } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function SelectEventOption() {

    const [data, setData] = useState<Array<{
        value: string,
        label: string
    }>>([])


    const { mutate: fetchData, isPending: isLoading } = useMutation({
        mutationKey: ['userInfo'],
        mutationFn: () =>
            httpService.get("/events/get-event-types"),
        onSuccess: (data: any) => {

            const flavorOptions = data?.data.map((flavor: string) => ({
                value: flavor,
                label: (flavor.charAt(0).toUpperCase() + flavor.slice(1).split("_").join(" "))
            }));

            setData(flavorOptions)

        },
    });

    useEffect(() => {
        fetchData()
    }, [])

    const { borderColor, secondaryBackgroundColor, headerTextColor, mainBackgroundColor, primaryColor } = useCustomTheme()


    const router = useRouter();
    const query = useSearchParams();
    const type = query?.get('category');

    return (
        <Menu.Root >
            <Menu.Trigger cursor={"pointer"} asChild>
                <Flex gap={"3"} borderWidth={"1px"} bgColor={"#F2F4FF"} borderColor={borderColor} rounded={"full"} height={["40px", "40px", "45px"]} fontSize={["12px", "12px","14px"]} px={["3", "3", "4"]} fontWeight={"semibold"} alignItems={"center"} >
                    <Text fontWeight={"semibold"} color={primaryColor} >{type ? type.charAt(0).toUpperCase() + type.slice(1).split("_").join(" ") : "Select Event Catagory"}</Text> <IoChevronDown color={primaryColor} />
                </Flex>
            </Menu.Trigger>
            <Portal >
                <Menu.Positioner>
                    <Menu.Content bgColor={mainBackgroundColor} px={"2"} py={"2"} > 
                        <Menu.Item
                            borderWidth="0"
                            outline="none"
                            bg={(!type) ? secondaryBackgroundColor : "transparent"}
                            _hover={{ bg: "transparent" }}
                            _focus={{ bg: "transparent" }}
                            _active={{ bg: "transparent" }}
                            _selected={{ bg: "transparent" }}
                            cursor={"pointer"}
                            w={"full"} onClick={() => router?.push(`/product/events`)} color={headerTextColor}
                            px={"2"} h={"30px"} value="" fontWeight={"medium"} >
                            {"Select Event Catagory"}
                        </Menu.Item>
                        {data?.map((subitem, subindex) => {
                            return (
                                <Menu.Item
                                    borderWidth="0"
                                    outline="none"
                                    bg={(type === subitem?.value) ? secondaryBackgroundColor : "transparent"}
                                    _hover={{ bg: "transparent" }}
                                    _focus={{ bg: "transparent" }}
                                    _active={{ bg: "transparent" }}
                                    _selected={{ bg: "transparent" }}
                                    cursor={"pointer"}
                                    w={"full"} key={subindex} onClick={() => router?.push(`/product/events?category=${subitem.value}`)} color={headerTextColor}
                                    value={subitem?.value} px={"2"} h={"30px"} fontWeight={"medium"} >
                                    {subitem?.label}
                                </Menu.Item>
                            )
                        })}
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}