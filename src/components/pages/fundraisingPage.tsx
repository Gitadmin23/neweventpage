"use client"
import { Flex } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { AllDonationList, MyDonationList } from "../fundraisingComponents";

export default function FundraisingPage() {


    const query = useSearchParams();
    const type = query?.get('type');

    return (
        <Flex justifyContent={"center"} gap={["4", "4", "6"]} w={"full"} pt={["5", "5", "8"]} flexDirection={"column"} >
            {!type && (
                <AllDonationList />
            )}
            {type === "my_fundraising" && (
                <MyDonationList />
            )}
            {type === "past_fundraising" && (
                <MyDonationList pasted={true} />
            )}
        </Flex>
    )
} 