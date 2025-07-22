"use client"
import { DraftEvent, EventLisiting, MyEvent, PastedEvent, SavedEvent, } from "@/components/eventcomponents";
import { Flex } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
 

export default function EventPage() {

    const query = useSearchParams();
    const type = query?.get('type');

    return (
        <Flex w={"full"} pos={"relative"} >
            {!type && (
                <EventLisiting />
            )}
            {type === "my_event" && (
                <MyEvent />
            )}
            {type === "saved_event" && (
                <SavedEvent />
            )}
            {type === "past_event" && (
                <PastedEvent />
            )}
            {type === "draft" && (
                <DraftEvent />
            )}
        </Flex>
    )
}