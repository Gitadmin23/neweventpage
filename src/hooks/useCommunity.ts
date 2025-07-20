import { toaster } from "@/components/ui/toaster";
import httpService from "@/helpers/services/httpService";
import { URLS } from "@/helpers/services/urls";
import { useImage } from "@/helpers/store/useImagePicker";
import { useDetails } from "@/helpers/store/useUserDetails";
import { validationSchemaCommunity } from "@/helpers/validation/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";

interface ICreateCommunity {
    name: string,
    description: string,
    email: string,
    isPublic: true,
    imgSrc: string,
}

const useCommunity = () => {

    const queryClient = useQueryClient()
    const { userId, email, } = useDetails((state) => state);
    const { image, setImage } = useImage((state) => state);

    // mutations
    const createCommunity = useMutation({
        mutationFn: (data: any) => httpService.post(`${URLS.CREATE_COMMUNITY}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getMyCommunities'] });
            queryClient.invalidateQueries({ queryKey: [`/group/group?creatorID=${userId}`] });


            toaster.create({
                title: 'Community created',
                type: "success",
                closable: true
            }) 
            
            setImage([])
        },
        onError: () => {

            toaster.create({
                title: 'An error occured while trying to create a community',
                type: "error",
                closable: true
            })
        }
    })
    const uploadImage = useMutation({
        mutationFn: (data: FormData) => httpService.post(`${URLS.UPLOAD_IMAGE}/${userId}`, data),
        onSuccess: (data) => {
            const obj= {
                data: {
                    name: formik.values?.name,
                    description: formik.values.description,
                    email: email,
                    isPublic: formik.values.isPublic,
                    imgSrc: data.data?.fileName,
                }
            }; 
            createCommunity.mutate(obj);
        },
        onError: () => { 

            toaster.create({
                title: 'An error occured while trying to upload image',
                type: "error",
                closable: true
            })
        },
    });


    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            email: email,
            isPublic: true,
            imgSrc: "",
        },
        validationSchema: validationSchemaCommunity,
        onSubmit: (data: ICreateCommunity) => {

            const formData = new FormData();
            formData.append('file', image[0] as any);
            uploadImage?.mutate(formData) 
            uploadImage.mutate(formData)
        },
    });

    return {
        uploadImage,
        formik,
        createCommunity
    };
}

export default useCommunity
