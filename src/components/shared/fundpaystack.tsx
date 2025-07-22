"use client"
import httpService from '@/helpers/services/httpService';
import usePaystackStore from '@/helpers/store/usePaystack';
import { useDetails } from '@/helpers/store/useUserDetails';
import useCustomTheme from '@/hooks/useTheme';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { usePaystackPayment } from "react-paystack";
import ModalLayout from './modalLayout';
import LoadingAnimation from './loadingAnimation';
import { Flex, Text } from '@chakra-ui/react';
import { SuccessIcon } from '@/svg';
import CustomButton from './customButton';
import useModalStore from '@/helpers/store/useModalSwitch';
import { toaster } from '../ui/toaster';

interface IMessage {
    donation: boolean,
    booking: boolean,
    product: boolean,
    rental: boolean,
    service: boolean,
    event: boolean
}

interface Props {
    config: any,
    setConfig: any,
    fund?: boolean,
    id?: any,
    message: IMessage,
    amount?: number,
    setAmount?: any
}

function Fundpaystack(props: Props) {
    const { config, setConfig, fund, id, message, amount, setAmount: setAm } = props;

    const {
        bodyTextColor,
        primaryColor, 
        headerTextColor
    } = useCustomTheme();

    const queryClient = useQueryClient() 
    const [open, setOpen] = useState(false) 
    const initializePayment: any = usePaystackPayment(config); 
    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

    const { push } = useRouter()

    const { setMessage } = usePaystackStore((state) => state);

    const { userId } = useDetails()
 
    // mutations 
    const payStackFundMutation = useMutation({
        mutationFn: (data: any) => httpService.get(`/payments/api/wallet/verifyFundWalletWeb?transactionID=${data}`),
        onSuccess: (data) => {
            
            toaster.create({
                title: "Payment verified",
                type: "success",
                closable: true
            })
            queryClient.invalidateQueries({ queryKey: ['get-wallet-balanceNGN'] }) 
            setOpen(true)
            setConfig({
                email: "",
                amount: 0,
                reference: "",
                publicKey: PAYSTACK_KEY,
            })

            queryClient.invalidateQueries({ queryKey: ['event_ticket'] })
            queryClient.invalidateQueries({ queryKey: ['all-events-details'] })
            queryClient.invalidateQueries({ queryKey: ['order'] })
            queryClient.invalidateQueries({ queryKey: ['donationlist'] })
            queryClient.invalidateQueries({ queryKey: ['donationlistmy'] })
            queryClient.invalidateQueries({ queryKey: ['all-donation'] })
            queryClient.invalidateQueries({ queryKey: ['getDonationsingleList'] }) 

            if (message?.donation) {
                donateEmail?.mutate({
                    userID: userId,
                    fundRaiserID: id,
                    amount: Number(amount)
                })
                setAm(0)
            }
        },
        onError: () => {

            toaster.create({
                title: "Error Occurred",
                type: "error",
                closable: true
            })
        },
    });

    const payStackMutation = useMutation({
        mutationFn: (data: any) => httpService.post(`/payments/verifyWebPaystackTx?orderCode=${data}`),
        onSuccess: (data: any) => {
            toaster.create({
                title: "Payment verified",
                type: "success",
                closable: true
            })

            queryClient.invalidateQueries({ queryKey: ['event_ticket'] })
            queryClient.invalidateQueries({ queryKey: ['all-events-details'] })
            queryClient.invalidateQueries({ queryKey: ['order'] })
            queryClient.invalidateQueries({ queryKey: ['donationlist'] })
            queryClient.invalidateQueries({ queryKey: ['donationlistmy'] })
            queryClient.invalidateQueries({ queryKey: ['all-donation'] })
            queryClient.invalidateQueries({ queryKey: ['getDonationsingleList'] }) 

            if (message?.donation) {
                donateEmail?.mutate({
                    userID: userId,
                    fundRaiserID: id,
                    amount: Number(amount)
                })
                setAm(0)
            }
        },
        onError: () => {

            toaster.create({
                title: "Error Occurred",
                type: "error",
                closable: true
            })
        },
    });

    const donateEmail = useMutation({
        mutationFn: (data: {
            "userID": string,
            "fundRaiserID": string,
            "amount": number
        }) => httpService.post(`/donation/create-donation`, data),
        onSuccess: (data: any) => {

            console.log(data);

        },
        onError: () => {
            // toast({
            //     title: 'Error',
            //     description: "Error Occured",
            //     status: 'error',
            //     isClosable: true,
            //     duration: 5000,
            //     position: 'top-right',
            // });
        },
    });

    const onSuccess = (reference: any) => {
        setOpen(true) 
        if (fund) {
            payStackFundMutation.mutate(reference?.reference)
        } else {
            payStackMutation.mutate(reference?.reference)
        }
    };


    // you can call this function anything
    const onClose = () => {
        setConfig({
            email: "",
            amount: 0,
            reference: "",
            publicKey: PAYSTACK_KEY,
        })
    }

    React.useEffect(() => {
        if (config?.reference) {
            initializePayment(onSuccess, onClose)
        }
    }, [config?.reference])

    // const { setModalTab } = useStripeStore((state: any) => state);
    const { setShowModal } = useModalStore((state) => state);

    const clickHandler = () => {
        if (message?.product) {
            push(`/dashboard/kisok/details-order/${id}`)
        } else if (message?.event) {
            setShowModal(true)
        }
        setOpen(false)
        setMessage({
            donation: false,
            product: false,
            rental: false,
            service: false,
            booking: false,
            event: false
        })
    }

    const closeHandler = () => {
        setOpen(false)
        setMessage({
            donation: false,
            product: false,
            rental: false,
            service: false,
            booking: false,
            event: false
        })
    }

    return (
        <>
            <ModalLayout size="sm" open={open} close={closeHandler} trigger={true} closeBtn={true} >
                <LoadingAnimation loading={payStackFundMutation?.isPending} >
                    <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
                        <SuccessIcon />
                        <Text fontSize={["18px", "20px", "24px"]} color={headerTextColor} lineHeight={"44.8px"} fontWeight={"600"} mt={"4"} >{message?.service ? "Booking Successful" : message?.rental ? "Rental Purchase Successful" : message?.product ? "Product Purchase Successful" : message?.donation ? "Donated Successful" : message?.event ? "Ticket Purchase Successful" : "Transaction Successful"}</Text>
                        <Text fontSize={"12px"} color={bodyTextColor} maxWidth={"351px"} textAlign={"center"} mb={"4"} >{(message?.product || message?.service || message?.rental) ? "Thank you!" : message?.donation ? `Thank you! Your generous donation makes a real difference. We’re so grateful for your support!` : message?.event ? `Congratulations! you can also find your ticket on the Chasescroll app, on the details page click on the view ticket button.` : "Congratulations! Transaction was successfull"}</Text>

                        <CustomButton onClick={() => clickHandler()} color={primaryColor} text={'Close'} w={"full"} backgroundColor={"#F7F8FE"} />
                    </Flex>
                </LoadingAnimation>
            </ModalLayout>
        </>
    )
}

export default Fundpaystack
