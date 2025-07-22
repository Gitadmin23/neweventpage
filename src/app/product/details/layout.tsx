"use client"
import { Fundpaystack } from "@/components/shared";
import usePaystackStore from "@/helpers/store/usePaystack";
import { useParams } from "next/navigation";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    // const param = useParams();

    // const id = param?.slug ?? param?.id;
    // const { configPaystack, setPaystackConfig, message, amount, setAmount } = usePaystackStore((state) => state);
    return (
        <>
            {children}
            {/* <Fundpaystack id={id} config={configPaystack} setConfig={setPaystackConfig} amount={amount} setAmount={setAmount} message={message} /> */}
        </>
    )
}