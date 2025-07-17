import { toaster } from "@/components/ui/toaster";
import httpService from "@/helpers/services/httpService";
import { validationSchemaTheme } from "@/helpers/validation/event";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik"; 
import * as Yup from 'yup';


const useEvent = () => {

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
            // updateEvent(data?.data)
            // changeTab(1) 

            toaster.create({
                title: `Event Saved`, 
                type: "success",
                closable: true
            })
        }
    });

    const formikTheme = useFormik({
        initialValues: { 
            eventType: "",
            eventName: "",
            eventDescription: "",
            joinSetting: "public",
            locationType: "",
            currency: "NGN",
            currentPicUrl: "",
            eventFunnelGroupID: "",
            isPublic: true,
            isExclusive: false,
            mask: false,
            attendeesVisibility: true, 
            startTime: "",
            endTime: "",
            startDate: "",
            endDate: "",
            location: {
                toBeAnnounced: false,
                locationDetails: "",
                link: "",
                links: [""],
                address: "",
                latlng: "",
            },
            productTypeData: [
                {
                    totalNumberOfTickets: "",
                    ticketPrice: "",
                    ticketType: "Regular",
                    minTicketBuy: "1",
                    maxTicketBuy: "",
                    rerouteURL: "",
                },
            ],
            affiliates: [
                {
                    affiliateType: "",
                    percent: null,
                },
            ],
        },
        validationSchema: validationSchemaTheme,
        onSubmit: (data: any) => {
            createDraft.mutate(data)
        },
    });

    return {
        formikTheme
    };
}

export default useEvent