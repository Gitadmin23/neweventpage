import useCustomTheme from '@/hooks/useTheme'
import { Button, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import usePr from '@/hooks/usePr'
import { IoClose } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { IEventType } from '@/helpers/models/event'
import { IDonationList } from '@/helpers/models/fundraising'
import httpService from '@/helpers/services/httpService'
import { IMAGE_URL } from '@/helpers/services/urls'
import { capitalizeFLetter } from '@/helpers/utils/capitalLetter'
import { textLimit } from '@/helpers/utils/textlimit'
import { useMutation, useQuery } from '@tanstack/react-query'
import PrBtn from '../prcomponent/prBtn'
import { DonationGraph, LoadingAnimation, ModalLayout } from '../shared'
import DonationBtn from '../shared/donationBtn'
import { useFetchData } from '@/hooks/useFetchData'

export default function EventDonation({ checkbox, item }: { checkbox?: boolean, item: IEventType }) {

    const { borderColor, bodyTextColor, secondaryBackgroundColor, mainBackgroundColor, primaryColor } = useCustomTheme()
    const router = useRouter()

    const [eventData, setEventData] = useState({} as {
        "id": string,
        "createdDate": number,
        "lastModifiedBy": string,
        "createdBy": string,
        "lastModifiedDate": number,
        "isDeleted": boolean,
        "status": string,
        "statusCode": number,
        "returnMessage": string,
        "user": string,
        "fundRaiser": IDonationList,
        "eventID": string
    })

    const { deleteFundraising, open, setOpen } = usePr()

    // const { mutate: fetchData, isPending: isLoading } = useMutation({
    //     mutationKey: ['all-donation', item?.id, open],
    //     mutationFn: () =>
    //         httpService.get(`/pinned-fundraisers/get-pinned-event-fundraising/${item?.id}`, {
    //             params: {
    //                 id: item?.id
    //             }
    //         }),
    //     onSuccess: (data: any) => {
    //         if (data?.data?.length > 0) {
    //             setEventData(data?.data[0])
    //         } else {
    //             setEventData({} as any)
    //         }
    //     },
    // });

    // useEffect(() => {
    //     fetchData();
    // }, [])


    const { data, isLoading } = useFetchData<any>({
        name: "all-donation", endpoint: `/pinned-fundraisers/get-pinned-event-fundraising/${item?.id}`, id: item?.id, params: {
            id: item?.id
        }
    });

    console.log(data);



    const removeHandler = () => {
        deleteFundraising?.mutate(data[0]?.id + "")
    }

    const openHandler = (e: any) => {
        e.stopPropagation()
        setOpen(true)
    }

    const clickHandler = (item: any) => {
        router?.push("/dashboard/donation/" + item)
    }


    return (
        <LoadingAnimation loading={isLoading} >
            {data?.length > 0 && (
                <Flex flexDir={"column"} w={"full"} gap={"2"} display={(data[0]?.fundRaiser?.name || item?.isOrganizer) ? "flex" : "none"} >
                    <Text fontSize={"14px"} fontWeight={"500"} >{item?.isOrganizer ? "Get Support for your Event" : "Fundraising available"}</Text>
                    {(data[0]?.fundRaiser?.name) && (
                        <Flex onClick={() => clickHandler(data[0]?.fundRaiser?.id)} bgColor={mainBackgroundColor} pos={"relative"} role="button" display={data[0]?.fundRaiser?.name ? "flex" : "none"} flexDir={["row"]} w={"full"} rounded={"8px"} gap={["2", "2", "2"]} borderWidth={"1px"} borderColor={borderColor} px={["2", "2", "3"]} h={["auto", "auto", "130px"]} py={"2"} alignItems={"center"} >
                            {item?.isOrganizer && (
                                <Flex w={"6"} h={"6"} onClick={(e) => openHandler(e)} justifyContent={"center"} alignItems={"center"} pos={"absolute"} top={"-14px"} right={"-8px"} zIndex={"50"} bg={"#F2A09B66"} color={"#F50A0A"} rounded={"full"} >
                                    <IoClose size={"14px"} />
                                </Flex>
                            )}
                            <Flex w={"fit-content"} >
                                <Flex w={["80px", "80px", "150px"]} height={["80px", "80px", "100px"]} bgColor={secondaryBackgroundColor} rounded={"8px"} borderWidth={"1px"} borderColor={borderColor} >
                                    <Image rounded={"8px"} objectFit="cover" alt={data[0]?.fundRaiser?.name} width={"full"} height={["80px", "80px", "100px"]} src={IMAGE_URL + data[0]?.fundRaiser?.bannerImage} />
                                </Flex>
                            </Flex>
                            <Flex w={"full"} flexDir={"column"} gap={2} pr={"3"} >
                                <Flex w={"full"} justifyContent={"space-between"} gap={"3"} alignItems={"center"} >
                                    <Flex flexDir={"column"} >
                                        <Text fontSize={["10px", "10px", "12px"]} color={bodyTextColor} >Fundraising</Text>
                                        <Text fontWeight={"600"} fontSize={["12px", "12px", "14px"]} >{textLimit(capitalizeFLetter(data[0]?.fundRaiser?.name), 30)}</Text>
                                    </Flex>
                                    {/* <ShareEvent newbtn={true} showText={false} size='20px' data={data[0]?.fundRaiser} id={data[0]?.fundRaiser?.id} type="DONATION" eventName={textLimit(data[0]?.fundRaiser?.name, 17)} /> */}
                                </Flex>
                                <DonationGraph item={data[0]?.fundRaiser} IsEvent={true} />
                            </Flex>
                            {!checkbox && (
                                <DonationBtn item={data[0]?.fundRaiser} user={data[0]?.fundRaiser?.createdBy} event={true} />
                            )}
                        </Flex>
                    )}
                    <ModalLayout open={open} trigger={true} close={() => setOpen(false)} size={"xs"} >
                        <Flex width='100%' justifyContent={'center'} p={"4"} height='100%' alignItems={'center'} flexDir={"column"} gap={3}>
                            <Image alt='delete' src='/images/deleteaccount.svg' />
                            <Text fontWeight={"700"} textAlign={'center'} fontSize={'20px'}>Remove Fundraising </Text>
                            <Text textAlign={'center'} fontSize={'14px'} >Are you sure you want to remove <span style={{ fontWeight: "bold" }} >{capitalizeFLetter(data[0]?.fundRaiser?.name)}</span>, this action cannot be undone.</Text>
                            <Button rounded={"full"} disabled={deleteFundraising.isPending} onClick={removeHandler} loading={deleteFundraising.isPending} fontSize={"14px"} width='100%' height='42px' bg='red' color="white" variant='solid'>Remove</Button>
                            <Button rounded={"full"} variant={"outline"} bgColor={mainBackgroundColor} borderColor={primaryColor} onClick={() => setOpen(false)} width='100%' height='42px' borderWidth={'1px'} color={primaryColor}>Cancel</Button>
                        </Flex>
                    </ModalLayout>
                </Flex>
            )} 
            {(item?.isOrganizer && data?.length === 0) && (
                <PrBtn data={item} donation={true} />
            )}
        </LoadingAnimation>
    )
}