import { Box, Button, Checkbox, Flex, Heading, Input, InputGroup, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import useCustomTheme from '@/hooks/useTheme'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { AxiosError } from 'axios'
import { useColorMode } from '../ui/color-mode'
import useDonationStore from '@/helpers/store/useDonationState'
import { useMutation } from '@tanstack/react-query'
import httpService from '@/helpers/services/httpService'
import { toaster } from '../ui/toaster'
import { IUser } from '@/helpers/models/user'
import { IDonationList } from '@/helpers/models/fundraising'
import { CustomButton, CustomCheckbox, LoadingAnimation, ModalLayout, UserImage } from '../shared'
import { textLimit } from '@/helpers/utils/textlimit'
import { CloseIcon, QuestionTwoIcon } from '@/svg'

export default function DonationCollaborator({ index, update, btn, singleData }: { index: number, btn?: boolean, update?: boolean, singleData?: IDonationList }) {

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [tab, setTab] = useState(false)
    const [search, setSearch] = React.useState('');

    const { data, updateDontion } = useDonationStore((state) => state)

    const { colorMode } = useColorMode();

    const {
        secondaryBackgroundColor,
        headerTextColor,
        bodyTextColor,
        borderColor,
        mainBackgroundColor
    } = useCustomTheme()

    const changeTabHandler = (item: boolean) => {
        setTab(item)
        setSearch("")

    }

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({
        url: `/user/search-users`, limit: 10, filter: "userId", name: "all-user", search: search, paramsObj: {
            searchText: search
        }
    })

    // Create Draft 
    const editDonation = useMutation({
        mutationFn: (payload: any) => httpService.put(`/fund-raiser/edit/${singleData?.id}`, payload),
        onError: (error: AxiosError<any, any>) => {
            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: () => {
            toaster.create({
                title: "Updated Fundraisier",
                type: "success",
                closable: true
            })

            setOpen(false)
        }
    });

    const UserCard = (props: IUser & { collaborator?: boolean }) => {
        const { username, userId, firstName, lastName, collaborator } = props;

        const [show, setShow] = useState(false)
        const removeHandler = (userIndex: string) => {
            let clone: any = [...data]

            let users = clone[index].collaborators

            if (users?.includes(userIndex)) {

                const indexId = users.indexOf(userIndex);
                clone[index]?.collaborators.splice(indexId, 1);


                updateDontion(clone)
            } else {
                users = [...clone[index]?.collaborators, userIndex]

                clone[index] = { ...clone[index], collaborators: users }

                updateDontion(clone)
            }


            setShow((prev) => !prev)
        }


        return (
            <Flex bgColor={mainBackgroundColor} width='100%' height={'fit-content'} flexDir={"column"} rounded={"16px"} borderColor={borderColor} borderWidth={"1px"} justifyContent={'space-between'} padding='15px'>
                <Flex as={"button"} onClick={() => removeHandler(userId)} justifyContent={'space-between'} w={"full"} alignItems={"center"}  >
                    <Flex gap={"2"} height={"full"} alignItems={"center"} >
                        <Box w={"fit-content"} >
                            <UserImage user={props} />
                        </Box>
                        {/* <Avatar src={`${CONFIG.RESOURCE_URL}${imgMain}`} size='sm' name={`${firstName} ${lastName}`} /> */}
                        <Flex alignItems={'flex-start'} gap={0}>
                            <Heading fontSize={'16px'} color={headerTextColor}>{firstName || ''} {lastName || ''}</Heading>
                            <Text fontSize={'14px'} color={bodyTextColor}>@{textLimit(username, 12) || ''}</Text>
                        </Flex>
                    </Flex>

                    <CustomCheckbox checked={show || data[index]?.collaborators?.includes(userId)} onChange={(e: any) => removeHandler(userId)} />

                    {/* <Checkbox isChecked={show || data[index]?.collaborators?.includes(userId)} rounded={"full"} onChange={(e) => removeHandler(userId)} /> */}
                </Flex>
            </Flex>
        )
    }

    return (
        <Flex>
            {data[0]?.collaborators && (
                <>
                    {update && (
                        <Flex gap={"3"} alignItems={"center"} >
                            <Button onClick={() => setOpen(true)} bgColor={"#5D70F9"} px={"2"} fontSize={"9px"} color={"white"} h={"25px"} pt={"0.9px"} rounded={"32px"}>{data[0]?.collaborators?.length > 0 ? "Edit" : "Invite"} Collaborator</Button>
                            {/* <Box onClick={() => setShow(true)} color={"gray.500"} as='button' >
                            <QuestionTwoIcon />
                        </Box> */}
                        </Flex>
                    )}
                    {btn && (
                        <Flex gap={"3"} alignItems={"center"} >
                            <Button onClick={() => setOpen(true)} bgColor={"#5D70F9"} px={"2"} fontSize={"9px"} color={"white"} h={"25px"} pt={"0.9px"} rounded={"32px"}>{data[0]?.collaborators?.length > 0 ? "Edit" : "Invite"} Collaborator</Button>
                            <Box onClick={() => setShow(true)} color={"gray.500"} as='button' >
                                <QuestionTwoIcon />
                            </Box>
                        </Flex>
                    )}
                </>
            )}
            {/* {!update && (
                <Flex flexDir={"column"} w={"fit-content"} gap={"3"} alignItems={"end"} >
                    <Flex gap={"3"} alignItems={"center"} >
                        {(data[index].collaborators) && (
                            <Flex onClick={() => setOpen(true)} as={'button'} gap={"1"} alignItems={"center"} mr={"auto"} >
                                <CollaboratorIcon />
                                {(data[index]?.collaborators?.length < 0) && (
                                    <Text color={"#1732F7"} lineHeight={"22px"} >Invite Collaborators and Teams</Text>
                                )}
                                {(payload[0]?.collaborators?.length > 0) && (
                                    <Flex alignItems={"center"} gap={"2"} >
                                        <Text color={"#1732F7"} lineHeight={"22px"} >Edit Collaborators and Teams</Text>
                                    </Flex>
                                )}
                            </Flex>

                        )}
                        <Box onClick={() => setShow(true)} color={"gray.500"} as='button' >
                            <QuestionTwoIcon />
                        </Box>
                    </Flex>
                    <Flex gap={"3"} >
                        {data[index]?.collaborators?.length > 0 && (
                            <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#DCF9CF66"} color={"#3EC30F"} >
                                {data[index]?.collaborators?.length + " Admin" + (data[index]?.collaborators.length > 1 ? "s" : "")}
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            )} */}
            <ModalLayout open={open} trigger={true} close={() => setOpen(false)} >
                <Flex w={"full"} flexDir={"column"} > 
                    <Flex w={"full"} px={"6"} pt={"8"} bg={secondaryBackgroundColor} >
                        <Box>
                            <Text color={colorMode === 'light' ? "#121212" : headerTextColor} fontSize={"24px"} lineHeight={"31.25px"} fontWeight={"bold"} >Invite Collaborators</Text>
                            <Text color={colorMode === 'light' ? "#626262" : bodyTextColor} lineHeight={"20.83px"} >Kindly select users to collaborate with on this Fundraising.</Text>
                        </Box>
                        <Box w={"fit-content"} >
                            <Box onClick={() => setOpen(false)} as='button'>
                                <CloseIcon second={true} />
                            </Box>
                        </Box>
                    </Flex>

                    <Flex px={"6"} py={"4"} flexDir={"column"} gap={"2"} bg={secondaryBackgroundColor}  >
                        {update && (
                            <Flex rounded={"lg"} w={"full"} bg={"#EFF1FE"} py={"3px"} px={"9px"} >
                                <Button onClick={() => changeTabHandler(false)} _hover={{ backgroundColor: !tab ? "white" : "transparent" }} borderBottom={!tab ? "1px solid #5465E0" : ""} width={"full"} bgColor={!tab ? "white" : "transparent"} h={"36px"} color={"#5465E0"} fontWeight={"medium"} fontSize={"sm"} >Network</Button>
                                <Button onClick={() => changeTabHandler(true)} _hover={{ backgroundColor: tab ? "white" : "transparent" }} borderBottom={tab ? "1px solid #5465E0" : ""} width={"full"} bgColor={tab ? "white" : "transparent"} h={"36px"} color={"#5465E0"} fontWeight={"medium"} fontSize={"sm"} >Collaborators</Button>
                            </Flex>
                        )}
                        <InputGroup startElement={
                            <Flex pl={"3"} >
                                <IoSearchOutline size={"20px"} />
                            </Flex>
                        }>
                            <Input value={search} onChange={(e) => setSearch(e.target.value)} type="search" h={"45px"} rounded={"full"} bgColor={mainBackgroundColor} placeholder='Search for users' />
                        </InputGroup>
                    </Flex>
                    {!tab && (
                        <LoadingAnimation loading={isLoading} >
                            <Flex flexDir={"column"} gap={"4"} maxH={"300px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                <>
                                    {results?.map((item: IUser, index: number) => {
                                        if (results.length === index + 1) {
                                            return (
                                                <Box key={index.toString()} width={"full"} ref={ref} >
                                                    <UserCard {...item} collaborator={data[index]?.collaborators?.includes(item.userId)} />
                                                </Box>
                                            )
                                        } else {
                                            return (
                                                <Box key={index.toString()} width={"full"} >
                                                    <UserCard {...item} collaborator={data[index]?.collaborators?.includes(item.userId)} />
                                                </Box>
                                            )
                                        }
                                    })}
                                    {isRefetching && (
                                        <Flex w={"full"} justifyContent={"center"} alignItems={"center"} py={"4"} >
                                            <Spinner size={"sm"} />
                                        </Flex>
                                    )}
                                </>
                            </Flex>
                        </LoadingAnimation>
                    )}
                    {tab && (
                        <Flex flexDir={"column"} gap={"4"} maxH={"300px"} pb={"4"} px={"5"} overflowY={"auto"} >
                            {singleData?.collaborators?.map((item: any, index: number) => {
                                return (
                                    <Box key={index.toString()} width={"full"} >
                                        <UserCard {...item} collaborator={data[index]?.collaborators?.includes(item.userId)} />
                                    </Box>
                                )
                            })}
                        </Flex>
                    )}
                    {!update && (
                        <Box paddingX={'6'} position={"sticky"} bottom={"0px"} shadow='lg' bg={mainBackgroundColor} py={'20px'} >
                            <CustomButton text='Done' onClick={() => setOpen(false)} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
                        </Box>
                    )}
                    {update && (
                        <Box paddingX={'6'} position={"sticky"} bottom={"0px"} shadow='lg' bg={mainBackgroundColor} py={'20px'} >
                            <CustomButton text='Update' isLoading={editDonation?.isPending} disable={editDonation?.isPending} onClick={() => editDonation?.mutate({ ...data[0] })} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
                        </Box>
                    )}
                </Flex>
            </ModalLayout>


            <ModalLayout open={show} close={() => setShow(false)} title={"Adding Collaborator"}>
                <Box px={"6"} pb={"6"} >
                    <Text color={"gray.500"} >{"Fundraising organizers can manage individual and team access to the fundraising dashboard."}</Text>
                    <Text mt={"6"} color={"gray.500"} >{"When you make someone an Admin to your fundraising, they have full access to your fundraising dashboard such as donors lists and donation records."}</Text>
                </Box>
            </ModalLayout>
        </Flex>
    )
}
