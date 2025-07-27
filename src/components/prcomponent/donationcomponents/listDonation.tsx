"use client"
import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import EventDonationPicker from './eventDonationPicker'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import usePr from '@/hooks/usePr'
import { useRouter } from 'next/navigation'
import { toaster } from '@/components/ui/toaster'
import { CustomButton, LoadingAnimation } from '@/components/shared'
import { IDonationList } from '@/helpers/models/fundraising'
import httpService from '@/helpers/services/httpService'
import { useMutation } from '@tanstack/react-query'
import { IEventType } from '@/helpers/models/event'

export default function ListDonation({ item, length, setOpen }: { setSelectDonation: any, setSelectInitialDonation: any, selectDonation: string, initialDonation: string, item: IEventType, length: any, setOpen: any }) {


    const search = ""

    const router = useRouter()
    const [selectDonation, setSelectDonation] = useState("")
    const [selectDonationInitial, setSelectDonationInitial] = useState("")

    const { createFundraising } = usePr()
    const { results, isLoading: loadingList, ref, } = InfiniteScrollerComponent({ url: `/fund-raiser/user-fund-raisers${search ? `?name=${search}` : ``}`, limit: 20, filter: "id", name: "donationlist", search: search })



    const { mutate: fetchData, isPending: isLoading, data, isError } = useMutation({
        mutationKey: ['all-donation', item?.id],
        mutationFn: () =>
            httpService.get(`/pinned-fundraisers/get-pinned-event-fundraising/${item?.id}`, {
                params: {
                    id: item?.id
                },
            }),
        onSuccess: (data: any) => {
            try {
                if (data?.data?.length !== 0) {
                    setSelectDonation(data?.data[0]?.fundRaiser?.id + "")
                    setSelectDonationInitial(data?.data[0]?.fundRaiser?.id + "")
                }
            } catch (e) {
                console.error('Error in onSuccess handler:', e);
            }
        },
    });

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        length(results?.length)
    }, [loadingList])

    const clickHander = () => {

        if (results?.length === 0) {
            router?.push(`/dashboard/donation/create?event=${item?.id}`)
        } else if (!selectDonation) { 

            toaster.create({
                title: "Select a Fundraising",
                type: "info",
                closable: true
            })
        } else if (selectDonation === selectDonationInitial) {
            
            toaster.create({
                title: "This Fundraising is Pinned",
                type: "info",
                closable: true
            })

        } else {
            if (selectDonation) {
                createFundraising?.mutate({
                    fundRaiserID: selectDonation,
                    eventID: item?.id,
                    userID: item?.createdBy?.userId
                })
                setOpen(false)
            }
        }
    }

    return (
        <Flex flexDirection={"column"} gap={"3"} >
            <LoadingAnimation loading={loadingList || isLoading} length={results?.length} >
                <Flex w={"full"} maxH={"60vh"} flexDir={"column"} overflowY={"auto"} gap={"3"} >
                    {results?.map((item: IDonationList, index: number) => {
                        return (
                            <Flex key={index} >
                                <EventDonationPicker items={item} selectDonation={selectDonation} setSelectDonation={setSelectDonation} />
                            </Flex>
                        )
                    })}
                </Flex>
            </LoadingAnimation>
            {results?.length > 0 && (
                <Flex w={"full"} py={"1"} position={"sticky"} bottom={"-4px"} >
                    <CustomButton onClick={clickHander} isLoading={createFundraising?.isPending} text={"Add"} width={"150px"} height={"40px"} fontSize={"14px"} borderRadius={"999px"} />
                </Flex>
            )}
        </Flex>
    )
}
