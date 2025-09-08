"use client"
import { toaster } from "@/components/ui/toaster"; 
import httpService from "@/helpers/services/httpService";
import { URLS } from "@/helpers/services/urls";
import { useImage } from "@/helpers/store/useImagePicker";
import { useDetails } from "@/helpers/store/useUserDetails";
import { validationSchemaTheme, validationSchemaTicket } from "@/helpers/validation/event";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


interface ICreateEvent {
    picUrls: Array<string>,
    eventType: string,
    eventName: string,
    eventDescription: string,
    isPublic: boolean,
    currentPicUrl: string,
    eventFunnelGroupID: string,
    attendeesVisibility: boolean,
    startTime: string,
    endTime: string,
    startDate: string,
    endDate: string,
    locationType: string,
    currency: string,
    "location": {
        "link": string,
        "links": Array<string>,
        "address": string,
        "locationDetails": string,
        "latlng": string,
        "placeIds": string,
        "toBeAnnounced": boolean
    },
    "productTypeData": [
        {
            "totalNumberOfTickets": number | any,
            "ticketPrice": number | any,
            "ticketType": string,
            "minTicketBuy": number | any,
            "maxTicketBuy": number | any,
            isFree: boolean
        }
    ],
    collaborators: Array<any>,
    admins: Array<any>,
    affiliates: [
        {
            affiliateType: string,
            percent: number | any
        }
    ]
}

const useEvent = () => {


    const { userId } = useDetails((state) => state);
    const { image, setImage } = useImage((state) => state);

    const router = useRouter()

    const pathname = usePathname()
    const query = useSearchParams();
    const type = query?.get('type');
    const id = query?.get('id');
    const [open, setOpen] = useState(false)


    const path = "/product/create/events"+(pathname?.includes("edit") ? "/edit" :  "/draft" )

    // Upload Image
    const uploadImage = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.UPLOAD_IMAGE_ARRAY + "/" + userId, data,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                }
            }),
        onError: (error: AxiosError<any, any>) => {
            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: any) => { 
            
            const fileArray = Object.values(data?.data);

            let newObjTheme: any = { ...formik.values, picUrls: [...fileArray], currentPicUrl: fileArray[0] }
            let newObjInfo: any = { ...formik.values, picUrls: [...fileArray], currentPicUrl: fileArray[0], id: id }

            if (!type && !pathname?.includes("edit")) {
                createDraft.mutate(newObjTheme)
            } else if (type === "info" && !pathname?.includes("edit")) {
                saveToDraft.mutate(newObjInfo)
            } else if (type === "ticket" && !pathname?.includes("edit")) {
                createEventFromDraft.mutate(newObjInfo)
            } else {
                updateUserEvent?.mutate(newObjInfo)
            }
        }
    });


    // Save To Draft
    const saveToDraft = useMutation({
        mutationFn: (data: any) => httpService.put(URLS.UPDATE_DRAFT, data),
        onError: (error: AxiosError<any, any>) => {
            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: AxiosResponse<any>) => {

            formik.setValues({
                picUrls: data?.data.picUrls,
                eventType: data?.data.eventType,
                eventName: data?.data.eventName,
                eventDescription: data?.data.eventDescription,
                isPublic: data?.data.isPublic,
                currentPicUrl: data?.data.currentPicUrl,
                eventFunnelGroupID: data?.data.eventFunnelGroupID,
                attendeesVisibility: data.data.attendeesVisibility,
                startTime: data?.data.startTime,
                endTime: data?.data.endTime,
                startDate: data?.data.startDate,
                endDate: data?.data.endDate,
                locationType: data?.data.locationType,
                currency: data?.data.currency,
                location: data?.data.location,
                productTypeData: data?.data.productTypeData,
                affiliates: data?.data.affiliates,
                collaborators: data?.data.collaborators,
                admins: data?.data.admins,
            })

            if (type === "info") {
                router.push(`${path}?type=ticket&id=${data?.data?.id}`)
            } else {
                router.push(`${path}?type=info&id=${data?.data?.id}`)
            }

            toaster.create({
                title: "Event Saved",
                type: "success",
                closable: true
            })
        }
    });

    // Create Event From Draft
    const createEventFromDraft = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_EVENT_FROM_DRAFT, data),
        onError: (error: AxiosError<any, any>) => {
            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: AxiosResponse<any>) => {

            console.log(data);
            
            router.push(`${path}?type=ticket&id=${data?.data?.id}`)
            setOpen(true)
        }
    });

    // Create Event From Draft
    const tagServiceAndRental = useMutation({
        mutationFn: (data: {
            "serviceCategories": Array<any>,
            "rentalCategories": Array<any>,
            "eventID": string,
            "state": string
        }) => httpService.post("/tags/create-request", data),
        onError: (error: AxiosError<any, any>) => {
            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: AxiosResponse<any>) => {
            // setOpen(true)
        }
    });

    // Edit Event
    const updateUserEvent = useMutation({
        mutationFn: (data: any) => httpService.put(URLS.UPDATE_EVENT, data),
        onError: (error: AxiosError<any, any>) => {
            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: AxiosResponse<any>) => {

            // router.push("/dashboard/product") 

            toaster.create({
                title: "Event has been updated successfully",
                type: "success",
                closable: true
            })

            setOpen(true)
        }
    });

    // Create Draft 
    const createDraft = useMutation({
        mutationFn: (data: any) => httpService.post("/events/create-draft", data),
        onError: (error: AxiosError<any, any>) => {

            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: AxiosResponse<any>) => {

            router.push(`${path}?type=info&id=${data?.data?.id}`)

            // formik.setValues({
            //     picUrls: data?.data.picUrls,
            //     eventType: data?.data.eventType,
            //     eventName: data?.data.eventName,
            //     eventDescription: data?.data.eventDescription,
            //     isPublic: data?.data.isPublic,
            //     currentPicUrl: data?.data.currentPicUrl,
            //     eventFunnelGroupID: data?.data.eventFunnelGroupID,
            //     attendeesVisibility: data.data.attendeesVisibility,
            //     startTime: data?.data.startTime,
            //     endTime: data?.data.endTime,
            //     startDate: data?.data.startDate,
            //     endDate: data?.data.endDate,
            //     locationType: data?.data.locationType,
            //     currency: data?.data.currency,
            //     location: data?.data.location,
            //     productTypeData: data?.data.productTypeData,
            //     affiliates: data?.data.affiliates,
            //     collaborators: [],
            //     admins: [],
            // })

            toaster.create({
                title: `Event Saved`,
                type: "success",
                closable: true
            })
        }
    });

    const formik = useFormik({
        initialValues: {
            picUrls: [],
            eventType: "",
            eventName: "",
            eventDescription: "",
            isPublic: true,
            currentPicUrl: "",
            eventFunnelGroupID: "",
            attendeesVisibility: true,
            startTime: "",
            endTime: "",
            startDate: "",
            endDate: "",
            locationType: "",
            currency: "NGN",
            "location": {
                "link": "",
                "links": [],
                "address": "",
                "locationDetails": "",
                "latlng": "",
                "placeIds": "",
                "toBeAnnounced": false
            },
            "productTypeData": [
                {
                    "totalNumberOfTickets": null,
                    "ticketPrice": null,
                    "ticketType": "",
                    "minTicketBuy": 1,
                    "maxTicketBuy": 1,
                    isFree: false
                }
            ],
            affiliates: [
                {
                    affiliateType: "",
                    percent: null
                }
            ],
            collaborators: [],
            admins: [],
        },
        validationSchema: type === "ticket" ? validationSchemaTicket : validationSchemaTheme,
        onSubmit: (data: ICreateEvent) => {

            if (pathname?.includes("edit")) {
                if (!type) {
                    router.push(`${path}?type=info&id=${id}`)
                } else if(type === "info") {
                    router.push(`${path}?type=ticket&id=${id}`)
                } else {
                    updateUserEvent.mutate({...data, id: id})
                }
            } else if (image.length > 0 && !id) {
                const fd = new FormData();
                image.forEach(async (file) => {
                    // const pngFile = await convertImageToPngFile(file);
                    fd.append("files[]", file);
                });
                uploadImage?.mutate(fd)
            } else if ((type === "info" || id) && type !== "ticket") {
                saveToDraft.mutate({ ...data, id: id })
            } else if (type === "ticket") {
                createEventFromDraft.mutate({ ...data, id: id })
            }
            // createDraft.mutate(data)
        },
    });

    return {
        formik,
        uploadImage,
        createDraft,
        createEventFromDraft,
        saveToDraft,
        updateUserEvent,
        open,
        setOpen
    };
}

export default useEvent