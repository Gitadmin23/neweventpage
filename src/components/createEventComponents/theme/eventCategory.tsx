"use client"
import { CustomSelect } from "@/components/shared";
import httpService from "@/helpers/services/httpService";
import { Flex, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react"; 

export default function EventCategory(
    {
        setValue, 
        value,
        touched,
        errors
    }: { 
        value: string
        setValue: (name: string, value: string) => void,
        errors?: any,
        touched?: any,
    }
){ 

    const [ data, setData ] = useState([])


    const { mutate: fetchData, isPending: isLoading } = useMutation({
        mutationKey: ['userInfo'],
        mutationFn: () =>
            httpService.get("/events/get-event-types"),
        onSuccess: (data: any) => {

            const flavorOptions = data?.data.map((flavor: string) => ({
                value: flavor,
                label: (flavor.charAt(0).toUpperCase() + flavor.slice(1).split("_").join(" "))
            }));

            setData(flavorOptions) 

        },
    });

    useEffect(()=> {
        fetchData()
    }, [])

    const changeHandler = (item: string) => { 
        setValue("eventType", item)
    }

    return(
        <Flex w={"full"} >
            {!isLoading ? (
                <CustomSelect value={value} touched={touched} errors={errors} name="eventType" label="Event Type *" size="md" setValue={changeHandler} data={data} placeholder={""} />
            ) : (
                <Text textAlign={"center"} >Loading...</Text>
            )}
        </Flex>
    )
}