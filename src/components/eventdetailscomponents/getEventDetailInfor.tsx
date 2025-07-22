"use client"
import { useEffect, useState } from "react";
import { LoadingAnimation } from "../shared"
import { IEventType } from "@/helpers/models/event";
import { useMutation } from "@tanstack/react-query";
import { URLS } from "@/helpers/services/urls";
import httpService from "@/helpers/services/httpService";
import { useSearchParams } from "next/navigation";
import { PaginatedResponse } from "@/helpers/models/PaginatedResponse";
import { EventDetails } from ".";
import useInfiniteScroller from "@/hooks/infiniteScrollerComponent";
import { useFetchData } from "@/hooks/useFetchData";
import { Flex } from "@chakra-ui/react";

interface Props {
    event_index: any,
}

export default function GetEventDetailInfo(props: Props) {

    const {
        event_index,
    } = props

    // const userId = "";
    const [data, setData] = useState<IEventType | any>();
    // const pathname = usePathname()
    const query = useSearchParams();
    const type = query?.get('type'); 

    const { data: eventData, isLoading } = useFetchData<PaginatedResponse<IEventType>>({name: "all-events-details", endpoint: URLS.All_EVENT, id: event_index, params: {
        id: event_index,
        affiliate: type ? "PR" : ""
    }});

    useEffect(()=> { 
            setData(eventData?.content[0]) 
    }, [isLoading])

    console.log(data);
    

    return (
        <LoadingAnimation fix_height={true} loading={isLoading} >
            <EventDetails {...data} />
        </LoadingAnimation>  
    )
}