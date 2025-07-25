"use client"
import useInfiniteScroller from "@/hooks/infiniteScrollerComponent";
import { Flex, Grid } from "@chakra-ui/react";
import { LoadingAnimation } from "../shared";
import DonationGroupCard from "./card/donationGroupCard";
import { IDonationGroup } from "@/helpers/models/fundraising";

export default function AllDonationList() {

    const search = ""


    const { results, isLoading: loadingList, ref, isRefetching: refetchingList } = useInfiniteScroller({
        url: `/fund-raiser-group/search`, limit: 20, filter: "id", name: "donationlist", search: search,
        paramsObj: {
            name: search.toLowerCase()
        }
    })

    return (
        <LoadingAnimation loading={loadingList} refeching={refetchingList} length={results?.length} >
            <Grid w={"full"} templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={["1", "1", "3"]} >
                {results?.filter((item: IDonationGroup) => item?.fundRaisers?.length > 0 && item?.fundRaisers[0]?.visibility === "PUBLIC")?.map((item: IDonationGroup, index: number) => {
                    if (results?.filter((item: IDonationGroup) => item?.fundRaisers?.length > 0 && item?.fundRaisers[0]?.visibility === "PUBLIC")?.length === index + 1) {
                        return (
                            <Flex ref={ref} key={index} >
                                <DonationGroupCard item={item} />
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex key={index} >
                                <DonationGroupCard item={item} />
                            </Flex>
                        )
                    }
                })}
            </Grid>
        </LoadingAnimation>
    )
}