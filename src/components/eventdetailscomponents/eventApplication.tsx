import { Flex, Text } from '@chakra-ui/react'
import React from 'react' 
import moment from 'moment' 
import { useRouter } from 'next/navigation' 
import { IRental, IService } from '@/helpers/models/product';
import { IUser } from '@/helpers/models/user';
import { capitalizeFLetter } from '@/helpers/utils/capitalLetter';
import { formatNumber } from '@/helpers/utils/numberFormat';
import { textLimit } from '@/helpers/utils/textlimit';
import useCustomTheme from '@/hooks/useTheme';
import { LoadingAnimation, UserImage, CustomButton, StarRating } from '../shared';
import useApplication from '@/hooks/useApplication';

interface IApplication {
    id: string,
    createdDate: number;
    lastModifiedBy: any;
    createdBy: IUser;
    lastModifiedDate: number;
    isDeleted: boolean;
    status: any;
    statusCode: number;
    returnMessage: string;
    vendor: IUser;
    service: IService;
    rental: IRental;
    eventOrganizer: IUser;
    applicationStatus: string;
    hasViewed: boolean;
    applicationType: string;
}

export default function EventApplication({ results, loading, type }: { type?: "SERVICE" | "RENTAL", results: Array<IApplication>, loading: boolean }) {

    const { primaryColor, mainBackgroundColor, borderColor, headerTextColor } = useCustomTheme()


    const { markAsViewed } = useApplication()

    const { push } = useRouter()

    const clickHandler = (item: string, data: IApplication) => {
        if (!data?.hasViewed) {
            markAsViewed?.mutate(data?.id)
        }
        if (type === "SERVICE") {
            push(`/dashboard/kisok/service/${item}`)
        } else {
            push(`/dashboard/kisok/details-rental/${item}`)
        }
    }

    return (
        <LoadingAnimation loading={loading} length={results?.length} >
            <>
                {type === "SERVICE" && (
                    <Flex flexDir={"column"} w={"full"} gap={"4"} >
                        {results?.map((item: IApplication, index: number) => {
                            return (
                                <Flex key={index} flexDir={"column"} gap={"1"} >
                                    <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} >
                                        <Flex as={"button"} onClick={() => push(`/dashboard/profile/${item?.vendor?.userId}`)} gap={"2"} alignItems={"center"} >
                                            <UserImage user={item?.vendor} />
                                            <Text color={primaryColor} fontSize={"14px"} fontWeight={"600"} >{capitalizeFLetter(item?.vendor?.firstName + " " + item?.vendor?.lastName)}</Text>
                                        </Flex>
                                        <Flex gap={"2"} display={["none", "none", "flex"]} flexDir={"row"} alignItems={"center"} >
                                            <Text fontSize={"12px"} fontWeight={"700"} >Location: <span style={{ color: primaryColor, fontWeight: "700", fontSize: "14px" }} >{capitalizeFLetter(item?.service?.state)}</span></Text>
                                        </Flex>
                                        <Flex alignContent={"center"} gap={"2"} >
                                            <Text fontSize={"14px"} mb={"2px"} fontWeight={"700"} >{item?.service?.rating}</Text>
                                            <StarRating rate={Number(item?.service?.rating)} />
                                        </Flex>
                                    </Flex>
                                    <Flex gap={"2"} display={["flex", "flex", "none"]} flexDir={"row"} alignItems={"center"} >
                                        <Text fontSize={"12px"} fontWeight={"700"} >Location: <span style={{ color: primaryColor, fontWeight: "700", fontSize: "12px" }} >{capitalizeFLetter(item?.service?.state)}</span></Text>
                                    </Flex>
                                    <Flex w={"full"} pl={"3"} bgColor={primaryColor} rounded={"16px"} h={"fit-content"} borderWidth={"1px"} borderColor={borderColor} >
                                        <Flex w={"full"} bgColor={mainBackgroundColor} justifyContent={"space-between"} h={"117px"} alignItems={"center"} px={"5"} gap={"2"} roundedLeft={"0px"} roundedRight={"16px"} >
                                            <Flex flexDir={"column"} fontSize={"14px"} >
                                                <Text fontWeight={"600"} >{capitalizeFLetter(item?.service?.name)}</Text>
                                                <Text fontSize={"12px"} >{textLimit(item?.service?.category?.replaceAll("_", " "), 30)}</Text>
                                                <Text fontSize={"10px"} >{moment(item?.createdDate)?.fromNow()}</Text>
                                                <Text fontSize={"14px"} fontWeight={"600"} >{formatNumber(item?.service?.price)}</Text>
                                            </Flex>
                                            <Flex h={"full"} justifyContent={"center"} alignItems={"center"} pos={"relative"} >
                                                {item?.hasViewed && (
                                                    <Text pos={"absolute"} color={"red"} top={"2"} right={"2"} fontWeight={"700"} fontSize={"12px"} >Viewed</Text>
                                                )}
                                                <CustomButton text={"Book Now"} onClick={() => clickHandler(item?.service?.id, item)} width={"120px"} borderRadius={"32px"} borderWidth={"1px"} fontSize={"14px"} borderColor={borderColor} height={"40px"} color={headerTextColor} backgroundColor={mainBackgroundColor} />
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            )
                        })}
                    </Flex>
                )}
                {type === "RENTAL" && (
                    <Flex flexDir={"column"} w={"full"} gap={"4"} >
                        {results?.filter((item: IApplication)=> item?.rental)?.map((item: IApplication, index: number) => {
                            return (
                                <Flex key={index} flexDir={"column"} gap={"1"} >
                                    <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} >
                                        <Flex as={"button"} onClick={() => push(`/dashboard/profile/${item?.vendor?.userId}`)} gap={"2"} alignItems={"center"} >
                                            <UserImage user={item?.vendor} />
                                            <Text color={primaryColor} fontSize={"14px"} fontWeight={"600"} >{capitalizeFLetter(item?.vendor?.firstName + " " + item?.vendor?.lastName)}</Text>
                                        </Flex>
                                        <Flex gap={"2"} display={["none", "none", "flex"]} flexDir={"row"} alignItems={"center"} >
                                            <Text fontSize={"12px"} fontWeight={"700"} >Location: <span style={{ color: primaryColor, fontWeight: "700", fontSize: "14px" }} >{capitalizeFLetter(item?.rental?.location?.state)}</span></Text>
                                        </Flex>
                                        <Flex alignContent={"center"} gap={"2"} >
                                            <Text fontSize={"14px"} mb={"2px"} fontWeight={"700"} >{item?.rental?.rating}</Text>
                                            <StarRating rate={Number(item?.rental?.rating)} />
                                        </Flex>
                                    </Flex>
                                    <Flex gap={"2"} display={["flex", "flex", "none"]} flexDir={"row"} alignItems={"center"} >
                                        <Text fontSize={"12px"} fontWeight={"700"} >Location: <span style={{ color: primaryColor, fontWeight: "700", fontSize: "12px" }} >{capitalizeFLetter(item?.rental?.location?.state)}</span></Text>
                                    </Flex>
                                    <Flex w={"full"} pl={"3"} bgColor={primaryColor} rounded={"16px"} h={"fit-content"} borderWidth={"1px"} borderColor={borderColor} >
                                        <Flex w={"full"} bgColor={mainBackgroundColor} justifyContent={"space-between"} h={"117px"} alignItems={"center"} px={"5"} roundedLeft={"0px"} roundedRight={"16px"} >
                                            <Flex flexDir={"column"} fontSize={"14px"} >
                                                <Text fontWeight={"500"} >{capitalizeFLetter(item?.rental?.name)}</Text>
                                                <Text fontSize={"12px"} >{textLimit(item?.service?.category?.replaceAll("_", " "), 30)}</Text>
                                                <Text fontSize={"10px"} >{moment(item?.createdDate)?.fromNow()}</Text>
                                                <Text fontWeight={"500"} >{formatNumber(item?.rental?.price)}</Text>
                                            </Flex>
                                            <Flex h={"full"} justifyContent={"center"} alignItems={"center"} pos={"relative"} >
                                                {item?.hasViewed && (
                                                    <Text pos={"absolute"} color={"red"} top={"2"} right={"2"} fontWeight={"700"} fontSize={"12px"} >Viewed</Text>
                                                )}
                                                <CustomButton text={"Book Now"} onClick={() => clickHandler(item?.rental?.id, item)} width={"120px"} borderRadius={"32px"} borderWidth={"1px"} fontSize={"14px"} borderColor={borderColor} height={"40px"} color={headerTextColor} backgroundColor={mainBackgroundColor} />
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            )
                        })}
                    </Flex>
                )}
            </>
        </LoadingAnimation>
    )
}
