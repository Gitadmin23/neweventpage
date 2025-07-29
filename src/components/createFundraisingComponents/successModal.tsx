"use client"
import useCustomTheme from "@/hooks/useTheme"
import { ThumbsUpIcon } from "@/svg"
import { Flex, Text } from "@chakra-ui/react"
import { CustomButton, ModalLayout } from "../shared"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function SuccessModal(
    {
        open,
        setOpen
    }: {
        open: boolean;
        setOpen: (item: boolean) => void
    }
) {

    const { 
        headerTextColor,
        bodyTextColor
    } = useCustomTheme()

    const pathname = usePathname()
    const router = useRouter()

    const query = useSearchParams();

    console.log(open);
    
    const id = query?.get('id');

    return (
        <ModalLayout open={open} size="sm" trigger={true} close={() => setOpen(true)} >
           <Flex w={"full"} justifyContent={"center"} >
           <Flex maxW={"300px"} flexDir={"column"} alignItems={"center"} py={"8"}>
                <ThumbsUpIcon />
                <Text fontSize={"22px"} color={headerTextColor} lineHeight={"26.4px"} textAlign={"center"} fontWeight={"700"} mt={"4"} >Fundraising {pathname?.includes("edit") ? "Updated" : "Created"} Successfully</Text>
                <Text fontSize={"14px"} color={bodyTextColor} fontWeight={"500"} maxW={"300px"} textAlign={"center"} mt={"2"} mb={"6"} lineHeight={"16.8px"} >Your fundraising is now live. You may proceed to My fundraising to view it.</Text>
                <CustomButton borderWidth={"0px"}
                    onClick={() => router.push(`/product/fundraising?type=my_fundraising`)} 
                    color={"white"} text='Proceed to My Fundraising' w={"full"} borderRadius={"999px"} />
            </Flex>
           </Flex>
        </ModalLayout>
    )
}