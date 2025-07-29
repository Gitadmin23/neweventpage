import React from 'react';
import { Box, VStack, Spinner, Image, Button, Text } from "@chakra-ui/react";
import { Scanner as QrcodeScanner } from '@yudiel/react-qr-scanner'; 
import { URLS } from '@/helpers/services/urls';
import httpService from '@/helpers/services/httpService';
import { useMutation } from '@tanstack/react-query';
import { ModalLayout, Ticket } from '../shared';
import { ITicket } from '@/helpers/models/ticket';

interface IProps {
    isOpen: boolean;
    onClose: (by?: boolean) => void;
    eventID: string,
    startDate: number,
    endDate: number
}

export default function Scanner({
    isOpen,
    onClose,
    eventID,
    startDate,
    endDate
}: IProps) {
    const [approved, setApproved] = React.useState(false);
    const [show, setShow] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [ticket, setTicket] = React.useState<ITicket | null>(null);
    const [scanned, setScanned] = React.useState(false);


    const { isPending, mutate, isError } = useMutation({
        mutationFn: (data: string) => httpService.get(`${URLS.VALIDATE_TICKET(eventID, data)}`),
        onSuccess: (data) => {
            setTicket(data?.data?.ticket);
            setApproved(data?.data?.validate);
            onClose(false)
            setOpen(true)
        },
        onError: (error: any) => {

            // toast({
            //     status: "error",
            //     title: error.response?.data?.message,
            //     position: "top-right"
            // });

            onClose(false)
        }
    })

    const handleScanner = (str: any) => {
        setShow(false);
        console.log(str);

        // mutate(str);
    }

    const retry = () => {
        setShow(true);
        onClose(true)
        setScanned(false);
    }

    const closeHandler = () => {
        setOpen(false)
    }

    const checkEventDay = (item: any) => {
        return (new Date(item)?.getDate() >= new Date(startDate)?.getDate()) && (new Date(item)?.getDate() <= new Date(endDate)?.getDate())
    }

    const checkPreviousDate = () => {
        return (new Date((ticket?.scanTimeStamp) ? (ticket?.scanTimeStamp[ticket?.scanTimeStamp?.length - 1]) : "")?.getDay() !== new Date((ticket?.scanTimeStamp) ? (ticket?.scanTimeStamp[ticket?.scanTimeStamp?.length - 2]) : "")?.getDay())
    }

    return (
        <>
            <ModalLayout trigger={true} open={isOpen} closeBtn={true} close={() => onClose(false)} size="full" >
                {!isPending && !scanned && (
                    <Box width={'full'} height={'100vh'} justifyContent={"center"} alignItems={"center"} px={"4"} bg={'black'}>
                        <Box width={'100%'} height={'100%'}> 
                            <QrcodeScanner
                                onScan={(result) => handleScanner(result)}
                                onError={(err) => console.log(err)}
                                constraints={{ facingMode: 'environment' }}
                            />
                        </Box>
                    </Box>
                )}
                {isPending && (
                    <VStack justifyContent={'center'} w={'100%'} h={'100%'}>
                        <Spinner />
                        <Text>Verifing Ticket...</Text>
                    </VStack>
                )}
            </ModalLayout>
            <ModalLayout size={"full"} open={open} close={() => setOpen(false)} >
                {(!isPending && isError) && (
                    <Box flex={1}>
                        <Text fontSize={'18px'} textAlign={'center'}>An error occured while scanning the ticket</Text>
                        <Button onClick={retry} width={'100%'} height={'45px'} color={'white'} bg={'brand.chasescrollButtonBlue'}>Retry</Button>
                    </Box>
                )}
                {(!isPending && !isError) &&
                    <Ticket close={closeHandler} showQrCode={true} approved={checkEventDay(ticket?.scanTimeStamp ? (ticket?.scanTimeStamp[ticket?.scanTimeStamp?.length - 1]) : "") && (approved || checkPreviousDate())} ticket={ticket as ITicket} />
                }
            </ModalLayout>
        </>
    )
}
