import useInfiniteScroller from "@/hooks/infiniteScrollerComponent";
import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { LoadingAnimation } from "../shared";
import EventCard from "./cards/eventCard";
import { useSearchParams } from "next/navigation";
import useSearchStore from "@/helpers/store/useSearchData";

export default function EventLisiting() {

    const query = useSearchParams();
    const category = query?.get('category');
    const { search } = useSearchStore((state) => state)

    const { results, isLoading, ref, isRefetching } = useInfiniteScroller({ url: `/events/events`, limit: 20, filter: "id", name: "listofevent", paramsObj: {
        eventType: category,
        eventName: search
    }})
 
    return (
        <Flex justifyContent={"center"} gap={["4", "4", "6"]} w={"full"} pt={["4", "4", "8"]} h={"full"} flexDirection={"column"} >
            <LoadingAnimation loading={isLoading} length={results?.length} refeching={isRefetching} > 
                <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={["2", "2", "4"]}>
                    {results?.map((event: any, i: number) => {
                        if (results.length === i + 1) {
                            return (
                                <GridItem key={i} w={["full", "full", "full", "full", "full"]} ref={ref} >
                                    <EventCard event={event} />
                                </GridItem>
                            )
                        } else {
                            return (
                                <GridItem key={i + "last"} w={["full", "full", "full", "full", "full"]}  >
                                    <EventCard event={event} />
                                </GridItem>
                            )
                        }
                    })}
                </Grid>
            </LoadingAnimation>
        </Flex>
    )
}