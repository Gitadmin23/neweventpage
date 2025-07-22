import { CreateEventPage } from "@/components/pages";
import { Suspense } from "react";


export default function CreateEvent() {

    return (
        <Suspense fallback={<>Loading...</>}>
            <CreateEventPage />
        </Suspense>
    )
}