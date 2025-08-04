"use client"
import { Flex } from "@chakra-ui/react";
import { LoadingAnimation } from "../shared";
import { FunraisingDetails } from "../fundraisingdetailscomponents";
import { IDonationList } from "@/helpers/models/fundraising";
import { useFetchData } from "@/hooks/useFetchData";
import { PaginatedResponse } from "@/helpers/models/PaginatedResponse";

export default function FundraisingDetails (
    {
        id
    } : {
        id: string
    }
) { 

    const { data, isLoading } = useFetchData<IDonationList>({name: "all-donation-details", endpoint: `/fund-raiser/single/${id}`, id: id }); 

    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} >
                <FunraisingDetails item={data as any} />
            </Flex>
        </LoadingAnimation>
    )
}