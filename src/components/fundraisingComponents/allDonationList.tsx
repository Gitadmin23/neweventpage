"use client"
import useInfiniteScroller from "@/hooks/infiniteScrollerComponent";
import { Flex, Grid } from "@chakra-ui/react";
import { LoadingAnimation } from "../shared";
import DonationGroupCard from "./card/donationGroupCard";
import { IDonationGroup } from "@/helpers/models/fundraising";
import DonationCard from "./card/donationCard";
import useSearchStore from "@/helpers/store/useSearchData";

export default function AllDonationList() {

    const { search } = useSearchStore((state) => state)


    const { results, isLoading: loadingList, ref, isRefetching: refetchingList } = useInfiniteScroller({
        url: `/fund-raiser/search`, limit: 20, filter: "id", name: "donationlist", search: search,
        paramsObj: {
            name: search.toLowerCase()
        }
    })

    return (
        <LoadingAnimation loading={loadingList} refeching={refetchingList} length={results?.length} >
            <Grid w={"full"} templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={["1", "1", "3"]} >
                {results?.map((item: any, index: number) => {
                    if (results?.length === index + 1) {
                        return (
                            <Flex ref={ref} key={index} >
                                <DonationCard item={item} />
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex key={index} >
                                <DonationCard item={item} />
                            </Flex>
                        )
                    }
                })}
            </Grid>
        </LoadingAnimation>
    )
}