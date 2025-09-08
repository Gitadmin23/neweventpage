import useCustomTheme from '@/hooks/useTheme'
import { Button, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IoChevronBack, IoChevronForward, IoClose } from 'react-icons/io5'
import { IPinned, IProduct } from '@/helpers/models/product'
import { IEventType } from '@/helpers/models/event'
import usePr from '@/hooks/usePr'
import { CustomButton, LoadingAnimation, ModalLayout } from '../shared'
import { capitalizeFLetter } from '@/helpers/utils/capitalLetter'
import { formatNumber } from '@/helpers/utils/numberFormat'
import { textLimit } from '@/helpers/utils/textlimit'
import { DASHBOARDPAGE_URL, IMAGE_URL } from '@/helpers/services/urls'
import PrBtn from '../prcomponent/prBtn'
import Cookies from "js-cookie"
import { useFetchData } from '@/hooks/useFetchData'

interface IProps {
    "id": string,
    "createdDate": number,
    "lastModifiedBy": string,
    "createdBy": string,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "status": string,
    "statusCode": number,
    "returnMessage": string,
    "typeId": string,
    "pinnedItemType": string,
    "returnProductDto": IProduct
}

export default function EventMesh({ data }: { data: IEventType, setMeshSize?: any }) {

    const { mainBackgroundColor, secondaryBackgroundColor, primaryColor } = useCustomTheme()


    const ref: any = React.useRef(null);

    const scroll = (scrolloffset: number) => {
        ref.current.scrollLeft += scrolloffset
    };

    const [newData, setNewData] = useState([] as any)

    const { pinProduct, open, setOpen } = usePr()
    const token = Cookies.get("chase_token")

    const [selectProduct, setSelectProduct] = useState<IProps>({} as IProps)

    const { data: eventData = [], isLoading } = useFetchData<Array<IProps>>({
        name: "all-events-mesh", endpoint: `/pin-item/search`, id: data?.id, params: {
            typeId: data?.id
        }
    });

    useEffect(() => {
        setNewData(eventData)
    }, [isLoading])


    const removeHandler = (item: string) => {
        let obj: Array<IPinned> = [{
            pinnedItemType: "EVENT",
            typeId: data?.id,
            productId: item
        }]

        pinProduct?.mutate({ pinnedItems: [...obj] })
    }

    const openHandler = (e: any, item: IProps) => {
        e.stopPropagation()
        setSelectProduct(item)
        setOpen(true)
    }


    const routeHandler = (item?: string) => {

        if (item) {
            window.location.href = `${DASHBOARDPAGE_URL}/dashboard/kisok/details/${item}?token=${token}`;
        } else {
            window.location.href = `${DASHBOARDPAGE_URL}/dashboard/profile/${data?.createdBy?.userId}/kiosk?token=${token}`;
        }

    }

    return (
        <Flex position={"relative"} display={(newData?.length > 0 || data?.isOrganizer) ? "flex" : "none"} w={"full"} flexDir={"column"} mb={["0px", "0px", "6"]} gap={"3"} >
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                {data?.isOrganizer ? (
                    <Text fontWeight={"500"} >Add  Product to enable your Audience connect to your event</Text>
                ) : (
                    <Text fontSize={["14px", "14px", "16px"]} fontWeight={"bold"} >Shop the {capitalizeFLetter(data?.eventName)}</Text>
                )}
                {!data?.isOrganizer && (
                    <Text fontSize={"12px"} fontWeight={"600"} width={"50px"} onClick={() => routeHandler()} color={primaryColor} as={"button"} >See all</Text>
                )}
            </Flex>
            {/* <Flex w={"full"} height={"180px"} pos={"relative"} /> */}

            <LoadingAnimation loading={isLoading} >
                <Flex ref={ref} w={"auto"} pos={"relative"} overflowX={"auto"} className='hide-scrollbar' >
                    <Flex position={"relative"} w={"fit-content"} gap={"2"} pos={"relative"} >
                        <PrBtn data={data} product={true} />
                        {eventData?.map((item, index) => {
                            return (
                                <Flex cursor={"pointer"} pos={"relative"} bgColor={mainBackgroundColor} key={index} onClick={() => routeHandler(item?.returnProductDto?.id)} w={["170px", "170px", "230px"]} h={["170px", "170px", "219px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"2"} rounded={"16px"} >

                                    {data?.isOrganizer && (
                                        <Flex w={"6"} h={"6"} onClick={(e) => openHandler(e, item)} justifyContent={"center"} alignItems={"center"} pos={"absolute"} top={"3"} right={"3"} zIndex={"50"} bg={"#F2A09B66"} color={"#F50A0A"} rounded={"full"} >
                                            <IoClose size={"14px"} />
                                        </Flex>
                                    )}
                                    <Flex w={"full"} h={["101px", "101px", "150px"]} p={"1"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor} rounded={"8px"} >
                                        <Image alt="logo" height={"full"} w={"auto"} objectFit={"contain"} rounded={"8px"} src={IMAGE_URL + item?.returnProductDto?.images[0]} />
                                    </Flex>
                                    <Flex flexDir={"column"} >
                                        <Text fontSize={"14px"} fontWeight={"700"} >{formatNumber(item?.returnProductDto?.price)}</Text>
                                        <Text fontSize={["12px", "12px", "14px"]} >{capitalizeFLetter(textLimit(item?.returnProductDto?.name, 20))}</Text>
                                    </Flex>

                                </Flex>
                            )
                        })} 
                        <ModalLayout open={open} trigger={true} close={() => setOpen(false)} size={"xs"} >
                            <Flex width='100%' flexDir={"column"} justifyContent={'center'} p={"4"} height='100%' alignItems={'center'} gap={"3"} >
                                <Image alt='delete' src='/images/deleteaccount.svg' />
                                <Text fontWeight={"700"} textAlign={'center'} fontSize={'20px'}>Remove Product </Text>
                                <Text textAlign={'center'} fontSize={'14px'} >Are you sure you want to remove <span style={{ fontWeight: "bold" }} >{capitalizeFLetter(selectProduct?.returnProductDto?.name)}</span>, this action cannot be undone.</Text>
                                <CustomButton borderRadius={"full"} disabled={pinProduct.isPending} onClick={() => removeHandler(selectProduct?.returnProductDto?.id)} isLoading={pinProduct.isPending} fontSize={"14px"} width='100%' height='42px' backgroundColor='red' color="white" variant='solid' text={"Remove"} />
                                <CustomButton borderRadius={"full"} onClick={() => setOpen(false)} width='100%' height='42px' borderWidth={'1px'} borderColor={primaryColor} color={primaryColor} backgroundColor={"white"} text={"Cancel"} />
                            </Flex>
                        </ModalLayout>
                    </Flex>
                </Flex>
            </LoadingAnimation>
            {eventData?.length > 3 && (
                <>
                    <Flex zIndex={"10"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} position={"absolute"} top={"50%"} left={"0px"} bgColor={"white"} borderWidth={"1px"} onClick={() => scroll(-400)} as="button" w={"40px"} h={"40px"} rounded={"full"} >
                        <IoChevronBack size={"20px"} color='grey' />
                    </Flex>
                    <Flex zIndex={"10"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} position={"absolute"} top={"50%"} right={"0px"} bgColor={"white"} borderWidth={"1px"} onClick={() => scroll(400)} as="button" w={"40px"} h={"40px"} rounded={"full"} >
                        <IoChevronForward size={"20px"} color='grey' />
                    </Flex>
                </>
            )}
        </Flex>
    )
}
