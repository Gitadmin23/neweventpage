"use client"
import { Flex, Image, Text } from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDetails } from '@/helpers/store/useUserDetails';
import ModalLayout from './modalLayout';
import httpService from '@/helpers/services/httpService';
import { capitalizeFLetter } from '@/helpers/utils/capitalLetter';
import CustomButton from './customButton';
import useCustomTheme from '@/hooks/useTheme';
import { toaster } from '../ui/toaster';
import { bus } from '@/helpers/services/bus';

interface Props {
    isOrganizer: boolean,
    id: string,
    draft?: boolean,
    isEvent?: boolean,
    donation?: boolean,
    isProduct?: boolean,
    isRental?: boolean,
    isServices?: boolean,
    name: string
}

function DeleteBtn(props: Props) {
    const {
        id,
        isOrganizer,
        isProduct,
        isRental,
        isServices,
        draft,
        isEvent,
        name,
        donation
    } = props

    const pathname = usePathname()
    // const toast = useToast()
    const queryClient = useQueryClient()

    const {
        primaryColor
    } = useCustomTheme()

    // detete event
    const deleteEvent = useMutation({
        mutationFn: () => httpService.delete((draft ? `/events/delete-draft/${id}` : donation ? `/fund-raiser/${id}?id=${id}` : isEvent ? `/events/delete-event/${id}` : isServices ? `/business-service/delete/${id}` : isRental ? `/rental/delete/${id}` : isProduct ? `/products/${id}` : "")),
        onError: (error: AxiosError<any, any>) => {
            // toast({
            //     title: 'Error',
            //     description: error?.response?.data?.message,
            //     status: 'error',
            //     isClosable: true,
            //     duration: 5000,
            //     position: 'top-right',
            // });
        },
        onSuccess: (data: AxiosResponse<any>) => {

            // queryClient.invalidateQueries({ queryKey: ["myevent"] })
            // queryClient.invalidateQueries({ queryKey: ["mydonationlist"] })
            // queryClient.invalidateQueries({ queryKey: ["draftevent"] })

            // queryClient.invalidateQueries({ queryKey: ["myevent"], exact: false })
            // queryClient.invalidateQueries({ queryKey: ["mydonationlist"], exact: false })
            queryClient.invalidateQueries({ queryKey: ["draftevent"], exact: false }) 

            bus.emit("REFRESH", "draftevent")
            bus.emit("REFRESH", "mydonationlist")
            bus.emit("REFRESH", "myevent")

            if (data?.data?.message === "Could not delete event") { 

                toaster.create({
                    title: "Event can't be deleted, someone has registered for this event.",
                    type: "error",
                    closable: true
                })
            } else {
                if (donation) {
                    toaster.create({
                        title: "Fundraiser Deleted",
                        type: "success",
                        closable: true
                    })
                } else if (isEvent) {
                    toaster.create({
                        title: "Event Deleted",
                        type: "success",
                        closable: true
                    })
                } else if (isServices) {
                    toaster.create({
                        title: "Business Deleted",
                        type: "success",
                        closable: true
                    })
                } else if (isProduct) {
                    toaster.create({
                        title: "Product Deleted",
                        type: "success",
                        closable: true
                    })
                } else if (isRental) {
                    toaster.create({
                        title: "Rental Deleted",
                        type: "success",
                        closable: true
                    })
                } else if (draft) {
                    toaster.create({
                        title: "Draft Deleted",
                        type: "success",
                        closable: true
                    })
                }
            }
            // queryClient.refetchQueries({ queryKey: [URLS.JOINED_EVENT + user_index]})
            setOpen(false)
        }
    });

    const [open, setOpen] = useState(false)

    const handleDelete = React.useCallback((e: any) => {
        e.stopPropagation();
        deleteEvent.mutate()
    }, [deleteEvent])

    const openHandler = (item: any) => {
        item.stopPropagation();
        setOpen(true)
    }

    const handler = (event: any) => {
        event.stopPropagation();
    };


    return (
        <>
            {/* {(isOrganizer || pathname?.includes("draft") || pathname?.includes("mydonation")) && ( */}
            <Flex w={"6"} h={"6"} onClick={openHandler} justifyContent={"center"} alignItems={"center"} pos={"absolute"} top={"-14px"} right={"-8px"} zIndex={"50"} bg={"#F2A09B66"} color={"#F50A0A"} rounded={"full"} >
                <IoClose size={"14px"} />
            </Flex>
            {/* )} */}
            <ModalLayout open={open} trigger={true} close={() => setOpen(false)} size={"xs"} >
                <Flex onClick={handler} flexDirection={"row"} flexDir={"column"} width='100%' justifyContent={'center'} p={"4"} height='100%' alignItems={'center'} gap={3}>
                    <Image alt='delete' src='/images/deleteaccount.svg' />
                    <Text fontWeight={"700"} textAlign={'center'} fontSize={'20px'}>Delete {pathname?.includes("mydonation") ? "Fundraising" : isServices ? "Business" : isProduct ? "Product" : isRental ? "Rental" : "Event"}</Text>
                    <Text textAlign={'center'} fontSize={'14px'} >Are you sure you want to delete <span style={{ fontWeight: "bold" }} >{capitalizeFLetter(name)}</span>, this action cannot be undone.</Text>
                    <CustomButton borderRadius={"999px"} disabled={deleteEvent.isPending} onClick={handleDelete} isLoading={deleteEvent.isPending} fontSize={"14px"} width='100%' height='42px' backgroundColor='red' color="white" text={"Delete"} />
                    <CustomButton borderRadius={"999px"} onClick={() => setOpen(false)} backgroundColor={"white"} width='100%' height='42px' borderWidth={'1px'} color={primaryColor} borderColor={primaryColor} text={"Cancel"} />
                </Flex>
            </ModalLayout>

            {/* <Button onClick={handleDelete} fontSize={pathname?.includes("mydonation") ? "12px" : "14px"} isLoading={deleteEvent.isLoading} color={"red"} isDisabled={deleteEvent.isLoading} bg={"transparent"} px={pathname?.includes("mydonation") ? "3" : "6"} >Delete  {pathname?.includes("mydonation") ? "Fundraising" : "Event"}</Button> */}
        </>
    )
}

export default DeleteBtn
