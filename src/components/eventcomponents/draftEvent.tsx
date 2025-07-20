import useInfiniteScroller from "@/hooks/infiniteScrollerComponent";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { LoadingAnimation } from "../shared"; 
import UserEventCard from "./cards/userEventCard"; 

export default function DraftEvent() {

    const { results, isLoading, ref } = useInfiniteScroller({ url: `/events/drafts`, limit: 20, filter: "id", name: "draftevent" })
 
    return (
        <Flex justifyContent={"center"} gap={["4", "4", "6"]} w={"full"} pt={["4", "4", "8"]} h={"full"} flexDirection={"column"} >
            <LoadingAnimation loading={isLoading} length={results?.length} > 
                <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={["2", "2", "4"]}>
                    {results?.map((event: any, i: number) => {
                        if (results.length === i + 1) {
                            return (
                                <GridItem key={i} w={["full", "full", "full", "full", "full"]} ref={ref} >
                                    <UserEventCard {...event} />
                                </GridItem>
                            )
                        } else {
                            return (
                                <GridItem key={i + "last"} w={["full", "full", "full", "full", "full"]}  >
                                    <UserEventCard {...event} />
                                </GridItem>
                            )
                        }
                    })}
                </Grid>
            </LoadingAnimation>
        </Flex>
    )
}