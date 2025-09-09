import { CommunityCard, CustomButton, LoadingAnimation, ModalLayout } from "@/components/shared";
import { ICommunity } from "@/helpers/models/community";
import { useDetails } from "@/helpers/store/useUserDetails";
import useInfiniteScroller from "@/hooks/infiniteScrollerComponent";
import useCustomTheme from "@/hooks/useTheme";
import { AddIcon, OpenFolderIcon } from "@/svg";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function FunnelBtn(
    {
        value,
        setValue
    } : {
        value: string;
        setValue: (name: string, value: string) => void,
    }
) {


    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(0)

    const {
        primaryColor,
        secondaryBackgroundColor
    } = useCustomTheme()

    const { userId } = useDetails((state) => state)


    const { results, isLoading, ref } = useInfiniteScroller({ url: `/group/group?creatorID=${userId}`, limit: 10, filter: "id", name: "group" })

 
    const clickHandler = (item: any) => { 
        setValue("eventFunnelGroupID", item)
        setOpen(false)
    } 


    return (
        <Flex>
            <Flex cursor={"pointer"} onClick={() => setOpen(true)} fontWeight={"medium"} fontSize={"14px"} alignItems={"center"} color={primaryColor} width={"fit-content"} gap={"1"} >
                <OpenFolderIcon size="16px" />
                Select community funnel
            </Flex>
            <ModalLayout open={open} size="xs" title="Communities" closeBtn={true} trigger={true} close={() => setOpen(false)} >
                {tab === 0 && (
                    <Flex width={"full"} flexDir={"column"} px={"4"} >  
                        <CustomButton onClick={() => setTab(1)} text={"Add community"} width={"130px"} fontSize={"14px"} ml={"auto"} mt={"6"} borderRadius={"full"} />
                        <Flex width={"full"} justifyContent={"center"} py={"6"}  >
                            <Flex width={["full", "600px"]} flexDirection={"column"} gap={"4"} >
                                <LoadingAnimation loading={isLoading} length={results?.length} >
                                    {results?.map((community: ICommunity, i: number) => {
                                        if (results?.length === i + 1) {
                                            return (
                                                <Box as='button' onClick={() => clickHandler(community?.id)} ref={ref} key={i} width={"full"} borderWidth={"1px"} px={"3"} _hover={{ backgroundColor: secondaryBackgroundColor }} roundedBottom={"2xl"} roundedTopLeft={"2xl"} >
                                                    <CommunityCard create={true} data={community} />
                                                </Box>
                                            )
                                        } else {
                                            return (
                                                <Box as='button' onClick={() => clickHandler(community?.id)} key={i} width={"full"} borderWidth={"1px"} px={"3"} _hover={{ backgroundColor: secondaryBackgroundColor }} roundedBottom={"2xl"} roundedTopLeft={"2xl"} >
                                                    <CommunityCard create={true} data={community} />
                                                </Box>
                                            )
                                        }
                                    })}
                                </LoadingAnimation>
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </ModalLayout>
        </Flex>
    )
}