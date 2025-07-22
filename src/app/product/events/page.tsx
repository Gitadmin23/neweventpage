import { EventPage } from "@/components/pages";
import { Suspense } from "react";

export default function Page() {

    return ( 
        <Suspense fallback={<>Loading...</>}>
            <EventPage />
        </Suspense>
    )
}