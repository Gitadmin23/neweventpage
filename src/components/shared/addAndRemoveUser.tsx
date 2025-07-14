
import { Button, Flex } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useState } from 'react'
import useCustomTheme from "@/hooks/useTheme";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import httpService from '@/helpers/services/httpService';
import { URLS } from '@/helpers/services/urls';
import { AddProfileIcon } from '@/svg';
import { toaster } from '../ui/toaster';

interface Props {
    name: string,
    user_index: any,
    index?: any
    setJoinStatus: any,
    width?: string,
    search?: boolean,
    icon?: boolean,
    profile?: boolean,
    request?: boolean,
    connects?: boolean
}

function AddOrRemoveUserBtn(props: Props) {
    const {
        name,
        user_index,
        index,
        setJoinStatus,
        width,
        search,
        icon,
        profile,
        request,
        connects
    } = props

    const [loading, setLoading] = useState("0")
    const [loadingRejected, setLoadingRejected] = useState("0")
    const queryClient = useQueryClient();

    const { primaryColor, mainBackgroundColor } = useCustomTheme();

    const unfriend = useMutation({
        mutationFn: () => httpService.delete(URLS.REMOVE_FRIEND + user_index, {}),
        onError: (error: AxiosError<any, any>) => {

            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: AxiosResponse<any>) => {

            toaster.create({
                title: data.data?.message,
                type: "success",
                closable: true
            })
            setLoading("0")
            setJoinStatus("pending")
            queryClient.invalidateQueries({ queryKey: [URLS.GET_USER_CONNECTION_LIST + user_index] })
            queryClient.invalidateQueries({ queryKey: ['/user/friend-requests'] })
            queryClient.invalidateQueries({ queryKey: ['get-joined-network'] })
        }
    });


    const rejectuser = useMutation({
        mutationFn: () => httpService.delete(URLS.REJECT_USER + "/" + index, {}),
        onError: (error: AxiosError<any, any>) => {

            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: AxiosResponse<any>) => {


            toaster.create({
                title: data.data?.message,
                type: "success",
                closable: true
            })
            setLoading("0")
            setJoinStatus("pending")
            queryClient.invalidateQueries({ queryKey: [URLS.FRIEND_REQUEST] })
        }
    });


    const acceptuser = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.ACCEPT_USER, data),
        onError: (error: AxiosError<any, any>) => {

            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: AxiosResponse<any>) => {

            queryClient.invalidateQueries({ queryKey: [URLS.FRIEND_REQUEST] })

            toaster.create({
                title: data.data?.message,
                type: "success",
                closable: true
            })
            setLoading("0")
            setJoinStatus("pending")
        }
    });

    const addfriend = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.ADD_FRIEND, data),
        onError: (error: AxiosError<any, any>) => {

            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: AxiosResponse<any>) => {

            toaster.create({
                title: data.data?.message,
                type: "success",
                closable: true
            })
            queryClient.invalidateQueries({ queryKey: [URLS.GET_USER_CONNECTION_LIST + user_index] })
            queryClient.invalidateQueries({ queryKey: ['/user/friend-requests'] })
            queryClient.invalidateQueries({ queryKey: ['get-joined-network'] })
            setLoading("0")
            if (data?.data?.message === "Public profile auto friend") {
                setJoinStatus("CONNECTED")
            } else {
                setJoinStatus("FRIEND_REQUEST_SENT")
            }
        }
    });

    const handleadd = React.useCallback(() => {

        setLoading(user_index)
        addfriend.mutate({ toUserID: user_index })
    }, [addfriend, user_index])

    const handleaccept = React.useCallback((event: any) => {
        event.stopPropagation();
        setLoading(index)
        acceptuser.mutate({ friendRequestID: index })
    }, [acceptuser, user_index])

    const handleRemove = React.useCallback(() => {
        setLoading(user_index)
        unfriend.mutate()
    }, [unfriend, user_index])

    const handleReject = React.useCallback((event: any) => {
        event.stopPropagation();
        setLoadingRejected(index)
        rejectuser.mutate()
    }, [rejectuser, user_index])


    const clickHandler = (event: any) => {
        event.stopPropagation();
        if (name === "Pending" || name === "Disconnect") {
            handleRemove()
        } else {
            handleadd()
        }
    }


    return (
        <>
            {!request && (
                <>
                    {!icon && (
                        <Button loading={loading === user_index} px={profile ? "4" : "0px"} _disabled={{ cursor: "none" }} justifyContent={"center"} alignItems={"center"} as={"button"} onClick={clickHandler} _hover={{ backgroundColor: "#5D70F9", color: "white" }} width={width ? width : "full"} rounded={"8px"} height={search ? "35px" : "43px"} bg={name === "Pending" ? "#fff3e7" : name === "Disconnect" ? "brand.chasescrollRed" : "white"} borderColor={(name === "Pending" || name === "Disconnect") ? "" : "brand.chasescrollBlue"} borderWidth={(name === "Pending" || name === "Disconnect") ? "0px" : "1px"} color={name === "Pending" ? "#f78b26" : name === "Disconnect" ? "white" : "brand.chasescrollBlue"} fontSize={search ? "11px" : "sm"} fontWeight={"semibold"}  >
                            {name}
                        </Button>
                    )}
                    {(icon && name !== "Connect") ? (
                        <Button loading={loading === user_index} _disabled={{ cursor: "none" }} as={"button"} justifyContent={"center"} px={["1", "1", "3"]} alignItems={"center"} _hover={{ backgroundColor: mainBackgroundColor }} width={width ? width : "full"} rounded={"8px"} height={search ? "35px" : ["35px", "35px", "43px"]} bg={name === "Pending" ? mainBackgroundColor : name === "Disconnect" ? mainBackgroundColor : mainBackgroundColor} borderColor={(name === "Pending" || name === "Disconnect") ? "" : "white"} borderWidth={(name === "Pending" || name === "Disconnect") ? "0px" : "0px"} color={name === "Pending" ? "#f78b26" : name === "Disconnect" ? "brand.chasescrollBlue" : "brand.chasescrollBlue"} fontSize={search ? "11px" : ["xs", "xs", "sm"]} fontWeight={["medium", "medium", "semibold"]}  >
                            {name === "Disconnect" ? "Connected" : name}
                        </Button>
                    ) : (
                        <>
                            {icon && (
                                <Button loading={loading === user_index} as={"button"} _disabled={{ cursor: "none" }} onClick={clickHandler}>
                                    <AddProfileIcon />
                                </Button>
                            )}
                        </>
                    )}
                </>
            )}
            {request && (
                <Flex gap={"3"} fontSize={"sm"} >
                    <Button disabled={loading === index ? true : false} onClick={(e) => handleaccept(e)} fontSize={"sm"} width={"100px"} bgColor={primaryColor} color={'white'} height={"40px"} >
                        {(loading === index) ? "Loading..." : "Accept"}
                    </Button>
                    <Button disabled={loadingRejected === index ? true : false} onClick={(e) => handleReject(e)} fontSize={"sm"} width={"100px"} bgColor={"#FCE7F3"} height={"40px"} color={"#DD2B2C"} >
                        {(loadingRejected === index) ? "Loading..." : "Decline"}
                    </Button>
                </Flex>
            )}
        </>
    )
}

export default AddOrRemoveUserBtn
