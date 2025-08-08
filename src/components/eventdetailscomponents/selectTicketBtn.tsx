import { Badge, Flex, IconButton, Text } from "@chakra-ui/react";
import { CustomButton, ModalLayout, ProductImageScroller } from "../shared";
import React, { useEffect, useState } from "react";
import { IEventType, IProductTypeData } from "@/helpers/models/event";
import { dateFormat, timeFormat } from "@/helpers/utils/dateFormat";
import { formatNumberWithK, numberFormatNaire } from "@/helpers/utils/formatNumberWithK";
import useCustomTheme from "@/hooks/useTheme";
import usePayStack from "@/hooks/usePayStack";
import { ShoppingCart } from "iconsax-react";
import { toaster } from "../ui/toaster";
import { capitalizeFLetter } from "@/helpers/utils/capitalLetter";

interface ITicket {
    "ticketType": string,
    "numberOfTickets": number
}

export default function SelectTicketBtn(
    {
        picUrls,
        eventName,
        startDate,
        productTypeData,
        id
    }: IEventType
) {

    const { payForTicket, setOpen, open, openMobile, setOpenMobile } = usePayStack()

    const {
        secondaryBackgroundColor,
        headerTextColor,
        primaryColor
    } = useCustomTheme()

    const [selectTicketType, setSelectTicketType] = useState<Array<ITicket>>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const checkType = (type: string) => {

        const index = selectTicketType.findIndex(ticket => ticket.ticketType === type);

        return index
    }

    const checkTypeLabel = (type: string) => {

        const index = productTypeData.findIndex(ticket => ticket.ticketType === type);

        return index
    }

    const clickHandler = ({ item, type }: { item: IProductTypeData, type: "increase" | "reduce" }) => {

        let clone = [...selectTicketType]

        const index = checkType(item.ticketType);

        if (selectTicketType?.length > 0) {
            if (index > -1) {
                if (type === "increase") {
                    if (((clone[index].numberOfTickets + 1) + Number(item?.ticketsSold)) > Number(item.totalNumberOfTickets)) {
                        toaster.create({
                            title: `Remaining ticket is ${clone[index].numberOfTickets}`,
                            type: "error",
                            closable: true,
                        });
                    } else if (Number(item?.totalNumberOfTickets) - Number(item?.ticketsSold) > 0) {

                        if (clone[index].numberOfTickets >= Number(item?.maxTicketBuy)) {
                            toaster.create({
                                title: `Maximum ticket is ${item?.maxTicketBuy}`,
                                type: "error",
                                closable: true,
                            });
                        } else {
                            clone[index] = {
                                ticketType: item.ticketType,
                                numberOfTickets: clone[index].numberOfTickets + 1
                            }
                            setTotalPrice(totalPrice + Number(item.ticketPrice))
                        }
                    }
                } else {
                    if (clone[index].numberOfTickets - 1 === 0) {
                        clone = clone.filter(ticket => ticket.ticketType !== item.ticketType)
                        setTotalPrice(totalPrice - Number(item.ticketPrice))
                    } else if (clone[index].numberOfTickets >= 0) {
                        clone[index] = {
                            ticketType: item.ticketType,
                            numberOfTickets: clone[index].numberOfTickets - 1
                        }
                        setTotalPrice(totalPrice - Number(item.ticketPrice))
                    }
                }
            } else {
                clone.push({
                    ticketType: item.ticketType,
                    numberOfTickets: 1
                })
                setTotalPrice(totalPrice + Number(item.ticketPrice))
            }

        } else {
            if (type === "increase") {
                clone.push({
                    ticketType: item.ticketType,
                    numberOfTickets: 1
                })
                setTotalPrice(totalPrice + Number(item.ticketPrice))
            }

        }
        setSelectTicketType(clone)
    }

    useEffect(() => {
        setSelectTicketType([] as any)
    }, [open])

    const submitHandler = React.useCallback(() => {
        payForTicket.mutate(
            {
                "eventID": id,
                "ticketBuyObjectList": selectTicketType,
            }
        )
    }, [payForTicket])

    useEffect(() => {
        setTotalPrice(0)
    }, [open, openMobile])

    return (
        <Flex w={"full"} gap={"2"} flexDir={"column"} >
            <Text fontWeight={"500"} fontSize={["xs", "xs", "sm"]} >See ticket available for this event</Text>
            <Flex w={"full"} justifyContent={"end"} >
                <CustomButton onClick={() => setOpen(true)} borderRadius={"999px"} fontSize={"14px"} text={"Select Ticket here"} />
            </Flex> 
            <ModalLayout size={["full", "full", "xl"]} closeBtn={true} open={open} close={() => setOpen(false)} trigger={true} >
                <Flex w={"full"} maxH={"100vh"} display={["flex", "flex", "none"]} h={"full"} overflowY={"auto"} >
                    <Flex flexDir={"column"} h={"full"} py={"6"} w={"full"}>
                        <Flex flexDir={"column"} h={"fit-content"} gap={"7"} px={"3"} w={"full"} >
                            <Flex flexDirection={"column"} textAlign={"center"} w={"full"} pb={"2"} borderBottomWidth={"1px"} gap={"1"} >
                                <Text fontWeight={"700"} fontSize={"25px"} >{eventName}</Text>
                                <Text fontSize={"14px"} >{dateFormat(startDate)}</Text>
                            </Flex>
                            <Flex w={"full"}>
                                <ProductImageScroller objectFit={"cover"} images={picUrls} height={"200px"} />
                            </Flex>
                            <Flex flexDir={"column"} w={"full"} >
                                <Flex flexDir={"column"} h={"auto"} gap={"3"} >
                                    {productTypeData?.map((item, index) => {
                                        if (new Date(Number(item?.startDate)) <= new Date() && item.ticketType === "Early Bird") {
                                            return (
                                                <Flex flexDir={["column", "column", "row"]} gap={"2"} _hover={{ borderColor: primaryColor }} key={index} w={"full"} borderWidth={"1px"} justifyContent={"space-between"} rounded={"8px"} px={"4"} py={"4"} >
                                                    <Flex flexDir={"column"} gap={"2"} >
                                                        <Text fontWeight={"semibold"} >{capitalizeFLetter(item.ticketType)} {formatNumberWithK(item?.ticketPrice, false)}</Text>
                                                        {item.ticketType === "Early Bird" ? (
                                                            <>
                                                                {((Number(item?.totalNumberOfTickets) - Number(item?.ticketsSold) === 0) || (new Date(Number(item?.endDate)) < new Date())) ?
                                                                    <Badge maxW={"100%"} w={"fit-content"} colorPalette={"red"} fontSize={"xs"} px={"3"} rounded={"full"} >
                                                                        Tickets sold out
                                                                    </Badge>
                                                                    :
                                                                    <Badge maxW={"100%"} w={"fit-content"} py={"1"} whiteSpace={"break-spaces"} colorPalette={"red"} fontSize={"xs"} px={"3"} rounded={"full"} >
                                                                        Sales ends on {dateFormat(item.endDate)} {timeFormat(item.endDate)}
                                                                    </Badge>
                                                                }
                                                            </>
                                                        ) : (
                                                            <>
                                                                {(Number(item?.totalNumberOfTickets) - Number(item?.ticketsSold) === 0) ?
                                                                    <Badge maxW={"100%"} w={"fit-content"} colorPalette={"red"} fontSize={"xs"} px={"3"} rounded={"full"} >
                                                                        Tickets sold out
                                                                    </Badge>
                                                                    :
                                                                    <Badge maxW={"100%"} w={"fit-content"} colorPalette={"blue"} fontSize={"xs"} px={"3"} rounded={"full"} >
                                                                        Total Tickets avaliable - {Number(item?.totalNumberOfTickets) - Number(item?.ticketsSold)}
                                                                    </Badge>
                                                                }
                                                            </>
                                                        )}
                                                    </Flex>
                                                    <Flex gap={"3"} alignItems={"center"} mx={"auto"} >
                                                        <IconButton onClick={() => clickHandler({
                                                            item: item,
                                                            type: "reduce"
                                                        })} bgColor={secondaryBackgroundColor}
                                                            disabled={selectTicketType[checkType(item.ticketType)]?.numberOfTickets === 0 || !selectTicketType[checkType(item.ticketType)]?.numberOfTickets}
                                                            color={headerTextColor} rounded={"full"} size="sm">
                                                            {/* <LuMinus /> */}
                                                            <Text fontWeight={"500"} fontSize={"25px"} >-</Text>
                                                        </IconButton>
                                                        {selectTicketType[checkType(item.ticketType)]?.numberOfTickets ?? "0"}
                                                        <IconButton disabled={Number(item?.totalNumberOfTickets) === Number(item?.ticketsSold) || (new Date(Number(item?.endDate)) < new Date())} onClick={() => clickHandler({
                                                            item: item,
                                                            type: "increase"
                                                        })} bgColor={secondaryBackgroundColor} color={headerTextColor} rounded={"full"} size="sm">
                                                            {/* <LuPlus /> */}

                                                            <Text fontWeight={"500"} fontSize={"25px"} >+</Text>
                                                        </IconButton>
                                                    </Flex>
                                                </Flex>
                                            )
                                        } else if (item.ticketType !== "Early Bird") {
                                            return (
                                                <Flex flexDir={["column", "column", "row"]} gap={"2"} _hover={{ borderColor: primaryColor }} key={index} w={"full"} borderWidth={"1px"} justifyContent={"space-between"} rounded={"8px"} px={"4"} py={"4"} >
                                                    <Flex flexDir={"column"} gap={"2"} >
                                                        <Text fontWeight={"semibold"} >{capitalizeFLetter(item.ticketType)} {formatNumberWithK(item?.ticketPrice, false)}</Text>
                                                        {item.ticketType === "Early Bird" ? (
                                                            <>
                                                                {((Number(item?.totalNumberOfTickets) - Number(item?.ticketsSold) === 0) || (new Date(Number(item?.endDate)) < new Date())) ?
                                                                    <Badge maxW={"100%"} w={"fit-content"} colorPalette={"red"} fontSize={"xs"} px={"3"} rounded={"full"} >
                                                                        Tickets sold out
                                                                    </Badge>
                                                                    :
                                                                    <Badge maxW={"100%"} w={"fit-content"} py={"1"} whiteSpace={"break-spaces"} colorPalette={"red"} fontSize={"xs"} px={"3"} rounded={"full"} >
                                                                        Sales ends on {dateFormat(item.endDate)} {timeFormat(item.endDate)}
                                                                    </Badge>
                                                                }
                                                            </>
                                                        ) : (
                                                            <>
                                                                {(Number(item?.totalNumberOfTickets) - Number(item?.ticketsSold) === 0) ?
                                                                    <Badge maxW={"100%"} w={"fit-content"} colorPalette={"red"} fontSize={"xs"} px={"3"} rounded={"full"} >
                                                                        Tickets sold out
                                                                    </Badge>
                                                                    :
                                                                    <Badge maxW={"100%"} w={"fit-content"} colorPalette={"blue"} fontSize={"xs"} px={"3"} rounded={"full"} >
                                                                        Total Tickets avaliable - {Number(item?.totalNumberOfTickets) - Number(item?.ticketsSold)}
                                                                    </Badge>
                                                                }
                                                            </>
                                                        )}
                                                    </Flex>
                                                    <Flex gap={"3"} alignItems={"center"} mx={"auto"} >
                                                        <IconButton onClick={() => clickHandler({
                                                            item: item,
                                                            type: "reduce"
                                                        })} bgColor={secondaryBackgroundColor}
                                                            disabled={selectTicketType[checkType(item.ticketType)]?.numberOfTickets === 0 || !selectTicketType[checkType(item.ticketType)]?.numberOfTickets}
                                                            color={headerTextColor} rounded={"full"} size="sm">
                                                            {/* <LuMinus /> */}
                                                            <Text fontWeight={"500"} fontSize={"25px"} >-</Text>
                                                        </IconButton>
                                                        {selectTicketType[checkType(item.ticketType)]?.numberOfTickets ?? "0"}
                                                        <IconButton disabled={Number(item?.totalNumberOfTickets) === Number(item?.ticketsSold) || (new Date(Number(item?.endDate)) < new Date())} onClick={() => clickHandler({
                                                            item: item,
                                                            type: "increase"
                                                        })} bgColor={secondaryBackgroundColor} color={headerTextColor} rounded={"full"} size="sm">
                                                            {/* <LuPlus /> */}

                                                            <Text fontWeight={"500"} fontSize={"25px"} >+</Text>
                                                        </IconButton>
                                                    </Flex>
                                                </Flex>
                                            )
                                        }
                                    })}
                                </Flex>
                            </Flex>
                            <Text fontWeight={"medium"} mr={"auto"} >Powered by <span style={{ color: primaryColor, fontStyle: "italic" }} >Chasescroll.com</span></Text>
                        </Flex>
                        <Flex bgColor={secondaryBackgroundColor} rounded={"8px"} w={"full"} p={"4"} flexDir={"column"} gap={"4"} >
                            {selectTicketType.length > 0 ? (
                                <Flex h={"full"} px={"3"} pb={"4"} textAlign={"left"} flexDir={"column"} gap={"4"} >
                                    <Text fontWeight={"500"} fontSize={"18px"} >Order summary</Text>
                                    {selectTicketType?.map((item, index) => {
                                        return (
                                            <Flex key={index} w={"full"} fontWeight={"500"} justifyContent={"space-between"} alignItems={"center"} >
                                                <Text>{item.numberOfTickets} x {capitalizeFLetter(item.ticketType)}</Text>
                                                <Text>{numberFormatNaire(productTypeData[checkTypeLabel(item.ticketType)]?.ticketPrice ?? 0)}</Text>
                                            </Flex>
                                        )
                                    })}
                                    <Flex mt={"auto"} w={"full"} fontWeight={"500"} justifyContent={"space-between"} alignItems={"center"} >
                                        <Text fontSize={"lg"} fontWeight={"600"} >Total</Text>
                                        <Text fontSize={"lg"} fontWeight={"600"} >{numberFormatNaire(totalPrice)}</Text>
                                    </Flex>
                                </Flex>
                            ) : (
                                <Flex w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} >
                                    <ShoppingCart size={"60px"} color="gray" opacity={"50%"} />
                                </Flex>
                            )}
                        </Flex>
                        <Flex w={"full"} justifyContent={"end"} pt={"4"} px={"4"} borderTopWidth={"1px"} mt={"auto"} >
                            <CustomButton height={"35px"} fontSize={"14px"} loading={payForTicket.isPending} onClick={submitHandler} disable={selectTicketType.length > 0 ? false : true} width={"fit-content"} text={"Get Ticket"} px={"6"} borderRadius={"999px"} />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"full"} h={"70vh"} display={["none", "none", "flex"]} justifyContent={"center"} alignItems={"center"} >
                    <Flex p={"5"} h={"full"} borderWidth={"1px"} rounded={"2xl"} gap={"4"} w={"full"} maxW={"1032px"} >
                        <Flex flexDir={"column"} alignItems={"center"} gap={"7"} px={"3"} w={"full"} >
                            <Flex flexDirection={"column"} textAlign={"center"} w={"full"} pb={"2"} borderBottomWidth={"1px"} gap={"1"} >
                                <Text fontWeight={"700"} fontSize={"25px"} >{eventName}</Text>
                                <Text fontSize={"14px"} >{dateFormat(startDate)}</Text>
                            </Flex>
                            <Flex flexDir={"column"} h={"full"} w={"full"} overflowY={"auto"} pr={"4"} >
                                <Flex flexDir={"column"} h={"auto"} gap={"3"} >
                                    {productTypeData?.map((item, index) => {
                                        if (new Date(Number(item?.startDate)) <= new Date() && item.ticketType === "Early Bird") {
                                            return (
                                                <Flex _hover={{ borderColor: primaryColor }} key={index} w={"full"} borderWidth={"1px"} justifyContent={"space-between"} alignItems={"center"} rounded={"8px"} px={"4"} height={"110px"} >
                                                    <Flex flexDir={"column"} gap={"2"} >
                                                        <Text fontWeight={"semibold"} >{capitalizeFLetter(item.ticketType)} {formatNumberWithK(item?.ticketPrice, false)}</Text>
                                                        {item.ticketType === "Early Bird" ? (
                                                            <>
                                                                {((Number(item?.totalNumberOfTickets) - Number(item?.ticketsSold) === 0) || (new Date(Number(item?.endDate)) < new Date())) ?
                                                                    <Badge colorPalette={"red"} fontSize={"sm"} px={"3"} rounded={"full"} >
                                                                        Tickets sold out
                                                                    </Badge>
                                                                    :
                                                                    <Badge colorPalette={"red"} fontSize={"sm"} px={"3"} rounded={"full"} >
                                                                        Sales ends on {dateFormat(item.endDate)} {timeFormat(item.endDate)}
                                                                    </Badge>
                                                                }
                                                            </>
                                                        ) : (
                                                            <>
                                                                {(Number(item?.totalNumberOfTickets) - Number(item?.ticketsSold) === 0) ?
                                                                    <Badge colorPalette={"red"} fontSize={"sm"} px={"3"} rounded={"full"} >
                                                                        Tickets sold out
                                                                    </Badge>
                                                                    :
                                                                    <Badge colorPalette={"blue"} fontSize={"sm"} px={"3"} rounded={"full"} >
                                                                        Total Tickets avaliable - {Number(item?.totalNumberOfTickets) - Number(item?.ticketsSold)}
                                                                    </Badge>
                                                                }
                                                            </>
                                                        )}
                                                    </Flex>
                                                    <Flex gap={"3"} alignItems={"center"} >
                                                        <IconButton onClick={() => clickHandler({
                                                            item: item,
                                                            type: "reduce"
                                                        })} bgColor={secondaryBackgroundColor}
                                                            disabled={selectTicketType[checkType(item.ticketType)]?.numberOfTickets === 0 || !selectTicketType[checkType(item.ticketType)]?.numberOfTickets}
                                                            color={headerTextColor} rounded={"full"} size="sm">
                                                            {/* <LuMinus /> */}
                                                            <Text fontWeight={"500"} fontSize={"25px"} >-</Text>
                                                        </IconButton>
                                                        {selectTicketType[checkType(item.ticketType)]?.numberOfTickets ?? "0"}
                                                        <IconButton disabled={Number(item?.totalNumberOfTickets) === Number(item?.ticketsSold) || (new Date(Number(item?.endDate)) < new Date())} onClick={() => clickHandler({
                                                            item: item,
                                                            type: "increase"
                                                        })} bgColor={secondaryBackgroundColor} color={headerTextColor} rounded={"full"} size="sm">
                                                            {/* <LuPlus /> */}

                                                            <Text fontWeight={"500"} fontSize={"25px"} >+</Text>
                                                        </IconButton>
                                                    </Flex>
                                                </Flex>
                                            )
                                        } else if (item.ticketType !== "Early Bird") {
                                            return (
                                                <Flex _hover={{ borderColor: primaryColor }} key={index} w={"full"} borderWidth={"1px"} justifyContent={"space-between"} alignItems={"center"} rounded={"8px"} px={"4"} height={"110px"} >
                                                    <Flex flexDir={"column"} gap={"2"} >
                                                        <Text fontWeight={"semibold"} >{capitalizeFLetter(item.ticketType)} {formatNumberWithK(item?.ticketPrice, false)}</Text>
                                                        {item.ticketType === "Early Bird" ? (
                                                            <>
                                                                {((Number(item?.totalNumberOfTickets) - Number(item?.ticketsSold) === 0) || (new Date(Number(item?.endDate)) < new Date())) ?
                                                                    <Badge colorPalette={"red"} fontSize={"sm"} px={"3"} rounded={"full"} >
                                                                        Tickets sold out
                                                                    </Badge>
                                                                    :
                                                                    <Badge colorPalette={"red"} fontSize={"sm"} px={"3"} rounded={"full"} >
                                                                        Sales ends on {dateFormat(item.endDate)} {timeFormat(item.endDate)}
                                                                    </Badge>
                                                                }
                                                            </>
                                                        ) : (
                                                            <>
                                                                {(Number(item?.totalNumberOfTickets) - Number(item?.ticketsSold) === 0) ?
                                                                    <Badge colorPalette={"red"} fontSize={"sm"} px={"3"} rounded={"full"} >
                                                                        Tickets sold out
                                                                    </Badge>
                                                                    :
                                                                    <Badge colorPalette={"blue"} fontSize={"sm"} px={"3"} rounded={"full"} >
                                                                        Total Tickets avaliable - {Number(item?.totalNumberOfTickets) - Number(item?.ticketsSold)}
                                                                    </Badge>
                                                                }
                                                            </>
                                                        )}
                                                    </Flex>
                                                    <Flex gap={"3"} alignItems={"center"} >
                                                        <IconButton onClick={() => clickHandler({
                                                            item: item,
                                                            type: "reduce"
                                                        })} bgColor={secondaryBackgroundColor}
                                                            disabled={selectTicketType[checkType(item.ticketType)]?.numberOfTickets === 0 || !selectTicketType[checkType(item.ticketType)]?.numberOfTickets}
                                                            color={headerTextColor} rounded={"full"} size="sm">
                                                            {/* <LuMinus /> */}
                                                            <Text fontWeight={"500"} fontSize={"25px"} >-</Text>
                                                        </IconButton>
                                                        {selectTicketType[checkType(item.ticketType)]?.numberOfTickets ?? "0"}
                                                        <IconButton disabled={Number(item?.totalNumberOfTickets) === Number(item?.ticketsSold) || (new Date(Number(item?.endDate)) < new Date())} onClick={() => clickHandler({
                                                            item: item,
                                                            type: "increase"
                                                        })} bgColor={secondaryBackgroundColor} color={headerTextColor} rounded={"full"} size="sm">
                                                            {/* <LuPlus /> */}

                                                            <Text fontWeight={"500"} fontSize={"25px"} >+</Text>
                                                        </IconButton>
                                                    </Flex>
                                                </Flex>
                                            )
                                        }
                                    })}
                                </Flex>
                            </Flex>
                            <Text fontWeight={"medium"} mr={"auto"} >Powered by <span style={{ color: primaryColor, fontStyle: "italic" }} >Chasescroll.com</span></Text>
                            <Flex w={"full"} justifyContent={"end"} pt={"4"} borderTopWidth={"1px"} mt={"auto"} >
                                <CustomButton height={"35px"} fontSize={"14px"} loading={payForTicket.isPending} onClick={submitHandler} disable={selectTicketType.length > 0 ? false : true} width={"fit-content"} text={"Get Ticket"} px={"6"} borderRadius={"999px"} />
                            </Flex>
                        </Flex>
                        <Flex bgColor={secondaryBackgroundColor} rounded={"8px"} w={"fit-content"} flexDir={"column"} gap={"4"} >
                            <Flex w={"350px"} >
                                <ProductImageScroller objectFit={"cover"} images={picUrls} height={"200px"} />
                            </Flex>
                            {selectTicketType.length > 0 ? (
                                <Flex h={"full"} px={"3"} pb={"4"} textAlign={"left"} flexDir={"column"} gap={"4"} >
                                    <Text fontWeight={"500"} fontSize={"18px"} >Order summary</Text>
                                    {selectTicketType?.map((item, index) => {
                                        return (
                                            <Flex key={index} w={"full"} fontWeight={"500"} justifyContent={"space-between"} alignItems={"center"} >
                                                <Text>{item.numberOfTickets} x {capitalizeFLetter(item.ticketType)}</Text>
                                                <Text>{numberFormatNaire(productTypeData[checkTypeLabel(item.ticketType)]?.ticketPrice ?? 0)}</Text>
                                            </Flex>
                                        )
                                    })}
                                    <Flex mt={"auto"} w={"full"} fontWeight={"500"} justifyContent={"space-between"} alignItems={"center"} >
                                        <Text fontSize={"lg"} fontWeight={"600"} >Total</Text>
                                        <Text fontSize={"lg"} fontWeight={"600"} >{numberFormatNaire(totalPrice)}</Text>
                                    </Flex>
                                </Flex>
                            ) : (
                                <Flex w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} >
                                    <ShoppingCart size={"60px"} color="gray" opacity={"50%"} />
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </ModalLayout> 
        </Flex>
    )
}