"use client"
import { toaster } from "@/components/ui/toaster";
import { IDonation } from "@/helpers/models/fundraising";
import httpService from "@/helpers/services/httpService";
import { URLS } from "@/helpers/services/urls";
import useDonationStore from "@/helpers/store/useDonationState";
import { useImage } from "@/helpers/store/useImagePicker";
import { useDetails } from "@/helpers/store/useUserDetails";
import { validationSchemaFundraising, validationSchemaTheme, validationSchemaTicket } from "@/helpers/validation/event";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie"

const useFundraising = () => {


    const userId = Cookies.get("userId") as string;
    const { image } = useImage((state) => state); 

    const pathname = usePathname()
    const query = useSearchParams(); 
    const id = query?.get('id');
    const [open, setOpen] = useState(false)
    const { data: newdata } = useDonationStore((state) => state)


    // const path = "/product/create/events" + (pathname?.includes("edit") ? "/edit" : "/draft")

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
                title: error?.response?.data?.message ?? "Error Occurred",
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: any) => {

            const fileArray = Object.values(data?.data);

            console.log(userId);
            

            let clone = [...formik.values.data]

            clone.map((item, index) => {
                clone[index] = {...item,  bannerImage: fileArray[index]+"", creatorID: userId, collaborators: newdata[index].collaborators}
            })

            let newGroup = {creatorID: formik.values.data[0]?.creatorID, name: formik.values.data[0]?.name,bannerImage: fileArray[0],description: formik.values.data[0].description, expirationDate: Number(formik.values.data[0].endDate)}

            formik.setFieldValue("data", clone)
 

            if (!pathname?.includes("edit")) {
                createFundraisingGroup.mutate(newGroup)
            } else {
                updateFundraising?.mutate(clone[0])
            }
        }
    });


    // Edit Event
    const updateFundraising = useMutation({
        mutationFn: (data: any) => httpService.put(`/fund-raiser/edit/${id}`, data),
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

    // Create Donation 
    const createFundraising = useMutation({
        mutationFn: (data: any) => httpService.post("/fund-raiser/create", data),
        onError: (error: AxiosError<any, any>) => {

            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: AxiosResponse<any>) => { 

            setOpen(true) 
            
            toaster.create({
                title: `Fundraising Created`,
                type: "success",
                closable: true
            })
            
        }
    });

    // Create Donation Group 
    const createFundraisingGroup = useMutation({
        mutationFn: (data: any) => httpService.post("/fund-raiser-group/create", data),
        onError: (error: AxiosError<any, any>) => {

            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: AxiosResponse<any>) => {  

            console.log(data);

            console.log(formik.values.data);
            

            createFundraising.mutate({ items: formik.values.data }) 
        }
    });

    const formik = useFormik({
        initialValues: {
            data: [
                {
                    "visibility": "PUBLIC",
                    creatorID: userId,
                    name: "",
                    bannerImage: "",
                    description: "",
                    endDate: "",
                    goal: "",
                    purpose: "",
                    collaborators: []
                }
            ]
        },
        validationSchema: validationSchemaFundraising,
        onSubmit: (data: {
            data: Array<IDonation>
        }) => { 
            
            if (pathname?.includes("edit")) {
                if (image.length > 0) {
                    const fd = new FormData();
                    image.forEach((file) => {
                        fd.append("files[]", file);
                    });
                    uploadImage.mutate(fd)
                } else {
                    updateFundraising.mutate(data.data[0])
                }
            } else if (image.length > 0 && !id) {
                const fd = new FormData();
                image.forEach((file) => {
                    fd.append("files[]", file);
                });
                uploadImage.mutate(fd)
            } 
        },
    });

    return {
        formik,
        uploadImage,
        createFundraising,
        createFundraisingGroup,
        updateFundraising,
        open,
        setOpen
    };
}

export default useFundraising