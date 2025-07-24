import { toaster } from "@/components/ui/toaster";
import httpService from "@/helpers/services/httpService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState, useCallback } from "react";
import { usePaystackPayment } from "react-paystack";

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

const usePayStack = () => {

    const [open, setOpen] = useState(false); 
    const queryClient = useQueryClient()


    const payForTicket = useMutation({
        mutationFn: (data: any) => httpService.post("/events/create-multi-ticket", data),
        onSuccess: (res: any) => {
            const payload = res?.data?.content;

            if (!payload?.email || !payload?.orderTotal || !payload?.orderCode) {
                toaster.create({
                    title: "Invalid response from server",
                    type: "error",
                    closable: true,
                });
                return;
            }

            handlePayment({
                publicKey: PAYSTACK_KEY,
                email: payload.email,
                amount: Number(payload.orderTotal) * 100, // Convert to kobo
                reference: payload.orderCode,
            }) 
 
            setOpen(false);
        },
        onError: () => {
            toaster.create({
                title: "Error Creating Ticket",
                type: "error",
                closable: true,
            });
        },
    }); 

    const payForDonation = useMutation({
        mutationFn: (data: any) => httpService.post(`/payments/createCustomOrder`, data),
        onSuccess: (res: any) => {
            const payload = res?.data?.content;

            if (!payload?.email || !payload?.orderTotal || !payload?.orderCode) {
                toaster.create({
                    title: "Invalid response from server",
                    type: "error",
                    closable: true,
                });
                return;
            }

            handlePayment({
                publicKey: PAYSTACK_KEY,
                email: payload.email,
                amount: Number(payload.orderTotal) * 100, // Convert to kobo
                reference: payload.orderCode,
            }) 
 
            setOpen(false);
        },
        onError: () => {
            toaster.create({
                title: "Error Creating Ticket",
                type: "error",
                closable: true,
            });
        },
    }); 

    const handlePayment = React.useCallback((config: any) => {

        const initializePayment = usePaystackPayment(config);
        const onSuccess = (reference: any) => {
            payStackMutation.mutate(reference.reference)
            console.log(`PAYSTACK REFRENCE`, reference);
        };
        // you can call this function anything
        const onClose = () => { 

            console.log('closed')
        }
        // console.log(paystackConfig);
        if (config.amount > 0) {
            initializePayment({
                onSuccess,
                onClose
            })
        } 

    }, [])



    const payStackMutation = useMutation({
        mutationFn: (data: any) => httpService.post(`/payments/verifyWebPaystackTx?orderCode=${data}`),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['all-events-details']}) 
            queryClient.invalidateQueries({ queryKey: ["event-ticket"]}) 

            toaster.create({
                title: "Payment verified",
                type: "success",
                closable: true
            })
 
        },
        onError: () => {

            toaster.create({
                title: "Error Occurred",
                type: "error",
                closable: true
            })
        },
    });

    return {
        payForTicket,
        payForDonation,
        open,
        setOpen,
    };
};

export default usePayStack;
