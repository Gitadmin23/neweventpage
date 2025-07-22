import { toaster } from "@/components/ui/toaster";
import httpService from "@/helpers/services/httpService";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";

const usePayStack = () => {

    const [open, setOpen] = useState(false)
    const [paystackConfig, setPaystackConfig] = useState({} as any)

    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;
    const initializePayment: any = usePaystackPayment(paystackConfig);

    const payForTicket = useMutation({
        mutationFn: (data: any) => httpService.post("/events/create-multi-ticket", data),
        onSuccess: (data: any) => {

            setPaystackConfig({
                publicKey: PAYSTACK_KEY,
                email: data?.data?.content?.email,
                amount: (Number(data?.data?.content?.orderTotal) * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
                reference: data?.data?.content?.orderCode
            });
            setOpen(false)
        },
        onError: () => {
            toaster.create({
                title: "Error Creating Ticket",
                type: "error",
                closable: true
            })

            // setMessage({ ...message, event: true })
        },
    });


    const onSuccess = (reference: any) => {
        console.log("Payment success:", reference);
        // Call your backend to verify the payment using `reference.reference`
    };

    const onClose = () => {
        console.log("Payment closed");
    };

    useEffect(() => {
        if(paystackConfig.reference) {
            initializePayment(onSuccess, onClose)
        }
    }, [paystackConfig])

    return {
        payForTicket,
        open,
        setOpen
    };
}

export default usePayStack