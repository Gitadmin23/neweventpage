import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import useCustomTheme from '@/hooks/useTheme'
import { IoIosClose } from 'react-icons/io'
import EventApplication from './eventApplication'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { IEventType } from '@/helpers/models/event'
import { CustomButton, LoadingAnimation, ModalLayout } from '../shared'

export default function ViewRequest(props: IEventType) {

    const { primaryColor, borderColor, mainBackgroundColor } = useCustomTheme()

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(false)


    const { results, isLoading, ref, data } = InfiniteScrollerComponent({
        url: `/event-application/search?eventID=${props?.id}&applicationType=SERVICE`, limit: 20, filter: "id", name: "event-application"
    })

    const { results: rentalData, isLoading: loadingRental, ref: refRental, data: rentalAllData } = InfiniteScrollerComponent({
        url: `/event-application/search?eventID=${props?.id}&applicationType=RENTAL`, limit: 20, filter: "id", name: "event-application"
    })

    console.log(rentalAllData);

    console.log(data);


    return (
        <LoadingAnimation loading={isLoading || loadingRental} >
            <Flex h={"130px"} display={"flex"} justifyContent={"center"} bgColor={mainBackgroundColor} flexDir={"column"} borderWidth={"1px"} rounded={"8px"} p={"3"} gap={"3"}  >
                <Flex gap={"3"} alignItems={"center"} > 
                <Text fontSize={"14px"} fontWeight={"500"} >Support Request</Text>
                <Flex w={"7"} h={"7"} justifyContent={"center"} alignItems={"center"} rounded={"full"} bgColor={primaryColor} >
                    <span style={{ fontWeight: "600", color: "white" }} >{data?.totalElements + rentalAllData?.totalElements}</span>
                </Flex>
                </Flex>
                <CustomButton onClick={() => setOpen(true)} text={"View proposal"} fontSize={"14px"} width={"150px"} borderWidth={"1px"} borderColor={primaryColor} color={primaryColor} backgroundColor={mainBackgroundColor} />
                <ModalLayout size={"full"} trigger={true} open={open} close={() => setOpen(false)} >
                    <Flex w={"full"} flexDir={"column"} p={"4"} gap={"4"} >
                        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                            <Flex >
                                <Flex pb={"1"} as={"button"} onClick={() => setTab(false)} px={"3"} borderBottomWidth={"2px"} borderBottomColor={!tab ? primaryColor : borderColor} >
                                    <Text fontWeight={"500"} fontSize={"sm"} >Services </Text>
                                </Flex>
                                <Flex pb={"1"} as={"button"} onClick={() => setTab(true)} px={"3"} borderBottomWidth={"2px"} borderBottomColor={tab ? primaryColor : borderColor}  >
                                    <Text fontWeight={"500"} fontSize={"sm"} >Rentals </Text>
                                </Flex>
                            </Flex>
                            <Flex onClick={() => setOpen(false)} as={"button"} >
                                <IoIosClose size={"25px"} />
                            </Flex>
                        </Flex>
                        {!tab && (
                            <EventApplication results={results} loading={isLoading} type="SERVICE" />
                        )}
                        {tab && (
                            <EventApplication results={rentalData} loading={loadingRental} type="RENTAL" />
                        )}
                    </Flex>
                </ModalLayout>
            </Flex>
        </LoadingAnimation>
    )
}
