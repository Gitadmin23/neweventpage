"use client"
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Input,
    InputGroup,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { AxiosError, AxiosResponse } from 'axios'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import useCustomTheme from "@/hooks/useTheme";
import { IEventType } from '@/helpers/models/event'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useEventStore from '@/helpers/store/useCreateEventState'
import { IUser } from '@/helpers/models/user'
import { useColorMode } from '../ui/color-mode'
import { CustomButton, CustomCheckbox, LoadingAnimation, ModalLayout, UserImage } from '../shared'
import { textLimit } from '@/helpers/utils/textlimit'
import httpService from '@/helpers/services/httpService'
import { URLS } from '@/helpers/services/urls'
import { CloseIcon, QuestionTwoIcon } from '@/svg'
import { toaster } from '../ui/toaster'

type IProps = {
    btn?: boolean,
    update?: boolean,
    data?: IEventType,
    collaborate?: boolean,
    addCollaborator?: boolean
}

export default function UpdateCollaborator(props: IProps) {

    const {
        btn,
        update,
        data,
        collaborate,
        addCollaborator
    } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode } = useColorMode();

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(false)
    const [users, setUsers] = React.useState<IUser[]>([]);
    const { eventdata, updateEvent } = useEventStore((state) => state);
    const [show, setShow] = useState(false)

    const queryClient = useQueryClient()

    const [search, setSearch] = React.useState('');

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/user/search-users?searchText=${search}`, limit: 10, filter: "userId", name: "all-event", search: search })

    const CheckLimit = (lengthOfCollab: any, clone: any, name?: string) => {


        const numb = lengthOfCollab ? lengthOfCollab : 0

        if (numb + 1 === 11 && name === "add") {
            toaster.create({
                title: "Limit of Collaborators is 10",
                closable: true,
                type: "error"
            })
            return
        } else if (numb <= 10) {
            updateEvent(clone)
            return
        } else {
            toaster.create({
                title: "Limit of Collaborators is 10",
                closable: true,
                type: "error"
            })
            return
        }
    }

    const AddAdmin = (userIndex: string) => {

        let admin = !eventdata?.admins ? [] : [...eventdata?.admins]
        let collaborators = !eventdata?.collaborators ? [] : [...eventdata?.collaborators]

        let clone = { ...eventdata }
        const lengthOfCollab = Number(clone?.admins?.length ? clone?.admins?.length : 0) + Number(clone?.collaborators?.length ? clone?.collaborators?.length : 0) + Number(clone?.acceptedAdmins?.length ? clone?.acceptedAdmins?.length : 0) + Number(clone?.acceptedCollaborators?.length ? clone?.acceptedCollaborators?.length : 0)

        if (eventdata?.collaborators?.includes(userIndex)) {


            const index = collaborators.indexOf(userIndex);
            clone?.collaborators.splice(index, 1);

            if (!eventdata?.admins?.includes(userIndex)) {
                setShow((prev) => !prev)

                clone.admins = [...admin, userIndex] 
                CheckLimit(lengthOfCollab, clone)
                return
            } else {

                const index = admin.indexOf(userIndex);
                clone?.admins.splice(index, 1);
            }
            updateEvent(clone);

        } else if (eventdata?.admins?.includes(userIndex)) {


            const index = admin.indexOf(userIndex);
            clone?.admins.splice(index, 1);

            updateEvent(clone);
        } else {

            if (!clone.admins) {
                clone.admins = [userIndex]
            } else {
                clone.admins = [...admin, userIndex]
            }
            CheckLimit(lengthOfCollab, clone, "add")
        }
    }

    const AddCollaborators = (userIndex: string) => {

        let admin = !eventdata?.admins ? [] : [...eventdata?.admins]
        let collaborators = !eventdata?.collaborators ? [] : [...eventdata?.collaborators]

        let clone = { ...eventdata }
        const lengthOfCollab = Number(clone?.admins?.length ? clone?.admins?.length : 0) + Number(clone?.collaborators?.length ? clone?.collaborators?.length : 0) + Number(clone?.acceptedAdmins?.length ? clone?.acceptedAdmins?.length : 0) + Number(clone?.acceptedCollaborators?.length ? clone?.acceptedCollaborators?.length : 0)

        if (eventdata?.admins?.includes(userIndex)) {


            const index = admin.indexOf(userIndex);
            clone?.admins.splice(index, 1);

            if (!eventdata?.collaborators?.includes(userIndex)) {

                clone.collaborators = [...collaborators, userIndex] 
                CheckLimit(lengthOfCollab, clone)
            } else {


                const index = collaborators.indexOf(userIndex);
                clone?.collaborators.splice(index, 1);
                // clone?.collaborators?.filter((id) => id !== userIndex) 
            }
            updateEvent(clone);


        } else if (eventdata?.collaborators?.includes(userIndex)) {

            const index = collaborators.indexOf(userIndex);
            clone?.collaborators.splice(index, 1);

            // clone?.collaborators?.filter((id) => id !== userIndex)

            updateEvent(clone);
        } else {

            clone.collaborators = [...collaborators, userIndex]
            CheckLimit(lengthOfCollab, clone, "add")

        }


    }

    const AddActiveAdmin = (userIndex: string) => {

        let admin = !eventdata?.acceptedAdmins ? [] : [...eventdata?.acceptedAdmins]
        let collaborators = !eventdata?.acceptedCollaborators ? [] : [...eventdata?.acceptedCollaborators]

        let clone: any = { ...eventdata }
        const lengthOfCollab = Number(clone?.admins?.length ? clone?.admins?.length : 0) + Number(clone?.collaborators?.length ? clone?.collaborators?.length : 0) + Number(clone?.acceptedAdmins?.length ? clone?.acceptedAdmins?.length : 0) + Number(clone?.acceptedCollaborators?.length ? clone?.acceptedCollaborators?.length : 0)

        if (eventdata?.acceptedCollaborators?.includes(userIndex)) {


            const index = collaborators.indexOf(userIndex);
            clone?.acceptedCollaborators.splice(index, 1);

            if (!eventdata?.acceptedAdmins?.includes(userIndex)) {

                clone.acceptedAdmins = [...admin, userIndex] 
                CheckLimit(lengthOfCollab, clone)
            } else {

                const index = admin.indexOf(userIndex);
                clone?.acceptedAdmins.splice(index, 1);
                clone.acceptedCollaborators = [...collaborators, userIndex]
            }

            updateEvent(clone)


        } else if (eventdata?.acceptedAdmins?.includes(userIndex)) {


            const index = admin.indexOf(userIndex);
            clone?.acceptedAdmins.splice(index, 1);

            updateEvent(clone);
        } else {

            clone.acceptedAdmins = [...admin, userIndex]
            CheckLimit(lengthOfCollab, clone, "add")

        }
    }

    const AddActiveCollaborators = (userIndex: string) => {

        let admin = !eventdata?.acceptedAdmins ? [] : [...eventdata?.acceptedAdmins]
        let collaborators = !eventdata?.acceptedCollaborators ? [] : [...eventdata?.acceptedCollaborators]

        let clone: any = { ...eventdata }
        const lengthOfCollab = Number(clone?.admins?.length ? clone?.admins?.length : 0) + Number(clone?.collaborators?.length ? clone?.collaborators?.length : 0) + Number(clone?.acceptedAdmins?.length ? clone?.acceptedAdmins?.length : 0) + Number(clone?.acceptedCollaborators?.length ? clone?.acceptedCollaborators?.length : 0)

        if (eventdata?.acceptedAdmins?.includes(userIndex)) {

            const index = admin.indexOf(userIndex);
            clone?.acceptedAdmins.splice(index, 1);

            if (!eventdata?.acceptedCollaborators?.includes(userIndex)) {

                clone.acceptedCollaborators = [...collaborators, userIndex] 
                CheckLimit(lengthOfCollab, clone)
            } else {
                const index = collaborators.indexOf(userIndex);
                clone?.acceptedCollaborators.splice(index, 1);
                // clone?.collaborators?.filter((id) => id !== userIndex)
                clone.acceptedCollaborators = [...collaborators, userIndex]
            }
            updateEvent(clone);

        } else if (eventdata?.acceptedCollaborators?.includes(userIndex)) {

            const index = collaborators.indexOf(userIndex);
            clone?.acceptedCollaborators.splice(index, 1);
            updateEvent(clone);
        } else {

            clone.acceptedCollaborators = [...collaborators, userIndex]
            CheckLimit(lengthOfCollab, clone, "add")

        }
    }


    const UserCard = (props: { user: IUser, collaborators: boolean, admin: boolean, active?: boolean, collaborator?: boolean }) => {
        const { user, collaborators, admin, active, collaborator } = props;

        const [show, setShow] = useState(false)

        const removeHandler = (userIndex: string) => {
            let clone: any = { ...eventdata }

            let admin = !eventdata?.admins ? [] : [...eventdata?.admins]
            let collaborators = !eventdata?.collaborators ? [] : [...eventdata?.collaborators]
            let acceptedAdmins = !eventdata?.acceptedAdmins ? [] : [...eventdata?.acceptedAdmins]
            let acceptedCollaborators = !eventdata?.acceptedCollaborators ? [] : [...eventdata?.acceptedCollaborators]


            if (show || collaborators || admin) {
                if (eventdata?.admins?.includes(userIndex)) {


                    const index = admin.indexOf(userIndex);
                    clone?.admins.splice(index, 1);

                    updateEvent(clone);
                } else if (eventdata?.collaborators?.includes(userIndex)) {

                    const index = collaborators.indexOf(userIndex);
                    clone?.collaborators.splice(index, 1);

                    // clone?.collaborators?.filter((id) => id !== userIndex)

                    updateEvent(clone);
                } else if (eventdata?.acceptedAdmins?.includes(userIndex)) {

                    const index = acceptedAdmins.indexOf(userIndex);
                    clone?.acceptedAdmins.splice(index, 1);

                    // clone?.collaborators?.filter((id) => id !== userIndex)

                    updateEvent(clone);
                } else if (eventdata?.acceptedCollaborators?.includes(userIndex)) {

                    const index = acceptedCollaborators.indexOf(userIndex);
                    clone?.acceptedCollaborators.splice(index, 1);

                    // clone?.collaborators?.filter((id) => id !== userIndex)

                    updateEvent(clone);
                }
            }

            setShow((prev) => !prev)

        }


        return (
            <Flex bgColor={mainBackgroundColor} width='100%' height={'fit-content'} flexDir={"column"} rounded={"16px"} borderColor={borderColor} borderWidth={"1px"} justifyContent={'space-between'} padding='15px'>
                <Flex as={"button"} onClick={() => removeHandler(user?.userId)} justifyContent={'space-between'} w={"full"} alignItems={"center"}  >
                    <Flex gap={"2"} height={"full"} alignItems={"center"} >
                        <Box w={"fit-content"} >
                            <UserImage user={props} />
                        </Box>
                        {/* <Avatar src={`${CONFIG.RESOURCE_URL}${imgMain}`} size='sm' name={`${firstName} ${lastName}`} /> */}
                        <Flex alignItems={'flex-start'} flexDir={"column"} gap={0}>
                            <Heading fontSize={'16px'} color={headerTextColor}>{user?.firstName || ''} {user?.lastName || ''}</Heading>
                            <Text fontSize={'14px'} color={bodyTextColor}>@{textLimit(user?.username, 12) || ''}</Text>
                            {collaborator && (
                                <Text fontSize={'14px'} color={headerTextColor}>Status: <span style={{ color: active ? "#3EC30F" : "#FDB806" }} >{!active ? "Pending" : "Active"}</span></Text>
                            )}
                        </Flex>
                    </Flex>
                    <CustomCheckbox checked={show || admin || collaborators} onChange={(e: any) => removeHandler(user?.userId)} />
                    {/* <Checkbox isChecked={show || admin || collaborators} rounded={"full"} onChange={(e) => removeHandler(userId)} /> */}
                </Flex>
                {((show || admin || collaborators) && !collaborator) && (
                    <Flex gap={"6"} pt={"4"} justifyContent={"center"} alignItems={"center"} >

                        <Flex as='button' onClick={() => AddAdmin(user?.userId)} alignItems={"center"} gap={"2"} >
                            <Text>Admin</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={admin ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {admin && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                        <Flex as='button' onClick={() => AddCollaborators(user?.userId)} alignItems={"center"} gap={"2"} >
                            <Text>Volunteer</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={collaborators ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {collaborators && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                )}
                {((show || admin || collaborators) && (collaborator && !active)) && (
                    <Flex gap={"6"} pt={"4"} justifyContent={"center"} alignItems={"center"} >

                        <Flex as='button' onClick={() => AddAdmin(user?.userId)} alignItems={"center"} gap={"2"} >
                            <Text>Admin</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={admin ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {admin && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                        <Flex as='button' onClick={() => AddCollaborators(user?.userId)} alignItems={"center"} gap={"2"} >
                            <Text>Volunteer</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={collaborators ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {collaborators && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                )}
                {((show || collaborators || admin) && (collaborator && active)) && (
                    <Flex gap={"6"} pt={"4"} justifyContent={"center"} alignItems={"center"} >

                        <Flex as='button' onClick={() => AddActiveAdmin(user?.userId)} alignItems={"center"} gap={"2"} >
                            <Text>Admin</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={admin ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {admin && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                        <Flex as='button' onClick={() => AddActiveCollaborators(user?.userId)} alignItems={"center"} gap={"2"} >
                            <Text>Volunteer</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={collaborators ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {collaborators && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        )
    }

    const clickHandler = () => {

        setTab(false)
        setOpen(true)
        setSearch("")

        if (data?.eventName) {

            const clone: any = {
                id: data?.id,
                picUrls: data?.picUrls,
                eventType: data?.eventType,
                eventName: data?.eventName,
                eventDescription: data?.eventDescription,
                joinSetting: data?.joinSetting,
                locationType: data?.locationType,
                currency: data?.currency,
                currentPicUrl: data?.currentPicUrl,
                eventFunnelGroupID: data?.eventFunnelGroupID,
                mediaType: data?.mediaType,
                currentVideoUrl: data?.currentVideoUrl,
                isPublic: data?.isPublic,
                isExclusive: data?.isExclusive,
                mask: data?.mask,
                attendeesVisibility: data?.attendeesVisibility,
                minPrice: data?.minPrice,
                maxPrice: data?.maxPrice,
                startTime: data?.startTime,
                endTime: data?.endTime,
                startDate: data?.startDate,
                endDate: data?.endDate,
                // expirationDate: "",
                location: data?.location,
                productTypeData: data?.productTypeData,
                collaborators: data?.collaborators,
                acceptedAdmins: data?.acceptedAdmins,
                acceptedCollaborators: data?.acceptedCollaborators,
                admins: data?.admins
            }


            const admin: any = []
            const collaborator: any = []
            const acceptedAdmins: any = []
            const acceptedCollaborators: any = []

            clone?.admins?.map((item: IUser) => {
                return admin.push(item?.userId)
            })
            clone?.collaborators?.map((item: IUser) => {
                return collaborator.push(item?.userId)
            })

            clone?.acceptedAdmins?.map((item: IUser) => {
                return acceptedAdmins.push(item?.userId)
            })
            clone?.acceptedCollaborators?.map((item: IUser) => {
                return acceptedCollaborators.push(item?.userId)
            })

            clone.admins = admin
            clone.collaborators = collaborator
            clone.acceptedAdmins = acceptedAdmins
            clone.acceptedCollaborators = acceptedCollaborators

            updateEvent(clone)
        }

    }

    // const toast = useToast()

    // Edit Event
    const updateUserEvent = useMutation({
        mutationFn: (newdata: any) => httpService.put(URLS.UPDATE_EVENT, newdata),
        onError: (error: AxiosError<any, any>) => {
            toaster.create({
                title: error?.response?.data?.message,
                closable: true,
                type: "error"
            })
        },
        onSuccess: (message: AxiosResponse<any>) => {
            // queryClient.invalidateQueries(query:['all-events-details'])

            toaster.create({
                title: "Event Role Updated",
                closable: true,
                type: "success"
            })
            setOpen(false)
        }
    });


    const updateEventCollaboration = React.useCallback((item: any) => {
        updateUserEvent.mutate(item)
    }, [])

    useEffect(() => {
        if (!isLoading) {

            let userData: Array<IUser> = []

            let admin: any = results[0]?.admins
            let collaborator: any = results[0]?.collaborators


            if (admin?.length > 0 && collaborator?.length > 0) {
                userData = users.filter((obj1: IUser) =>
                    results[0]?.admins.every((obj2: IUser) => obj1?.userId !== obj2?.userId) &&
                    results[0]?.collaborators.every((obj2: IUser) => obj1?.userId !== obj2?.userId)
                );

            } else if (admin?.length > 0 && collaborator?.length <= 0) {
                userData = users.filter((obj1: IUser) =>
                    results[0]?.admins.every((obj2: IUser) => obj1?.userId !== obj2?.userId && obj1?.firstName !== obj2?.firstName)
                );
            } else {
                userData = users.filter((obj1: IUser) =>
                    results[0]?.collaborators.every((obj2: IUser) => obj1?.userId !== obj2?.userId)
                );
            }

            // setUserFilter(userData)

        }
    }, [results, open])

    const changeTabHandler = (item: boolean) => {
        setTab(item)
        setSearch("")
    }

    return (
        <>
            {update && (
                // <Flex w={"fit-content"} bgColor={mainBackgroundColor} rounded={"16px"} p={"3"} gap={"4"} alignItems={"center"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                <CustomButton onClick={() => clickHandler()} text={collaborate ? "Edit Collaborator" : "Invite Collaborator"} height={"40px"} borderRadius={"25px"} fontSize={"12px"} width={"full"} borderWidth={"1px"} borderColor={primaryColor} color={primaryColor} backgroundColor={mainBackgroundColor} />
                // </Flex>
            )}
            {!update && (
                <Flex flexDir={"column"} w={"fit-content"} gap={"3"} alignItems={"end"} >
                    <Flex gap={"3"} alignItems={"center"} >
                        <Button onClick={() => clickHandler()} bgColor={"#5D70F9"} px={"2"} fontSize={"9px"} color={"white"} h={"25px"} pt={"0.9px"} rounded={"32px"}>{collaborate ? "Edit" : "Invite"} Collaborator</Button>

                        <Box onClick={() => setShow(true)} color={"gray.500"} as='button' >
                            <QuestionTwoIcon />
                        </Box>
                    </Flex>
                    <Flex gap={"3"} >

                        {eventdata?.admins?.length > 0 && (
                            <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#DCF9CF66"} color={"#3EC30F"} >
                                {eventdata?.admins?.length + " Admin" + (eventdata?.admins?.length > 1 ? "s" : "")}
                            </Flex>
                        )}
                        {eventdata?.collaborators?.length > 0 && (
                            <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#FDF3CF6B"} color={"#FDB806"} >
                                {eventdata?.collaborators?.length + " Volunteer" + (eventdata?.collaborators?.length > 1 ? "s" : "")}
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            )}
            <ModalLayout trigger={true} open={open} close={() => setOpen(false)} >
                <Flex w={"full"} flexDir={"column"} >
                    <Flex w={"full"} px={"6"} pt={"8"} bg={secondaryBackgroundColor} >
                        <Box>
                            <Text color={colorMode === 'light' ? "#121212" : headerTextColor} fontSize={"24px"} lineHeight={"31.25px"} fontWeight={"bold"} >Invite Collaborators</Text>
                            <Text color={colorMode === 'light' ? "#626262" : bodyTextColor} lineHeight={"20.83px"} >Kindly select users to collaborate with on this event and assign roles.</Text>
                        </Box>
                        <Box w={"fit-content"} >
                            <Box onClick={() => setOpen(false)} as='button'>
                                <CloseIcon second={true} />
                            </Box>
                        </Box>
                    </Flex>

                    <Flex px={"6"} py={"4"} flexDir={"column"} gap={"2"} bg={secondaryBackgroundColor}  >
                        {update && (
                            <Flex rounded={"lg"} w={"full"} justifyContent={"center"} bg={"#EFF1FE"} py={"3px"} px={"9px"} >
                                <Button onClick={() => changeTabHandler(false)} _hover={{ backgroundColor: !tab ? "white" : "transparent" }} borderBottom={!tab ? "1px solid #5465E0" : ""} width={"45%"} bgColor={!tab ? "white" : "transparent"} h={"36px"} color={"#5465E0"} fontWeight={"medium"} fontSize={"sm"} >Network</Button>
                                <Button onClick={() => changeTabHandler(true)} _hover={{ backgroundColor: tab ? "white" : "transparent" }} borderBottom={tab ? "1px solid #5465E0" : ""} width={"45%"} bgColor={tab ? "white" : "transparent"} h={"36px"} color={"#5465E0"} fontWeight={"medium"} fontSize={"sm"} >Collaborators</Button>
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
                    {addCollaborator && (
                        <LoadingAnimation loading={isLoading} >
                            <Flex flexDir={"column"} gap={"4"} maxH={btn ? "200px" : "300px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                <>
                                    {results?.map((item: IUser, index: number) => {
                                        if (results.length === index + 1) {
                                            return (
                                                <Box key={index.toString()} width={"full"} ref={ref} >
                                                    <UserCard user={item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} />
                                                </Box>
                                            )
                                        } else {
                                            return (
                                                <Box key={index.toString()} width={"full"} >
                                                    <UserCard user={item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} />
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

                    {!addCollaborator && (
                        <>
                            {!tab && (
                                <LoadingAnimation loading={isLoading} >
                                    <Flex flexDir={"column"} gap={"4"} maxH={btn ? "200px" : "300px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                        <>
                                            {results?.map((item: IUser, index: number) => {
                                                if (results.length === index + 1) {
                                                    return (
                                                        <Box key={index.toString()} width={"full"} ref={ref} >
                                                            <UserCard user={item} collaborators={eventdata?.collaborators?.includes(item.userId) || eventdata?.acceptedCollaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId) || eventdata?.acceptedAdmins?.includes(item.userId)} />
                                                        </Box>
                                                    )
                                                } else {
                                                    return (
                                                        <Box key={index.toString()} width={"full"} >
                                                            <UserCard user={item} collaborators={eventdata?.collaborators?.includes(item.userId) || eventdata?.acceptedCollaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId) || eventdata?.acceptedAdmins?.includes(item.userId)} />
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
                                <>
                                    {(data?.admins && data?.collaborators && data?.acceptedAdmins && data?.acceptedCollaborators) && (
                                        <>
                                            {(data?.admins?.length > 0 || data.collaborators.length > 0 || data.acceptedAdmins.length > 0 || data.acceptedCollaborators.length > 0) ? (
                                                <>
                                                    {search ? (
                                                        <Flex flexDir={"column"} gap={"4"} maxH={"250px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                                            {data?.admins?.filter((item: IUser) => item.firstName?.toLowerCase().includes(search?.toLowerCase()) || item.lastName?.toLowerCase().includes(search?.toLowerCase()) || item.email?.toLowerCase().includes(search?.toLowerCase()) || item.username?.toLowerCase().includes(search?.toLowerCase()))?.map((item, index) => (
                                                                <UserCard user={item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                                            ))}
                                                            {data?.collaborators?.filter((item: IUser) => item.firstName?.toLowerCase().includes(search?.toLowerCase()) || item.lastName?.toLowerCase().includes(search?.toLowerCase()) || item.email?.toLowerCase().includes(search?.toLowerCase()) || item.username?.toLowerCase().includes(search?.toLowerCase()))?.map((item, index) => (
                                                                <UserCard user={item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                                            ))}
                                                        </Flex>
                                                    ) : (
                                                        <Flex flexDir={"column"} gap={"4"} maxH={"250px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                                            {data?.admins?.map((item, index) => (
                                                                <UserCard collaborator={true} user={item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                                            ))}
                                                            {data?.collaborators?.map((item, index) => (
                                                                <UserCard collaborator={true} user={item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                                            ))}
                                                            {data?.acceptedAdmins?.map((item, index) => (
                                                                <UserCard collaborator={true} active={true} user={item} collaborators={eventdata?.acceptedCollaborators?.includes(item.userId)} admin={eventdata?.acceptedAdmins?.includes(item.userId)} key={index.toString()} />
                                                            ))}
                                                            {data?.acceptedCollaborators?.map((item, index) => (
                                                                <UserCard collaborator={true} active={true} user={item} collaborators={eventdata?.acceptedCollaborators?.includes(item.userId)} admin={eventdata?.acceptedAdmins?.includes(item.userId)} key={index.toString()} />
                                                            ))}
                                                        </Flex>
                                                    )}
                                                </>
                                            ) : (
                                                <Flex flexDir={"column"} gap={"4"} maxH={"250px"} h={"full"} justifyContent={"center"} alignItems={"center"} pb={"4"} px={"5"} overflowY={"auto"} >
                                                    <Text lineHeight={"20.83px"} >You don’t have any collaborators for this event, please go to your <span style={{ fontWeight: "bold" }} >network tab</span> to select collaborators </Text>
                                                </Flex>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {update && (
                        <Box paddingX={'6'} position={"sticky"} bottom={"0px"} shadow='lg' bg={mainBackgroundColor} py={'20px'} >
                            <CustomButton text={tab ? 'Update Role' : 'Assign Role'} disable={(eventdata?.admins?.length === data?.admins?.length) && (eventdata?.collaborators?.length === data?.collaborators?.length) && (eventdata?.acceptedAdmins?.length === data?.acceptedAdmins?.length) && (eventdata?.acceptedCollaborators?.length === data?.acceptedCollaborators?.length)} isLoading={updateUserEvent?.isPending} onClick={() => updateEventCollaboration({ admins: eventdata?.admins, collaborators: eventdata?.collaborators, id: eventdata?.id, acceptedAdmins: eventdata?.acceptedAdmins, acceptedCollaborators: eventdata?.acceptedCollaborators })} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
                        </Box>
                    )}

                    {!update && (
                        <Box paddingX={'6'} position={"sticky"} bottom={"0px"} shadow='lg' bg={mainBackgroundColor} py={'20px'} >
                            <CustomButton text='Send invite' onClick={() => setOpen(false)} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
                        </Box>
                    )}
                </Flex>
            </ModalLayout>


            <ModalLayout open={show} close={() => setShow(false)} title={"Adding Collaborator"}>
                <Box px={"6"} pb={"6"} >
                    <Text color={"gray.500"} >{"Event owners can manage individual and team access to the event dashboard. When you make someone an Admin to your event, they have full access to your event dashboard such as attendees lists, ticket sales, transactions and also the event scanner to assist with scanning the tickets at the event. "}</Text>
                    <Text mt={"6"} color={"gray.500"} >{"When you make them volunteers, they can only have access to the event scanner in order to assist with validating and checking in attendee’s tickets using their mobile phone camera."}</Text>
                </Box>
            </ModalLayout>
        </>
    )
}
