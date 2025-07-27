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
import { useRouter } from 'next/navigation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import useCustomTheme from "@/hooks/useTheme";
import { IEventType } from '@/helpers/models/event'
import { IUser } from '@/helpers/models/user'
import { useColorMode } from '../ui/color-mode'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserImage from './userImage'
import { textLimit } from '@/helpers/utils/textlimit'
import CustomCheckbox from './customCheckbox'
import httpService from '@/helpers/services/httpService'
import { URLS } from '@/helpers/services/urls'
import CustomButton from './customButton'
import { QuestionTwoIcon } from '@/svg'
import ModalLayout from './modalLayout'
import LoadingAnimation from './loadingAnimation'
import useEventStore from '@/helpers/store/useCreateEventState'
import { toaster } from '../ui/toaster'

type IProps = {
    btn?: boolean,
    update?: boolean,
    data?: IEventType,
    collaborate?: boolean,
    addCollaborator?: boolean,
    value: {
        admins: Array<any>,
        collaborators: Array<any>
    } | any,
    setValue: (name: string, value: any) => void,
}

export default function CollaboratorBtn(props: IProps) {

    const {
        btn,
        update,
        data,
        collaborate,
        addCollaborator,
        value,
        setValue
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
    const [usersFilter, setUserFilter] = React.useState<IUser[]>([]);
    // const { value, updateEvent } = useEventStore((state) => state);
    const [show, setShow] = useState(false)

    const queryClient = useQueryClient()

    // const toast = useToast()

    const [search, setSearch] = React.useState('');


    const { results, isLoading, ref } = InfiniteScrollerComponent({ url: `/user/search-users?searchText=${search}`, limit: 10, filter: "userId", name: "all-event", search: search })

    const CheckLimit = (lengthOfCollab: any, clone: any, name?: string) => {


        const numb = lengthOfCollab ? lengthOfCollab : 0
        console.log(lengthOfCollab);
        console.log(numb);


        if (numb + 1 === 11 && name === "add") {
            toaster.create({
                title: "Limit of Collaborators is 10",
                type: "error",
                closable: true
            })
            return
        } else if (numb <= 10) {
            // updateEvent(clone)
            setValue("collaborators", clone.collaborators)
            setValue("admins", clone.admins)
            return
        } else {
            toaster.create({
                title: "Limit of Collaborators is 10",
                type: "error",
                closable: true
            })
            return
        }
    }

    const AddAdmin = (userIndex: string) => {

        let admin = !value?.admins ? [] : [...value?.admins]
        let collaborators = !value?.collaborators ? [] : [...value?.collaborators]

        let clone = { ...value }
        const lengthOfCollab = Number(clone?.admins?.length ? clone?.admins?.length : 0) + Number(clone?.collaborators?.length ? clone?.collaborators?.length : 0) + Number(clone?.acceptedAdmins?.length ? clone?.acceptedAdmins?.length : 0) + Number(clone?.acceptedCollaborators?.length ? clone?.acceptedCollaborators?.length : 0)

        if (value?.collaborators?.includes(userIndex)) {


            const index = collaborators.indexOf(userIndex);
            clone?.collaborators.splice(index, 1);

            if (!value?.admins?.includes(userIndex)) {
                setShow((prev) => !prev)

                clone.admins = [...admin, userIndex]
                console.log("test");

                CheckLimit(lengthOfCollab, clone)
                return
            } else {

                const index = admin.indexOf(userIndex);
                clone?.admins.splice(index, 1);
            }
            // updateEvent(clone)
            setValue("collaborators", clone.collaborators)
            setValue("admins", clone.admins);

        } else if (value?.admins?.includes(userIndex)) {


            const index = admin.indexOf(userIndex);
            clone?.admins.splice(index, 1);

            // updateEvent(clone)
            setValue("collaborators", clone.collaborators)
            setValue("admins", clone.admins);
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

        let admin = !value?.admins ? [] : [...value?.admins]
        let collaborators = !value?.collaborators ? [] : [...value?.collaborators]

        let clone = { ...value }
        const lengthOfCollab = Number(clone?.admins?.length ? clone?.admins?.length : 0) + Number(clone?.collaborators?.length ? clone?.collaborators?.length : 0) + Number(clone?.acceptedAdmins?.length ? clone?.acceptedAdmins?.length : 0) + Number(clone?.acceptedCollaborators?.length ? clone?.acceptedCollaborators?.length : 0)

        if (value?.admins?.includes(userIndex)) {


            const index = admin.indexOf(userIndex);
            clone?.admins.splice(index, 1);

            if (!value?.collaborators?.includes(userIndex)) {

                clone.collaborators = [...collaborators, userIndex]
                console.log("test");

                CheckLimit(lengthOfCollab, clone)
            } else {


                const index = collaborators.indexOf(userIndex);
                clone?.collaborators.splice(index, 1);
                // clone?.collaborators?.filter((id) => id !== userIndex) 
            }
            // updateEvent(clone)
            setValue("collaborators", clone.collaborators)
            setValue("admins", clone.admins);


        } else if (value?.collaborators?.includes(userIndex)) {

            const index = collaborators.indexOf(userIndex);
            clone?.collaborators.splice(index, 1);

            // clone?.collaborators?.filter((id) => id !== userIndex)

            // updateEvent(clone)
            setValue("collaborators", clone.collaborators)
            setValue("admins", clone.admins);
        } else {

            clone.collaborators = [...collaborators, userIndex]
            CheckLimit(lengthOfCollab, clone, "add")

        }


    }

    const AddActiveAdmin = (userIndex: string) => {

        let admin = !value?.acceptedAdmins ? [] : [...value?.acceptedAdmins]
        let collaborators = !value?.acceptedCollaborators ? [] : [...value?.acceptedCollaborators]

        let clone: any = { ...value }
        const lengthOfCollab = Number(clone?.admins?.length ? clone?.admins?.length : 0) + Number(clone?.collaborators?.length ? clone?.collaborators?.length : 0) + Number(clone?.acceptedAdmins?.length ? clone?.acceptedAdmins?.length : 0) + Number(clone?.acceptedCollaborators?.length ? clone?.acceptedCollaborators?.length : 0)

        if (value?.acceptedCollaborators?.includes(userIndex)) {


            const index = collaborators.indexOf(userIndex);
            clone?.acceptedCollaborators.splice(index, 1);

            if (!value?.acceptedAdmins?.includes(userIndex)) {

                clone.acceptedAdmins = [...admin, userIndex]
                console.log("test");

                CheckLimit(lengthOfCollab, clone)
            } else {

                const index = admin.indexOf(userIndex);
                clone?.acceptedAdmins.splice(index, 1);
                clone.acceptedCollaborators = [...collaborators, userIndex]
            }

            // updateEvent(clone)
            setValue("collaborators", clone.collaborators)
            setValue("admins", clone.admins)


        } else if (value?.acceptedAdmins?.includes(userIndex)) {


            const index = admin.indexOf(userIndex);
            clone?.acceptedAdmins.splice(index, 1);

            // updateEvent(clone)
            setValue("collaborators", clone.collaborators)
            setValue("admins", clone.admins);
        } else {

            clone.acceptedAdmins = [...admin, userIndex]
            CheckLimit(lengthOfCollab, clone, "add")

        }
    }

    const AddActiveCollaborators = (userIndex: string) => {

        let admin = !value?.acceptedAdmins ? [] : [...value?.acceptedAdmins]
        let collaborators = !value?.acceptedCollaborators ? [] : [...value?.acceptedCollaborators]

        let clone: any = { ...value }
        const lengthOfCollab = Number(clone?.admins?.length ? clone?.admins?.length : 0) + Number(clone?.collaborators?.length ? clone?.collaborators?.length : 0) + Number(clone?.acceptedAdmins?.length ? clone?.acceptedAdmins?.length : 0) + Number(clone?.acceptedCollaborators?.length ? clone?.acceptedCollaborators?.length : 0)

        if (value?.acceptedAdmins?.includes(userIndex)) {

            const index = admin.indexOf(userIndex);
            clone?.acceptedAdmins.splice(index, 1);

            if (!value?.acceptedCollaborators?.includes(userIndex)) {

                clone.acceptedCollaborators = [...collaborators, userIndex]
                console.log("test");

                CheckLimit(lengthOfCollab, clone)
            } else {
                const index = collaborators.indexOf(userIndex);
                clone?.acceptedCollaborators.splice(index, 1);
                // clone?.collaborators?.filter((id) => id !== userIndex)
                clone.acceptedCollaborators = [...collaborators, userIndex]
            }
            // updateEvent(clone)
            setValue("collaborators", clone.collaborators)
            setValue("admins", clone.admins);

        } else if (value?.acceptedCollaborators?.includes(userIndex)) {

            const index = collaborators.indexOf(userIndex);
            clone?.acceptedCollaborators.splice(index, 1);
            // updateEvent(clone)
            setValue("collaborators", clone.collaborators)
            setValue("admins", clone.admins);
        } else {

            clone.acceptedCollaborators = [...collaborators, userIndex]
            CheckLimit(lengthOfCollab, clone, "add")

        }
    }


    const UserCard = (props: { user: IUser, collaborators: boolean, admin: boolean, active?: boolean, collaborator?: boolean }) => {
        const { user, collaborators, admin, active, collaborator } = props;

        const [show, setShow] = useState(false)

        const removeHandler = (userIndex: string) => {
            let clone: any = { ...value }

            let admin = !value?.admins ? [] : [...value?.admins]
            let collaborators = !value?.collaborators ? [] : [...value?.collaborators]
            let acceptedAdmins = !value?.acceptedAdmins ? [] : [...value?.acceptedAdmins]
            let acceptedCollaborators = !value?.acceptedCollaborators ? [] : [...value?.acceptedCollaborators]


            if (show || collaborators || admin) {
                if (value?.admins?.includes(userIndex)) {


                    const index = admin.indexOf(userIndex);
                    clone?.admins.splice(index, 1);

                    // updateEvent(clone)
                    setValue("collaborators", clone.collaborators)
                    setValue("admins", clone.admins);
                } else if (value?.collaborators?.includes(userIndex)) {

                    const index = collaborators.indexOf(userIndex);
                    clone?.collaborators.splice(index, 1);

                    // clone?.collaborators?.filter((id) => id !== userIndex)

                    // updateEvent(clone)
                    setValue("collaborators", clone.collaborators)
                    setValue("admins", clone.admins);
                } else if (value?.acceptedAdmins?.includes(userIndex)) {

                    const index = acceptedAdmins.indexOf(userIndex);
                    clone?.acceptedAdmins.splice(index, 1);

                    // clone?.collaborators?.filter((id) => id !== userIndex)

                    // updateEvent(clone)
                    setValue("collaborators", clone.collaborators)
                    setValue("admins", clone.admins);
                } else if (value?.acceptedCollaborators?.includes(userIndex)) {

                    const index = acceptedCollaborators.indexOf(userIndex);
                    clone?.acceptedCollaborators.splice(index, 1);

                    // clone?.collaborators?.filter((id) => id !== userIndex)

                    // updateEvent(clone)
                    setValue("collaborators", clone.collaborators)
                    setValue("admins", clone.admins);
                }
            }

            setShow((prev) => !prev)

        }


        return (
            <Flex bgColor={mainBackgroundColor} width='100%' height={'fit-content'} flexDir={"column"} rounded={"16px"} borderColor={borderColor} borderWidth={"1px"} justifyContent={'space-between'} padding='15px'>
                <Flex as={"button"} onClick={() => removeHandler(user?.userId)} justifyContent={'space-between'} w={"full"} alignItems={"center"}  >
                    <Flex gap={"2"} height={"full"} alignItems={"center"} >
                        <Box w={"fit-content"} >
                            <UserImage size="lg" user={props} />
                        </Box>
                        {/* <Avatar src={`${CONFIG.RESOURCE_URL}${imgMain}`} size='sm' name={`${firstName} ${lastName}`} /> */}
                        <Flex alignItems={'flex-start'} flexDir={"column"} >
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

            // updateEvent(clone)
            setValue("collaborators", clone.collaborators)
            setValue("admins", clone.admins)
        }

    }

    // const toast = useToast()

    // Edit Event
    const updateUserEvent = useMutation({
        mutationFn: (newdata: any) => httpService.put(URLS.UPDATE_EVENT, newdata),
        onError: (error: AxiosError<any, any>) => {

            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: (message: AxiosResponse<any>) => {
            queryClient.invalidateQueries({ queryKey: ['all-events-details'] })

            toaster.create({
                title: "Event Role Updated",
                type: "success",
                closable: true
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

            setUserFilter(userData)

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
                <CustomButton onClick={() => clickHandler()} text={collaborate ? "Edit Collaborator" : "Invite Collaborator"} height={"40px"} borderRadius={"25px"} fontSize={"12px"} width={"150px"} borderWidth={"1px"} borderColor={primaryColor} color={primaryColor} backgroundColor={mainBackgroundColor} />
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

                        {value?.admins?.length > 0 && (
                            <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#DCF9CF66"} color={"#3EC30F"} >
                                {value?.admins?.length + " Admin" + (value?.admins?.length > 1 ? "s" : "")}
                            </Flex>
                        )}
                        {value?.collaborators?.length > 0 && (
                            <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#FDF3CF6B"} color={"#FDB806"} >
                                {value?.collaborators?.length + " Volunteer" + (value?.collaborators?.length > 1 ? "s" : "")}
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            )}
            <ModalLayout open={open} close={() => setOpen(false)} closeBtn={true} trigger={true}  >
                <Flex flexDir={"column"} w={"full"} >
                    <Flex w={"full"} px={"6"} pt={"5"} bg={mainBackgroundColor} >
                        <Box>
                            <Text color={colorMode === 'light' ? "#121212" : headerTextColor} fontSize={"24px"} lineHeight={"31.25px"} fontWeight={"bold"} >Invite Collaborators</Text>
                            <Text color={colorMode === 'light' ? "#626262" : bodyTextColor} lineHeight={"20.83px"} >Kindly select users to collaborate with on this event and assign roles.</Text>
                        </Box>
                    </Flex>

                    <Flex px={"6"} py={"4"} flexDir={"column"} gap={"2"} bg={mainBackgroundColor}  >
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
                    {addCollaborator && (
                        <LoadingAnimation loading={isLoading} length={results.length} >
                            <Flex flexDir={"column"} gap={"4"} maxH={btn ? "50vh" : "50vh"} pb={"4"} px={"5"} overflowY={"auto"} >
                                <>
                                    {results?.map((item: IUser, index: number) => {
                                        if (results.length === index + 1) {
                                            return (
                                                <Box key={index.toString()} width={"full"} ref={ref} >
                                                    <UserCard user={item} collaborators={value?.collaborators?.includes(item.userId)} admin={value?.admins?.includes(item.userId)} />
                                                </Box>
                                            )
                                        } else {
                                            return (
                                                <Box key={index.toString()} width={"full"} >
                                                    <UserCard user={item} collaborators={value?.collaborators?.includes(item.userId)} admin={value?.admins?.includes(item.userId)} />
                                                </Box>
                                            )
                                        }
                                    })}
                                </>
                            </Flex>
                        </LoadingAnimation>
                    )}

                    {!addCollaborator && (
                        <>
                            {!tab && (
                                <LoadingAnimation loading={isLoading} length={results.length} >
                                    <Flex flexDir={"column"} gap={"4"} maxH={btn ? "200px" : "300px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                        <>
                                            {results?.map((item: IUser, index: number) => {
                                                if (results.length === index + 1) {
                                                    return (
                                                        <Box key={index.toString()} width={"full"} ref={ref} >
                                                            <UserCard user={item} collaborators={value?.collaborators?.includes(item.userId) || value?.acceptedCollaborators?.includes(item.userId)} admin={value?.admins?.includes(item.userId) || value?.acceptedAdmins?.includes(item.userId)} />
                                                        </Box>
                                                    )
                                                } else {
                                                    return (
                                                        <Box key={index.toString()} width={"full"} >
                                                            <UserCard user={item} collaborators={value?.collaborators?.includes(item.userId) || value?.acceptedCollaborators?.includes(item.userId)} admin={value?.admins?.includes(item.userId) || value?.acceptedAdmins?.includes(item.userId)} />
                                                        </Box>
                                                    )
                                                }
                                            })}
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
                                                                <UserCard user={item} collaborators={value?.collaborators?.includes(item.userId)} admin={value?.admins?.includes(item.userId)} key={index.toString()} />
                                                            ))}
                                                            {data?.collaborators?.filter((item: IUser) => item.firstName?.toLowerCase().includes(search?.toLowerCase()) || item.lastName?.toLowerCase().includes(search?.toLowerCase()) || item.email?.toLowerCase().includes(search?.toLowerCase()) || item.username?.toLowerCase().includes(search?.toLowerCase()))?.map((item, index) => (
                                                                <UserCard user={item} collaborators={value?.collaborators?.includes(item.userId)} admin={value?.admins?.includes(item.userId)} key={index.toString()} />
                                                            ))}
                                                        </Flex>
                                                    ) : (
                                                        <Flex flexDir={"column"} gap={"4"} maxH={"250px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                                            {data?.admins?.map((item, index) => (
                                                                <UserCard collaborator={true} user={item} collaborators={value?.collaborators?.includes(item.userId)} admin={value?.admins?.includes(item.userId)} key={index.toString()} />
                                                            ))}
                                                            {data?.collaborators?.map((item, index) => (
                                                                <UserCard collaborator={true} user={item} collaborators={value?.collaborators?.includes(item.userId)} admin={value?.admins?.includes(item.userId)} key={index.toString()} />
                                                            ))}
                                                            {data?.acceptedAdmins?.map((item, index) => (
                                                                <UserCard collaborator={true} active={true} user={item} collaborators={value?.acceptedCollaborators?.includes(item.userId)} admin={value?.acceptedAdmins?.includes(item.userId)} key={index.toString()} />
                                                            ))}
                                                            {data?.acceptedCollaborators?.map((item, index) => (
                                                                <UserCard collaborator={true} active={true} user={item} collaborators={value?.acceptedCollaborators?.includes(item.userId)} admin={value?.acceptedAdmins?.includes(item.userId)} key={index.toString()} />
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
                            <CustomButton text={tab ? 'Update Role' : 'Assign Role'} disable={(value?.admins?.length === data?.admins?.length) && (value?.collaborators?.length === data?.collaborators?.length) && (value?.acceptedAdmins?.length === data?.acceptedAdmins?.length) && (value?.acceptedCollaborators?.length === data?.acceptedCollaborators?.length)} isLoading={updateUserEvent?.isPending} onClick={() => updateEventCollaboration({ admins: value?.admins, collaborators: value?.collaborators, id: value?.id, acceptedAdmins: value?.acceptedAdmins, acceptedCollaborators: value?.acceptedCollaborators })} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
                        </Box>
                    )}

                    {!update && (
                        <Box paddingX={'6'} roundedBottom={"12px"} position={"sticky"} bottom={"0px"} shadow='lg' bg={mainBackgroundColor} py={'20px'} >
                            <CustomButton borderRadius={"999px"} text='Send invite' onClick={() => setOpen(false)} width='100%' height='50px' />
                        </Box>
                    )}
                </Flex>
            </ModalLayout>


            <ModalLayout open={show} close={() => setShow(false)} trigger={true} title={"Adding Collaborator"}>
                <Box px={"6"} pb={"6"} >
                    <Text color={"gray.500"} >{"Event owners can manage individual and team access to the event dashboard. When you make someone an Admin to your event, they have full access to your event dashboard such as attendees lists, ticket sales, transactions and also the event scanner to assist with scanning the tickets at the event. "}</Text>
                    <Text mt={"6"} color={"gray.500"} >{"When you make them volunteers, they can only have access to the event scanner in order to assist with validating and checking in attendee’s tickets using their mobile phone camera."}</Text>
                </Box>
            </ModalLayout>
        </>
    )
}

