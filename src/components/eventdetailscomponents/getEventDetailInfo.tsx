"use client"
import { LoadingAnimation } from "../shared"
import { IEventType } from "@/helpers/models/event"; 
import { URLS } from "@/helpers/services/urls"; 
import { useSearchParams } from "next/navigation";
import { PaginatedResponse } from "@/helpers/models/PaginatedResponse";
import { EventDetails } from "."; 
import { useFetchData } from "@/hooks/useFetchData"; 

interface Props {
    event_index: any,
}

export default function GetEventDetailInfo(props: Props) {

    const {
        event_index,
    } = props
 
    const query = useSearchParams();
    const type = query?.get('type'); 

    const { data: eventData, isLoading } = useFetchData<PaginatedResponse<IEventType>>({name: "all-events-details", endpoint: URLS.All_EVENT, id: event_index, params: {
        id: event_index,
        affiliate: type ? "PR" : ""
    }}); 

    return (
        <LoadingAnimation fix_height={true} loading={isLoading} >
            <EventDetails {...eventData?.content[0]} />
        </LoadingAnimation>  
    )
}