import useInfiniteScroller from "@/hooks/infiniteScrollerComponent"
import { useSearchParams } from "next/navigation";
import { LoadingAnimation } from "../shared";
import DonationCard from "./card/donationCard";
import { Flex, Grid } from "@chakra-ui/react";
import { IDonationList } from "@/helpers/models/fundraising";

export default function MyDonationList(
    {
        pasted
    }: {
        pasted?: boolean
    }
) {

    const search = ""

    const query = useSearchParams();
    const id = query?.get('id');

    const { results, isLoading: loadingList, ref, isRefetching: refetchingList } = useInfiniteScroller({
        url: pasted ? `/fund-raiser/passed?userID=${id}` : (id) ? `/fund-raiser/search?creatorID=${id}` : `/fund-raiser/user-fund-raisers`, limit: 20, filter: "id", name: "mydonationlist", search: search,
        paramsObj: {
            name: search.toLowerCase()
        }
    }) 

    return (
        <LoadingAnimation loading={loadingList} refeching={refetchingList} length={results?.length} >
            <Grid w={"full"} templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={["2", "2", "3"]} >
                {results?.map((item: IDonationList, index: number) => {
                    if (results?.length === index + 1) {
                        return (
                            <Flex ref={ref} key={index} >
                                <DonationCard item={item} pasted={pasted} />
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex key={index} >
                                <DonationCard item={item} pasted={pasted} />
                            </Flex>
                        )
                    }
                })}
            </Grid>
        </LoadingAnimation>
    )
}