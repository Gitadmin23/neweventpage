
import httpService from '@/helpers/services/httpService';
import { URLS } from '@/helpers/services/urls';
import { useDetails } from '@/helpers/store/useUserDetails';
import useCustomTheme from '@/hooks/useTheme';
import { Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import React from 'react' 
import { toaster } from '../ui/toaster';

interface Props {
    data: any,
    width?: any,
    font?: string,
    height?: string
}

function JoinOrLeaveCommunityBtn(props: Props) {
    const {
        data,
        width,
        font,
        height
    } = props
     

    const [ joined, setJoined] = React.useState(data.joinStatus+"")
    const { userId: user_index } = useDetails((state) => state); 

    // const { refetchCommunity } = useCommunity()

    const {
        primaryColor
    } = useCustomTheme()

    // save event
    const JoinCommunity = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.JOIN_GROUP, data),
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
            setJoined("CONNECTED") 
            // refetchCommunity()
        }
    });

    const LeaveCommunity = useMutation({
        mutationFn: () => httpService.delete(`${URLS.LEAVE_GROUP}?groupID=${data?.id}&userID=${user_index}`),
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
            setJoined("NOT_CONNECTED")
            // refetchCommunity()
        }
    }); 

    const handleCommunity = React.useCallback(() => {
        if (joined === "NOT_CONNECTED") {
            JoinCommunity.mutate({ 
                groupID: data?.id,
                joinID: user_index
            })
        } else {
            LeaveCommunity.mutate()
        }
    }, [data, LeaveCommunity, JoinCommunity, joined, user_index])

    return (
        <Button onClick={handleCommunity} disabled={JoinCommunity.isPending || LeaveCommunity.isPending} width={width ? width : "120px"} height={height ? height : "45px"} color={"white"} rounded={"full"} fontSize={font ? font : "xs"} bg={joined !== "NOT_CONNECTED"  ? "red" : primaryColor} >
            {JoinCommunity.isPending || LeaveCommunity.isPending ? "Loading..." : joined === "NOT_CONNECTED" ? "Join" : data?.data?.isPublic ? "Leave" : "Request Sent"}
        </Button>
    )
}

export default JoinOrLeaveCommunityBtn
