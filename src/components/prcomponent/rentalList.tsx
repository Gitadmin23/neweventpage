import React, { useEffect, useState } from 'react'
import { Checkbox, Flex, Input, Text, Textarea } from '@chakra-ui/react';
import useCustomTheme from '@/hooks/useTheme';
import { RiSearchLine } from 'react-icons/ri';
import { FaCheckSquare } from 'react-icons/fa';
import { useFetchData } from '@/hooks/useFetchData';
import { ITag } from '@/helpers/models/pr';
import { CustomButton, LoadingAnimation } from '../shared';
import { textLimit } from '@/helpers/utils/textlimit';
import { IEventType } from '@/helpers/models/event';
import usePr from '@/hooks/usePr';

export default function ListRental(
    {
        data,
        setOpen
    }: {
        data: IEventType,
        setOpen: (item: boolean) => void
    }
) {

    const { tagServiceAndRental } = usePr()
    const [selectRental, setSelectRental] = useState<Array<ITag>>([])

    const { data: datarental, isLoading } = useFetchData<Array<any>>({ name: "all-rental", endpoint: `/rental/categories` });


    const [selectedItem, setSelectedItem] = useState("")
    const [search, setSearch] = useState("")
    const { mainBackgroundColor, primaryColor, secondaryBackgroundColor } = useCustomTheme()

    const selectRentalHandler = (data: string) => {
        const clone = [...selectRental]
        if (selectRental?.some(item => item.category === data)) {
            setSelectRental((prevItems: any) => prevItems.filter((item: any) => item.category !== data));// Removes the element at the found index  
            // setSelectRental(clone)
        } else {
            setSelectRental([...clone, {
                "category": data,
                "description": "",
                "type": "RENTAL"
            }])
        }
    }

    const changeHandler = (type: string, value: string) => {
        const clone = [...selectRental]

        clone[selectRental.findIndex((item: any) => item.category === type)] = { ...clone[selectRental.findIndex((item: any) => item.category === type)], description: value }
        setSelectRental(clone)
    }

    const submitHandler = () => {
        tagServiceAndRental?.mutate({
            serviceCategories: [],
            rentalCategories: selectRental,
            eventID: data?.id,
            state: data?.location?.placeIds ? data?.location?.placeIds : "Rivers"
        })
    } 

    useEffect(()=> {
        if(tagServiceAndRental.isSuccess){
            setOpen(false)
        }
    }, [tagServiceAndRental])

    return (
        <Flex w={"full"} flexDir={"column"} gap={"3"} >
            <LoadingAnimation loading={isLoading} length={datarental?.length} >
                <Flex w={"full"} flexDir={"column"} gap={"3"} >
                    <Flex w={"full"} pos={"relative"} h={"40px"} >
                        <Input type="search" onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search' w={"full"} h={"40px"} pl={"40px"} rounded={"full"} fontSize={"14px"} />
                        <Flex w={"40px"} h={"40px"} pos={"absolute"} top={"0px"} justifyContent={"center"} alignItems={"center"} >
                            <RiSearchLine size={"25px"} color='#B6B6B6' />
                        </Flex>
                    </Flex>
                    <Flex w={"full"} maxH={"300px"} flexDir={"column"} gap={"3"} bgColor={secondaryBackgroundColor} rounded={"16px"} overflowY={"auto"} pos={"relative"} >
                        {datarental?.filter((item: string) => item?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase()))?.sort((a: string, b: string) => {
                            if (a > b) {
                                return 1
                            } else {
                                return -1;
                            }
                            return 0;
                        })?.map((item: string, index: number) => {
                            return (
                                <Flex key={index} as={"button"} w={"full"} h={"fit-content"} gap={"2"} flexDir={"column"} borderBottomWidth={"1px"} borderColor={"#EAEBEDCC"} >
                                    <Flex flexDir={"column"} h={item === selectedItem ? "40px" : "53px"} w={"full"} justifyContent={"space-between"} >
                                        <Flex onClick={() => selectRentalHandler(item)} w={"full"} px={"4"} pt={(item !== selectedItem && selectRental?.some((subitem: any) => subitem.category === item)) ? "2" : "0px"} h={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                            <Text fontSize={"14px"} >{textLimit(item?.replaceAll("_", " "), 30)}</Text>
                                            <Flex ml={"auto"} >
                                                {selectRental?.some((subitem: any) => subitem.category === item) ? (
                                                    <FaCheckSquare color={primaryColor} size={"20px"} />
                                                ) : (
                                                    <Flex w={"5"} h={"5"} rounded={"5px"} borderWidth={"2px"} />
                                                )}
                                            </Flex>
                                            {/* <Checkbox isChecked={rental?.some((subitem: any) => subitem.category === item) ? true : false} onChange={()=>  selectRentalHandler(item)} /> */}
                                        </Flex>

                                        {(item !== selectedItem && selectRental?.some((subitem: any) => subitem.category === item)) && (
                                            <Flex px={"4"} color={primaryColor} as={"button"} pb={"1"} fontSize={"10px"} onClick={() => setSelectedItem(item)} >{selectRental[selectRental.findIndex((subitem: any) => subitem.category === item)]?.description.length > 0 ? "View requirements" : "Add requirements"}</Flex>
                                        )}
                                    </Flex>
                                    {item === selectedItem && (
                                        <Flex flexDir={"column"} gap={"2"} pb={"2"} justifyContent={"start"} alignItems={"start"} px={"3"} w={"full"} >
                                            <Text fontSize={"10px"} >{("please ENTER YOUR SERVICE requirements")?.toLocaleLowerCase()}</Text>
                                            <Flex w={"full"} gap={"2"} >
                                                <Textarea p={"2"} value={selectRental[selectRental.findIndex((subitem: any) => subitem.category === item)]?.description} onChange={(e) => changeHandler(item, e.target?.value)} h={"55px"} bgColor={mainBackgroundColor} />
                                                <Flex mt={"auto"} w={"fit-content"} >
                                                    <Flex px={"2"} color={primaryColor} fontSize={"12px"} h={"35px"} as={"button"} onClick={() => setSelectedItem("")} >Done</Flex>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    )}
                                </Flex>
                            )
                        })}
                    </Flex>
                </Flex>
            </LoadingAnimation>
            <Flex w={"full"} py={"1"} >
                <CustomButton onClick={submitHandler} isLoading={tagServiceAndRental?.isPending} text={"Add"} width={"150px"} height={"40px"} fontSize={"14px"} borderRadius={"999px"} />
            </Flex>
        </Flex>
    )
}
