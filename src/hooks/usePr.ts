import { toaster } from "@/components/ui/toaster";
import { ITag } from "@/helpers/models/pr";
import httpService from "@/helpers/services/httpService";
import { URLS } from "@/helpers/services/urls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react"; 

const usePr = () => {

    const query = useQueryClient() 

    const [open, setOpen] = useState(false)

    const createPr = useMutation({
        mutationFn: (data: {
            eventID: string,
            affiliateType: string,
            percent: number
        }) =>
            httpService.put(
                `/events/create-pr-request?eventID=${data?.eventID}&affiliateType=${data?.affiliateType}&percent=${data?.percent}`, {}
            ),
        onSuccess: (data: any) => { 

            toaster.create({
                title: data?.data?.message,
                type: "success",
                closable: true
            })

            query?.invalidateQueries({ queryKey: ["all-events-details"]})
            setOpen(false)

        },
        onError: () => { },
    });

    // Create Event From Draft
    const tagServiceAndRental = useMutation({
        mutationFn: (data: {
            "serviceCategories": Array<ITag>,
            "rentalCategories": Array<ITag>,
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

            toaster.create({
                title: data?.data?.message,
                type: "success",
                closable: true
            })
            
            setOpen(false)
        }
    });

    // Create Event From Draft
    const createFundraising = useMutation({
        mutationFn: (data: {
            fundRaiserID: string,
            eventID: string,
            userID: string
        }) => httpService.post("/pinned-fundraisers/create", data),
        onError: (error: AxiosError<any, any>) => { 

            toaster.create({
                title: error?.response?.data?.message, 
                type: "error",
                closable: true
            })

        },
        onSuccess: (data: AxiosResponse<any>) => { 

            toaster.create({
                title: data?.data?.message,
                type: "success",
                closable: true
            })
            

            query?.invalidateQueries({ queryKey: ["all-donation"]})
            setOpen(false)
        }
    });


    // Create Event From Draft
    const deleteFundraising = useMutation({
        mutationFn: (data: string) => httpService.delete(`/pinned-fundraisers/delete/${data}`),
        onError: (error: AxiosError<any, any>) => { 

            toaster.create({
                title: error?.response?.data?.message, 
                type: "error",
                closable: true
            })

        },
        onSuccess: (data: AxiosResponse<any>) => { 

            toaster.create({
                title: data?.data?.message,
                type: "success",
                closable: true
            })
            

            query?.invalidateQueries({ queryKey: ["all-donation"]})
            setOpen(false)
        }
    }); 


    // Edit Event
    const updateUserEvent = useMutation({
        mutationFn: (newdata:  any) => httpService.put("/events/update-pr", newdata),
        onError: (error: AxiosError<any, any>) => { 

            toaster.create({
                title: error?.response?.data?.message, 
                type: "error",
                closable: true
            })

        },
        onSuccess: (message: AxiosResponse<any>) => {
            query.invalidateQueries({ queryKey: ['all-events-details']}) 

            toaster.create({
                title: "Event Updated", 
                type: "success",
                closable: true
            })

            setOpen(false)
        }
    });
    // / Edit Event
    const updateEvent = useMutation({
        mutationFn: (newdata: any) => httpService.put(URLS.UPDATE_EVENT, newdata),
        onError: (error: AxiosError<any, any>) => { 

            toaster.create({
                title: error?.response?.data?.message, 
                type: "error",
                closable: true
            })

        },
        onSuccess: (message: AxiosResponse<any>) => {
            query.invalidateQueries({ queryKey: ['all-events-details']})

            toaster.create({
                title: "Event Role Updated", 
                type: "success",
                closable: true
            })

            setOpen(false)
        }
    });

    return {
        createPr,
        tagServiceAndRental,
        createFundraising,
        open, 
        setOpen,
        deleteFundraising,
        updateUserEvent,
        updateEvent
    };
}

export default usePr