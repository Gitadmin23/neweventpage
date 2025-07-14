"use client"
import { useEffect, useState } from "react";
import { LoadingAnimation } from "../shared"
import { IEventType } from "@/helpers/models/event";
import { useMutation } from "@tanstack/react-query";
import { URLS } from "@/helpers/services/urls";
import httpService from "@/helpers/services/httpService";
import { usePathname, useSearchParams } from "next/navigation";
import { PaginatedResponse } from "@/helpers/models/PaginatedResponse";
import { EventDetails } from ".";

interface Props {
    event_index: any,
}

export default function GetEventDetailInfo(props: Props) {

    const {
        event_index,
    } = props

    // const userId = "";
    const [data, setData] = useState<IEventType | any>();
    const [show, setShow] = useState(false);
    // const pathname = usePathname()
    const query = useSearchParams();
    const type = query?.get('type');

    const { mutate: fetchData, isPending: isLoading, isError } = useMutation({
        mutationKey: ['all-events-details', event_index],
        mutationFn: () =>
            httpService.get(URLS.All_EVENT + "?id=" + event_index + `${type ? "&affiliate=PR" : ""}`),
        onSuccess: (data: any) => {
            try {
                const item: PaginatedResponse<IEventType> = data.data;
                setData(item.content[0]);
            } catch (e) {
                console.error('Error in onSuccess handler:', e);
            }
        },
    });

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <LoadingAnimation loading={isLoading} >
            <EventDetails {...data} />
        </LoadingAnimation>
    )
}