"use client"
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent' 
import { FaCheckSquare } from 'react-icons/fa';
import useCustomTheme from '@/hooks/useTheme';
import { useRouter } from 'next/navigation'; 
import { IPinned, IProduct } from '@/helpers/models/product';
import usePr from '@/hooks/usePr';
import { IEventType } from '@/helpers/models/event';
import { toaster } from '@/components/ui/toaster';
import { Flex, Image, Text } from '@chakra-ui/react';
import { CustomButton, LoadingAnimation } from '@/components/shared';
import { IMAGE_URL } from '@/helpers/services/urls';
import { textLimit } from '@/helpers/utils/textlimit';
import { numberFormatNaire } from '@/helpers/utils/formatNumberWithK';
import useGetUser from '@/hooks/useGetUser';
import { useDetails } from '@/helpers/store/useUserDetails';
 

export default function ListProduct({ setOpen, selectProduct, setSelectProduct, data, setTab }: { setOpen?: any, selectProduct: Array<IPinned>, setSelectProduct: any, data?: IEventType, length: any, setTab?: any }) {

    
    const { userId } = useDetails()

    const { primaryColor } = useCustomTheme()
    const router = useRouter()

    const { pinProduct } = usePr() 

    const { results, isLoading, ref } = InfiniteScrollerComponent({ url: `/products/search?creatorID=${userId}`, limit: 20, filter: "id", name: "getProduct" })

    const selectProductHandler = (dataindex: string) => {

        let myArr: any = [...selectProduct]
        const exists = selectProduct.some((item) => item.productId === dataindex);
        if (exists) {
            var index = myArr.findIndex(function (o: IPinned) {
                return o.productId === dataindex;
            })
            myArr.splice(index, 1);
            setSelectProduct(myArr)
        } else {
            setSelectProduct([...myArr, {
                pinnedItemType: "EVENT",
                typeId: data?.id,
                productId: dataindex
            }])
        }
    } 

    const clickHander = () => {

        if (results?.length === 0) {
            router?.push(`/dashboard/kisok/create?event=${data?.id}`)
        } else if (selectProduct?.length > 0) {
            pinProduct?.mutate({ pinnedItems: selectProduct })
            setOpen(false)
            setTab(false)
        } else {

            toaster.create({
                title: "Added a product", 
                type: "info",
                closable: true
            })  
        }
    }


    return (
        <Flex flexDir={"column"} gap={"3"} >

            <LoadingAnimation loading={isLoading} length={results?.length} >
                <Flex w={"full"} maxH={"300px"} flexDir={"column"} gap={"3"} overflowY={"auto"} pos={"relative"} >
                    {results?.map((item: IProduct, index: number) => {
                        if (results?.length === index + 1) {
                            return (
                                <Flex ref={ref} as={"button"} key={index} onClick={() => selectProductHandler(item?.id)} w={"full"} borderWidth={"1px"} alignItems={"center"} borderColor={"#EBEDF0"} gap={"2"} p={"4"} rounded={"16px"} >
                                    <Flex width={"fit-content"} >
                                        <Flex w={"79px"} h={["79px"]} bgColor={"gray"} rounded={"8px"} >
                                            <Image alt='prod' w={"full"} h={"full"} src={IMAGE_URL + item?.images[0]} rounded={"8px"} />
                                        </Flex>
                                    </Flex>
                                    <Flex flexDir={"column"} gap={"2px"} >
                                        <Text fontSize={["14px"]} fontWeight={"600"} >{textLimit(item?.name, 20)}</Text>
                                        <Text fontSize={["10px", "10px", "10px"]} >{textLimit(item?.description, 30)}</Text>
                                        <Text fontSize={"12px"} fontWeight={"700"} >{numberFormatNaire(item?.price)}</Text>
                                    </Flex>
                                    <Flex ml={"auto"} >
                                        {selectProduct.some((items) => items.productId === item?.id) ? (
                                            <FaCheckSquare color={primaryColor} size={"20px"} />
                                        ) : (
                                            <Flex w={"5"} h={"5"} rounded={"5px"} borderWidth={"2px"} />
                                        )}
                                        {/* <Checkbox size={"lg"} onChange={() => selectProductHandler(item?.id)} isChecked={selectProduct.some((items) => items.productId === item?.id)} /> */}
                                    </Flex>
                                </Flex>
                            )
                        } else {
                            return (
                                <Flex as={"button"} key={index} onClick={() => selectProductHandler(item?.id)} w={"full"} borderWidth={"1px"} alignItems={"center"} borderColor={"#EBEDF0"} gap={"2"} p={"4"} rounded={"16px"} >
                                    <Flex width={"fit-content"} >
                                        <Flex w={"79px"} h={["79px"]} bgColor={"gray"} rounded={"8px"} >
                                            <Image alt='prod' src={IMAGE_URL + item?.images[0]} rounded={"8px"} />
                                        </Flex>
                                    </Flex>
                                    <Flex flexDir={"column"} gap={"2px"} >
                                        <Text fontSize={["14px"]} fontWeight={"600"} >{textLimit(item?.name, 20)}</Text>
                                        <Text fontSize={["10px", "10px", "10px"]} >{textLimit(item?.description, 30)}</Text>
                                        <Text fontSize={"12px"} fontWeight={"700"} >{numberFormatNaire(item?.price)}</Text>
                                    </Flex>
                                    <Flex ml={"auto"} >
                                        {selectProduct.some((items) => items.productId === item?.id) ? (
                                            <FaCheckSquare color={primaryColor} size={"20px"} />
                                        ) : (
                                            <Flex w={"5"} h={"5"} rounded={"5px"} borderWidth={"2px"} />
                                        )}
                                        {/* <Checkbox size={"lg"} onChange={() => selectProductHandler(item?.id)} isChecked={selectProduct.some((items) => items.productId === item?.id)} /> */}
                                    </Flex>
                                </Flex>
                            )
                        }
                    })}
                </Flex>
            </LoadingAnimation>
            <Flex w={"full"} py={"1"} position={"sticky"} bottom={"-4px"} >
                <CustomButton onClick={clickHander} isLoading={pinProduct?.isPending} text={"Add to product"} width={"150px"} height={"40px"} fontSize={"14px"} borderRadius={"999px"} />
            </Flex>
        </Flex>
    )
}
