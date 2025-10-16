
import { Chat } from '@/helpers/models/chat';
import httpService from '@/helpers/services/httpService';
import { SHARE_URL } from '@/helpers/services/urls';
import useCustomTheme from '@/hooks/useTheme';
import { Avatar, Box, Checkbox, Flex, HStack, Heading, Input, InputGroup, Text, VStack } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { FiSearch } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import { CustomButton, LoadingAnimation, UserImage } from '../shared';
import { IUser } from '@/helpers/models/user';
import { ShareType } from '@/helpers/models/share';
import { useDetails } from '@/helpers/store/useUserDetails';
import { toaster } from '../ui/toaster';
import useInfiniteScroller from '@/hooks/infiniteScrollerComponent';

interface Props { }

const UserCard = (props: IUser & { checked: boolean, handleCheck: (e: string) => void }) => {
    const { username, userId, data: { imgMain: { value: imgMain } }, firstName, lastName } = props;
    return (
        <HStack width='100%' height={'60px'} justifyContent={'space-between'} >
            <HStack>
                <UserImage user={props} />
                {/* <Avatar src={`${CONFIG.RESOURCE_URL}${imgMain}`} size='sm' name={`${firstName} ${lastName}`} /> */}
                <Flex alignItems={'flex-start'} gap={0}>
                    <Heading fontSize={'16px'} color='black'>{firstName || ''} {lastName || ''}</Heading>
                    <Text color='grey' fontSize={'14px'}>@{username || ''}</Text>
                </Flex>
            </HStack>

            {/* <Checkbox isChecked={props.checked} onChange={(e) => props.handleCheck(userId)} /> */}
        </HStack>
    )
}

function SendMesageModal({ onClose, id, isprofile, type, affiliateID }: {
    onClose: () => void,
    id: string,
    isprofile?: boolean,
    type: ShareType
    affiliateID: any
}) {

    const [search, setSearch] = React.useState('');
    // const searchText = useDebounce(search, 1000);
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [userIds, setUserIds] = React.useState<string[]>([]);

    const { userId } = useDetails((state) => state);
    // const toast = useToast()

    // const { isLoading, isError } = useQuery(['getUserFriends', searchText, userId], () => httpService.get(`/user/get-users-connections/${userId}`, {
    //     params: {
    //         searchText
    //     }
    // }), {
    //     onSuccess: (data) => {
    //         setUsers(data?.data.content);
    //     }
    // });

    const {
        mainBackgroundColor
    } = useCustomTheme()


    const { results, isLoading, ref } = useInfiniteScroller({
        url: `/user/get-users-connections/${userId}`, limit: 10, filter: "userId", name: "all-event", search: search, paramsObj: {
            searchText: search
        }
    })

    const { isPending: chatCreationLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpService.post(`/chat/chat`, data),
        onSuccess: (data) => {
            const chat = data?.data as Chat;
            const obj = {
                message:
                    type === "EVENT"
                        ? `${SHARE_URL}${"/event/"}${id}/opengraph${affiliateID ? `?affiliateID=${affiliateID}` : ``}` :
                        type === "RENTAL" ? `${SHARE_URL}${"/rental?id="}${id}` :
                            type === "SERVICE" ? `${SHARE_URL}${"/service?id="}${id}` :
                                type === "KIOSK" ? `${SHARE_URL}${"/product?id="}${id}` :
                                    type === "DONATION" ? `${SHARE_URL}${"/fundraiser/"}${id}/opengraph`
                                        : `${SHARE_URL}/event/${id}/opengraph`,
                chatID: chat?.id,
            }
            sendMessage.mutate(obj)
        }

    });

    const sendMessage = useMutation({
        mutationFn: (data: any) => httpService.post(`/chat/message`, data),
        onSuccess: () => {
            // toast({
            //     title: 'Success',
            //     description: 'Message Sent',
            //     status: 'success',
            //     isClosable: true,
            //     duration: 5000,
            //     position: 'top-right',
            // });
            toaster.create({
                title:'Message Sent',
                type: "success",
                closable: true
            })
            onClose()
        }
    });

    const handleShare = () => {
        userIds.forEach((idd) => {
            mutate({
                type: 'ONE_TO_ONE',
                typeID: userId,
                name: idd,
                users: [
                    idd
                ]
            });
        })
    }

    const handleCheck = (iem: string) => {
        if (userIds.includes(iem)) {
            setUserIds(userIds.filter((id) => id !== iem));
        } else {
            setUserIds([...userIds, iem]);
        }
    }

    return (
        <Box width={"full"} >
            <Box px={"20px"} marginY='20px' w={"full"} >
                <InputGroup startElement={
                    <Flex pl={"3"} >
                        <IoSearchOutline size={"20px"} />
                    </Flex>
                }>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} type="search" h={"45px"} rounded={"full"} bgColor={mainBackgroundColor} placeholder='Search for users' />
                </InputGroup>
            </Box>

            <Box width='100%' px={"20px"} height='220px' overflowY='auto'>
                <LoadingAnimation loading={isLoading} >
                    {results.map((item: any, index: number) => {
                        if (results.length === index + 1) {
                            return(
                                <Flex ref={ref} > 
                                    <UserCard {...item} checked={userIds.includes(item.userId)} handleCheck={(e) => handleCheck(e)} key={index.toString()} />
                                </Flex>
                            )
                        } else {
                            <Flex> 
                                <UserCard {...item} checked={userIds.includes(item.userId)} handleCheck={(e) => handleCheck(e)} key={index.toString()} />
                            </Flex>
                        }
                    })}
                </LoadingAnimation>
            </Box>
            <Box paddingX={'20px'} shadow='lg' bg='white' paddingTop={'20px'} zIndex={10} paddingBottom={'20px'} borderTopWidth={'0.5px'} borderTopColor={'lightgrey'}>
                <CustomButton text='Share' onClick={handleShare} disable={userIds.length === 0} isLoading={chatCreationLoading || sendMessage.isPending} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
            </Box>
        </Box>
    )
}

export default SendMesageModal 

