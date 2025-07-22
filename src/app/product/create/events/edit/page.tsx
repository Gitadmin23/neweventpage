import { EditEventPage } from "@/components/pages";
import { Suspense } from "react";

export default function EditEvent() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <EditEventPage />
        </Suspense>
    )
}