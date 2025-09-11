"use client"
import { Information, SuccessModal, Theme, Ticket } from "@/components/createEventComponents"; 
import useEvent from "@/hooks/useEvent";
import { Flex } from "@chakra-ui/react";
import { FormikProvider } from "formik";
import { useSearchParams } from "next/navigation"; 

export default function CreateEventPage() {

    const query = useSearchParams();
    const type = query?.get('type');

    const { formik, uploadImage, createDraft, saveToDraft, createEventFromDraft, open, setOpen, updateUserEvent } = useEvent()

    return (
        <FormikProvider value={formik}>
            <Flex w={"full"} justifyContent={"center"} py={"8"} >
                <Flex maxW={["full", "full", "569px"]} w={"full"} >
                    {!type && (
                        <Theme formik={formik} isLoading={uploadImage.isPending || createDraft.isPending || saveToDraft?.isPending} />
                    )}
                    {type === "info" && (
                        <Information formik={formik} isLoading={uploadImage.isPending || saveToDraft?.isPending} />
                    )}
                    {type === "ticket" && (
                        <Ticket formik={formik} isLoading={uploadImage.isPending || createEventFromDraft?.isPending || updateUserEvent?.isPending} />
                    )}
                </Flex>
                <SuccessModal open={open} setOpen={setOpen} />
            </Flex>
        </FormikProvider>
    )
}