"use client"
import { CircularProgressBar, ProductImageScroller, ShareLink } from "@/components/shared";
import DonationBtn from "@/components/shared/donationBtn";
import { IDonationGroup } from "@/helpers/models/fundraising";
import { SHARE_URL } from "@/helpers/services/urls";
import { useDetails } from "@/helpers/store/useUserDetails";
import { capitalizeFLetter } from "@/helpers/utils/capitalLetter";
import { formatNumberWithK } from "@/helpers/utils/formatNumberWithK";
import { isDateInPast } from "@/helpers/utils/isPast";
import { formatNumber } from "@/helpers/utils/numberFormat";
import { textLimit } from "@/helpers/utils/textlimit";
import useCustomTheme from "@/hooks/useTheme";
import { Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";

export default function DonationGroupCard(
    {
        item
    }: {
        item: IDonationGroup
    }
) {

    const {
        bodyTextColor,
        mainBackgroundColor
    } = useCustomTheme()

    const router = useRouter()

    const { userId } = useDetails((state) => state)
    const query = useSearchParams();
    const frame = query?.get('frame');

    const clickHandler = (item: IDonationGroup, index: string) => {
        if (frame) {
            window.location.href = `${SHARE_URL}/fundraiser?id=${item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.id}`;
        } else {
            router?.push("/product/details/fundraising/" + item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.id)
        }
        // }
    }

    console.log(item);
    

    return (
        <Flex flexDir={"column"} bgColor={mainBackgroundColor} borderWidth={"1px"} rounded={"10px"} w={"full"} h={"full"} >
            <Flex onClick={() => clickHandler(item, item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.id)} cursor={"pointer"} w={"full"} h={"fit-content"} pos={"relative"} >
                <ProductImageScroller images={[item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.bannerImage]} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.user} />
                {!frame && (
                    <ShareLink
                        data={item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]}
                        type="DONATION"
                        // size="18px"
                        showText={false}
                        id={item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.id}
                    />
                )}
            </Flex>
            <Flex onClick={() => clickHandler(item, item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.id)} cursor={"pointer"} w={"full"} flexDir={"column"} px={["2", "2", "3"]} pt={["2", "2", "3"]} gap={"2"} pb={["2", "2", userId !== item?.user?.userId ? "0px" : "3"]} >
                <Flex w={"full"} >
                    <Flex w={"full"} alignItems={"start"} flexDir={"column"} >
                        <Text fontSize={"12px"} color={bodyTextColor} >Fundraising Title</Text>
                        <Text fontWeight={"700"} fontSize={"14px"} >{textLimit(capitalizeFLetter(item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.name), 15)}</Text>
                    </Flex>
                    <Flex w={"full"} alignItems={"end"} flexDir={"column"} >
                        <Text fontSize={"12px"} color={bodyTextColor} >Target </Text>
                        <Text fontWeight={"700"} fontSize={"14px"} >{formatNumberWithK(item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.goal, true)}</Text>
                    </Flex>
                </Flex>
                <Flex w={"full"} >
                    <Flex w={"full"} alignItems={"start"} flexDir={"column"} >
                        <Text fontSize={"12px"} color={bodyTextColor} >Amount Raised</Text>
                        <Text fontWeight={"700"} fontSize={"14px"} >{formatNumber(item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.total)}</Text>
                    </Flex>
                    <Flex w={"full"} alignItems={"end"} flexDir={"column"}  >
                        <CircularProgressBar fontSize={"10px"} isEvent={true} size={35} strokeWidth={3} progress={((Number(item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.total) === 0) && (Number(item?.goal) === 0)) ? 0 : (Number(item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.total) / Number(item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.goal)) * 100 > 100 ? 100 : Number(((Number(item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.total) / Number(item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]?.goal)) * 100)?.toFixed(2))} />
                    </Flex>
                </Flex>
            </Flex>
            {(userId !== item?.user?.userId) && (
                <Flex as={"button"} w={"full"} display={["none", "none", "flex"]} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} px={"3"} fontWeight={"600"} py={"4"} justifyContent={"center"} >
                    <DonationBtn data={item} item={item?.fundRaisers?.filter((item) => isDateInPast(item?.endDate))[0]} user={item?.user} />
                </Flex>
            )}
        </Flex>
    )
}