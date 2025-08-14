"use client"
import { Information, SuccessModal, Theme, Ticket } from "@/components/createEventComponents";
import { LoadingAnimation } from "@/components/shared"; 
import { IEventType } from "@/helpers/models/event";
import { PaginatedResponse } from "@/helpers/models/PaginatedResponse";
import { IUser } from "@/helpers/models/user";
import httpService from "@/helpers/services/httpService";
import { URLS } from "@/helpers/services/urls";
import useEvent from "@/hooks/useEvent";
import { Flex } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditEventPage() {

    const query = useSearchParams();
    const type = query?.get('type');
    const id = query?.get('id');
    const [eventData, setEventData] = useState({} as IEventType)

    const { formik, uploadImage, createDraft, saveToDraft, createEventFromDraft, open, setOpen, updateUserEvent } = useEvent()

    // console.log(formik.values);

    const { mutate: fetchData, isPending: isLoading } = useMutation({
        mutationKey: ['all-events-details', id],
        mutationFn: () =>
            httpService.get(URLS.All_EVENT + "?id=" + id),
        onSuccess: (data: any) => {
            try {
                const item: PaginatedResponse<any> = data.data;

                const admin: Array<string> = []
                const collaborator: Array<string> = []

                item.content[0]?.admins?.map((item: IUser) => {
                    return admin.push(item?.userId)
                })
                item.content[0]?.collaborators?.map((item: IUser) => {
                    return collaborator.push(item?.userId)
                })

                setEventData(item.content[0])
                // setData(item.content[0]); 
                formik.setValues({
                    picUrls: item.content[0].picUrls,
                    eventType: item.content[0].eventType,
                    eventName: item.content[0].eventName,
                    eventDescription: item.content[0].eventDescription,
                    isPublic: item.content[0].isPublic,
                    currentPicUrl: item.content[0].currentPicUrl,
                    eventFunnelGroupID: item.content[0].eventFunnelGroupID,
                    attendeesVisibility: data.data.attendeesVisibility,
                    startTime: item.content[0].startTime,
                    endTime: item.content[0].endTime,
                    startDate: item.content[0].startDate,
                    endDate: item.content[0].endDate,
                    locationType: item.content[0].locationType,
                    currency: item.content[0].currency,
                    location: item.content[0].location,
                    productTypeData: item.content[0].productTypeData,
                    affiliates: item.content[0].affiliates,
                    collaborators: collaborator,
                    admins: admin,
                })
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
            <Flex w={"full"} justifyContent={"center"} py={"8"} >
                <Flex maxW={"569px"} w={"full"} >
                    {!type && (
                        <Theme formik={formik} isLoading={uploadImage.isPending || createDraft.isPending || saveToDraft?.isPending} />
                    )}
                    {type === "info" && (
                        <Information formik={formik} isLoading={uploadImage.isPending || saveToDraft?.isPending} />
                    )}
                    {type === "ticket" && (
                        <Ticket eventData={eventData} formik={formik} isLoading={uploadImage.isPending || createEventFromDraft?.isPending || updateUserEvent?.isPending} />
                    )}
                </Flex>
                <SuccessModal open={open} setOpen={setOpen} />
            </Flex>
        </LoadingAnimation>
    )
}