import useInfiniteScroller from "@/hooks/infiniteScrollerComponent";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { LoadingAnimation } from "../shared"; 
import UserEventCard from "./cards/userEventCard";
import { useDetails } from "@/helpers/store/useUserDetails";
import useSearchStore from "@/helpers/store/useSearchData";

export default function SavedEvent() {
 
    const { search } = useSearchStore((state) => state)
    const { userId: user_index } = useDetails((state) => state); 
    const { results, isLoading, ref, isRefetching } = useInfiniteScroller({ url: `/events/get-saved-events?typeID=${user_index}`, limit: 20, filter: "id", name: "myevent", paramsObj: {
        searchText: search.toLowerCase()
    }})
 
    return (
        <Flex justifyContent={"center"} gap={["4", "4", "6"]} w={"full"} pt={["4", "4", "8"]} h={"full"} flexDirection={"column"} >
            <LoadingAnimation loading={isLoading} length={results?.length} refeching={isRefetching} > 
                <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={["2", "2", "4"]}>
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