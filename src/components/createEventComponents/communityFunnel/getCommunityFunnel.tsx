
import { CommunityCard, LoadingAnimation } from '@/components/shared';
import useInfiniteScroller from '@/hooks/infiniteScrollerComponent';
import { Flex, Box } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { IoClose } from 'react-icons/io5';

interface Props {
    value: string
    setValue: (name: string, value: string) => void,
}

function GetCommunity(props: Props) {
    const {
        value,
        setValue
    } = props

    const { results, isLoading, ref, refetch } = useInfiniteScroller({ url: `/group/group?groupID=${value ? value : ""}`, limit: 10, filter: "id" })

    const clickHandler = () => {
        setValue("eventFunnelGroupID", "")
    }

    useEffect(() => {
        refetch()
    }, [value])

    return (
        <Flex width={["full", "full"]} flexDirection={"column"} > 
            <LoadingAnimation loading={isLoading} >
                {value && (
                    <>
                        {results?.map((community: any, i: number) => {
                            return (
                                <Box ref={ref} key={i} width={"full"} borderWidth={"1px"} mt={"4"} position={"relative"} px={"3"} shadow={"xl"} roundedBottom={"2xl"} roundedTopLeft={"2xl"} >
                                    <Box position={"absolute"} top={"2"} right={"3"} onClick={() => clickHandler()} as='button' >
                                        <IoClose />
                                    </Box>
                                    <CommunityCard create={true} data={community} />
                                </Box>
                            )
                        })}
                    </>
                )}
            </LoadingAnimation>
        </Flex>
    )
}

export default GetCommunity
